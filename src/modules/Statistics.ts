import fs from 'fs';
import JSONStream from 'jsonstream';
import through2 from 'through2';
import { Transaction } from '../interfaces/Transaction';

class Statistics {
	filePath: string;

	constructor(filePath: string) {
		this.filePath = filePath;
	}

	private async groupTransactionsByPackage(): Promise<{ [key: string]: Transaction[] }> {
		const transactionsByPackage: { [key: string]: Transaction[] } = {};

		const stream = fs.createReadStream(this.filePath, { encoding: 'utf8' });
		const parser = JSONStream.parse('*');

		const transformStream = through2.obj((transaction: Transaction, _, callback) => {
			const { tour_name } = transaction;

			if (!transactionsByPackage[tour_name]) {
				transactionsByPackage[tour_name] = [];
			}

			transactionsByPackage[tour_name].push(transaction);
			callback();
		});

		stream.pipe(parser).pipe(transformStream);

		return new Promise((resolve, reject) => {
			stream.on('end', () => {
				resolve(transactionsByPackage);
			});

			stream.on('error', (error) => {
				reject(error);
			});
		});
	}

	async calculateGroupSums(): Promise<{
		[key: string]: number;
	}> {
		const groupedTransactions = await this.groupTransactionsByPackage();
		const keys = Object.keys(groupedTransactions);
		const groupedSum: { [key: string]: number } = {};

		for (const key of keys) {
			const sum = groupedTransactions[key].reduce((acc, transaction) => {
				return acc + transaction.total_transaction_amount;
			}, 0);

			groupedSum[key] = sum;
		}

		return groupedSum;
	}

	async getHighestCumulativeAmount() {
		const groupedPacks = await this.calculateGroupSums();

		return Object.entries(groupedPacks).reduce(
			([maxKey, maxValue], [key, value]) => {
				if (maxValue === null || value > maxValue) {
					return [key, value];
				}
				return [maxKey, maxValue];
			},
			['', 0]
		);
	}

	async leastTransactionspackage(): Promise<string[]> {
		const transactionsByPackage: { [key: string]: number } = {};

		const stream = fs.createReadStream(this.filePath, { encoding: 'utf8' });
		const parser = JSONStream.parse('*');

		const transformStream = through2.obj((transaction: Transaction, _, callback) => {
			const { package_name } = transaction;

			if (!transactionsByPackage[package_name]) {
				transactionsByPackage[package_name] = 0;
			}

			transactionsByPackage[package_name]++;
			callback();
		});

		stream.pipe(parser).pipe(transformStream);

		return new Promise((resolve, reject) => {
			stream.on('end', () => {
				const leastTransactionCount = Math.min(...Object.values(transactionsByPackage));
				const packagesWithLeastTransactions = Object.keys(transactionsByPackage).filter(
					(package_name) => transactionsByPackage[package_name] === leastTransactionCount
				);

				resolve(packagesWithLeastTransactions);
			});

			stream.on('error', (error) => {
				reject(error);
			});
		});
	}

	async averageTransactionAmountByName(packageName: string): Promise<number> {
		const groupedTransactions = await this.groupTransactionsByPackage();

		if (!groupedTransactions.hasOwnProperty(packageName)) {
			throw new Error('There is no package with this name!');
		}

		const averageAmount =
			groupedTransactions[packageName].reduce((acc, trans) => acc + trans.total_transaction_amount, 0) /
			groupedTransactions[packageName].length;

		return averageAmount;
	}

	async mostCommonPartySizeForCruise(packageName: string): Promise<number> {
		const groupedTransactions = await this.groupTransactionsByPackage();

		if (!groupedTransactions.hasOwnProperty(packageName)) {
			throw new Error('There is no package with this name!');
		}

		const partySizeCount: Record<number, number> = {};

		for (const transaction of groupedTransactions[packageName]) {
			const partySize = transaction.total_number_of_tickets;
			if (partySizeCount[partySize]) {
				partySizeCount[partySize]++;
			} else {
				partySizeCount[partySize] = 1;
			}
		}

		// Find the most common party size
		let mostCommonPartySize: number = 0;
		let highestCount = 0;

		for (const partySize in partySizeCount) {
			if (partySizeCount[partySize] > highestCount) {
				mostCommonPartySize = Number(partySize);
				highestCount = partySizeCount[partySize];
			}
		}

		return mostCommonPartySize;
	}
}

export default Statistics;

import fs from 'fs';
import JSONStream from 'jsonstream';
import through2 from 'through2';
import { GroupedTransaction, Transaction } from '../interfaces/Transaction';

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

	async calculateGroupSums() {
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

	async leastTransactionspackage() {
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

	async averageTransactionAmountByName(packageName: string): Promise<string> {
		const groupedTransactions = await this.groupTransactionsByPackage();

		const averageAmount =
			groupedTransactions[packageName].reduce((acc, trans) => acc + trans.total_transaction_amount, 0) /
			groupedTransactions[packageName].length;

		return `Average transaction amount for "${packageName}" is: ${averageAmount}`;
	}
}

export default Statistics;

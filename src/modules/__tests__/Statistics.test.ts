import path from 'path';
import Statistics from '../Statistics';

const filePath = path.resolve(path.join(__dirname, '..', 'mocks', 'data.json'));

describe('Statistics methods', () => {
	test('"getHighestCumulativeAmount:" groups transactions by package name', async () => {
		const stats = new Statistics(filePath);
		const response = await stats.getHighestCumulativeAmount();

		expect(response).toEqual(['Freedom', 848.788688]);
	});

	test('"leastTransactionspackage:" gets least transaction package', async () => {
		const stats = new Statistics(filePath);
		const response = await stats.leastTransactionspackage();

		expect(response).toEqual([
			'Sunset Cruise - Sky Deck',
			'Whale Watching NYC Adventure Cruise - General Admission',
			'City Lights Cruise - General Admission',
		]);
	});

	test('"averageTransactionAmountByName:" gets the average transaction amount by provided package name', async () => {
		const stats = new Statistics(filePath);
		const response = await stats.averageTransactionAmountByName('Bottomless Brunch Cruise');

		expect(response).toEqual(272.85964789999997);
	});

	test('"averageTransactionAmountByName:" throws error if no package name provided', async () => {
		const stats = new Statistics(filePath);
		await expect(stats.averageTransactionAmountByName('')).rejects.toThrow('There is no package with this name!');
	});

	test('"mostCommonPartySizeForCruise:" returns the most common party size cruize based on cruize name provided', async () => {
		const stats = new Statistics(filePath);
		const response = await stats.mostCommonPartySizeForCruise('City Lights Cruise');

		expect(response).toEqual(4);
	});

	test('"mostCommonPartySizeForCruise:" throws if missing argument', async () => {
		const stats = new Statistics(filePath);
		await expect(stats.mostCommonPartySizeForCruise('')).rejects.toThrow('There is no package with this name!');
	});
});

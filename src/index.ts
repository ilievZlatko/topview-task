import path from 'path';
import Statistics from './modules/Statistics';

const file = path.resolve(path.join(__dirname, 'data', 'sample.json'));
const stats = new Statistics(file);

/**
 * Question #1:
 */

// Task: 1
stats.getHighestCumulativeAmount().then((sums) => console.log('Package with highest cumulative amount: ', sums));

// Task: 2
stats.leastTransactionspackage().then((res) => console.log('Least transactions package/s: ', res));

// Task: 3
stats
	.averageTransactionAmountByName('Skyline Dinner Cruise')
	.then((res) => console.log('Average transaction amount for "Skyline Dinner Cruise" is: ', res));

// Task: 4
stats
	.mostCommonPartySizeForCruise('City Lights Cruise')
	.then((res) => console.log('Most common party size cruize for "City Lights Cruise" package is: ', res));

/**
 * Question 2
 */
stats.getSalesByYear('Skyline Dinner Cruise', 2019).then((res) => console.log(res));

stats.getTotalTransactionAmountsPerYear('Skyline Dinner Cruise').then((res) => console.log(res));

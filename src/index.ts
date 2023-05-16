import path from 'path';
import Statistics from './modules/Statistics';

const file = path.resolve(path.join(__dirname, 'data', 'sample.json'));
const stats = new Statistics(file);

stats.getHighestCumulativeAmount().then((sums) => console.log(sums));
stats.leastTransactionspackage().then((res) => console.log(res));
stats.averageTransactionAmountByName('Skyline Dinner Cruise').then((res) => console.log(res));

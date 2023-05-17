# TOPVIEW BULGARIA INTERVIEW TASK - Zlatko Iliev

---

The `Statistics` class exported from `src/modules` allows extracting statistics from a json file with structure **array** of `Transaction` objects:

```typescript
interface Transaction {
	timestamp: number;
	package_name: string;
	tour_name: string;
	admission_type: string;
	reservation_date: number;
	total_transaction_amount: number;
	number_of_adults: number;
	number_of_kids: number;
	total_number_of_tickets: number;
	scanned: boolean;
}
```

## Instructions:

- On initialize, the class expects the file path:

  ```typescript
  import path from 'path';
  import Statistics from './modules/Statistics';

  const file = path.resolve(path.join(__dirname, 'data', 'sample.json'));
  const stats = new Statistics(file);
  ```

- All the methods available under the `Statistics` class:

| Method                           |         args          | response                                    | Description                                                                                                  |
| :------------------------------- | :-------------------: | :------------------------------------------ | :----------------------------------------------------------------------------------------------------------- |
| `groupTransactionsByPackage`     |          N/A          | `Promise<{ [key: string]: Transaction[] }>` | Reads the file and groups all transactions by package name                                                   |
| `calculateGroupSums`             |          N/A          | `Promise<{ [key: string]: number; }>`       | Returns promise with array, first element is package name, second element is cumulative sum for this package |
| `leastTransactionspackage`       |          N/A          | `Promise<string[]>`                         | Returns an array with package names that have the least transactions                                         |
| `averageTransactionAmountByName` | `packageName: string` | `Promise<number>`                           | Returns number that is the average transaction amount per package name provided                              |
| `mostCommonPartySizeForCruise`   | `packageName: string` | `Promise<number>`                           | Returns most common party size cruize for given package name                                                 |

- Usage example:

```typescript
import path from 'path';
import Statistics from './modules/Statistics';

const file = path.resolve(path.join(__dirname, 'data', 'sample.json'));
const stats = new Statistics(file);

/**
 * Question #1:
 */

// Task: 1
stats.getHighestCumulativeAmount().then((sums) => console.log('Package with highest cumulative amount: ', sums));
// RESPONSE: Package with highest cumulative amount:  [ 'Skyline Dinner Cruise', 590813.9732618 ]

// Task: 2
stats.leastTransactionspackage().then((res) => console.log('Least transactions package/s: ', res));
// RESPONSE:
// Least transactions package/s:  [
//   'North Pole Express TopView - Standard Experience',
//   "Father's Day Dinner - Upper Deck Indoor",
//   'Manhattan II - Main Deck Seating - July 4th Dinner',
//   'Santa Brunch Cruise 2021 - Upper Deck Seating',
//   'Santa Brunch Cruise 2021 - Main Deck Seating',
//   'Valentine Dinner - Manhattan II - Main Deck Seating',
//   'Easter Brunch - Upper Deck Seating',
//   "Mother's Day Brunch - Upper Deck Seating",
//   'Club 36: Prohibition Party - VIP Table for 4 - Eclipse',
//   'Woodland on the Water- Eclipse - Standard',
//   'Thanksgiving Dinner Cruise 2021 - Upper Deck Seating'
// ]

// Task: 3
stats
	.averageTransactionAmountByName('Skyline Dinner Cruise')
	.then((res) => console.log('Average transaction amount for "Skyline Dinner Cruise" is: ', res));
// RESPONSE: Most common party size cruize for "City Lights Cruise" package is:  2

// Task: 4
stats
	.mostCommonPartySizeForCruise('City Lights Cruise')
	.then((res) => console.log('Most common party size cruize for "City Lights Cruise" package is: ', res));
// RESPONSE: Average transaction amount for "Skyline Dinner Cruise" is:  356.7717229841788
```

## Available Scripts

In the project directory, you can run:

### `npm start`

This command will build and execulte whats in the `index.ts` file inside `src` directory

### `npm run dev`

Runs the `index.ts` in dev mode and watches for changes

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run test`

Runs the available tests cases.

### `npm run test:watch`

Runs the available tests cases in watch mode.

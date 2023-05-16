# TOPVIEW BULGARIA INTERVIEW TASK

The `data/sample.json` file contains sample transactional data related to [eventcruisesnyc.com](https://eventcruisesnyc.com). 

### Format of the data:
The file contains an **array** of `Transaction` objects. 
```typescript
interface Transaction {
  timestamp: number
  package_name: string
  tour_name: string
  admission_type: string
  reservation_date: number
  total_transaction_amount: number
  number_of_adults: number
  number_of_kids: number
  total_number_of_tickets: number
  scanned: boolean
}
```
**Note:** The `sample.csv` file contains the information in a format that is easier to import in Excel / Google Spreadsheets / Apple Numbers.

In a programming language of your choice make the necessary calculations over the provided data set to fill in the missing calculations below:


## Question #1:   
1. Find the package that has the highest cumulative amount of sales.
2. Package (one or more) that has the least number of transactions.
3. Average transaction amount for the Skyline Dinner Cruise (exact name is `'Skyline Dinner Cruise'`).
4. Find the most common party size (number of tickets in a transaction) for City Lights Cruise (exact name is `'City Lights Cruise'`)

## Question #2:  

Compare the sales of Skyline Dinner Cruise in 2022 and 2021. What has changed? Why do you think has caused the change(s)?

**Hint:** What data aggregations can you apply to help you in the comparison? Can you identify any patterns in the sales data being compared?


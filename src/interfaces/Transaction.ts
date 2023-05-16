export interface Transaction {
	timestamp: number;
	package_name: string;
	tour_name: string;
	admission_type?: string;
	reservation_date: number | null;
	total_transaction_amount: number;
	number_of_adults: number;
	number_of_kids: number;
	total_number_of_tickets: number;
	scanned: boolean;
}

export interface GroupedTransaction {
	package_name: string;
	total_transaction_amount: number;
}

export interface Invoice {
  due_date: string;
  vendor_name: string;
  amount: number;
  paid: boolean;
  description: string;
}

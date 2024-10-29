import { Category } from "./Category";

export interface Expenses{
    id: string,
    description: string,
    amount: number,
    category: Category,
}
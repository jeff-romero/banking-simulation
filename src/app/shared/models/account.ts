import { Transaction } from './transaction';

export class Account {
    accountNumber!: number;
    email!: string;
    password!: string;
    firstName!: string;
    middleName?: string;
    lastName!: string;
    checkingBalance!: number;
    savingsBalance?: number;
    transactions?: Transaction[];
    token!: string;
}

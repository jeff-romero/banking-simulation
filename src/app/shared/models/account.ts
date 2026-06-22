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

export class Transaction {
    srcAccountNum!: number;
    dstAccountNum!: number;
    amount!: number;
    dayOfWeek!: string;
    month!: string;
    dayOfMonth!: number;
    year!: number;
    hour!: number;
    minute!: number;
    second!: number;
    meridiem!: string;
    timezone!: string;
}

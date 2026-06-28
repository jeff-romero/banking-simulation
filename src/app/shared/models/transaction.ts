// date is a javascript date object in milliseconds
export class Transaction {
    srcAccountNum!: number;
    dstAccountNum!: number;
    type!: string;
    amount!: number;
    date!: string;
}

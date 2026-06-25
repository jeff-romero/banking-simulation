export class Transaction {
    srcAccountNum!: number;
    dstAccountNum!: number;
    type!: string;
    amount!: number;
    date!: Date;
}

export class Date {
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

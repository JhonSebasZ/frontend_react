export type Items = {
    name:string;
    amount:number;
    price:number
}

export type Receipt = {
    items: Items[];
    userId:number;
    receiptNumber:number;
    dateTime:string;
    total:number
}


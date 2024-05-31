
export interface ItemApiResponse<T> {
    message?: string;
    data: T;
  }

export interface Items {
    value: any;
    viewValue: any;
    Barcode: string,
    Discount: number,
    Item_ID: string,
    Item_Name: string,
    Rate: number,
    Quantity?: number;
}

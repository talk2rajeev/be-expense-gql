export enum WorkersProviderEnum  {
    worker= 'worker',
    vendor='vendor',
}
export interface WorkersAndProvidersInterface {
  id: string,
  name: string,
  address: string,
  type: WorkersProviderEnum,
  contact?: string,
  additionalDetail?: string,
}

export interface WorkerInvoiceInterface {
  id: string,
  wpid: string,
  wage: number,
  date?: string,
  halfDay?: boolean,
  note?: string, 
}

export interface VendorInvoiceInterface {
  id: string,
  wpid: string,
  date: string,
  purchasedItems: Array<VendorExpenseItemInterface>
}

export interface VendorExpenseItemInterface {
  expense_item: string,
  cost: number,
  qty: string,
}
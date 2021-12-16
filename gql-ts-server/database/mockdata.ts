import {
  WorkersProviderEnum,
  WorkersAndProvidersInterface,
  WorkerInvoiceInterface,
  VendorInvoiceInterface,
  VendorExpenseItemInterface,
} from '../src/graphql/types';


export const users = [
  {
    name: 'Raj',
    email: 'raj@gmail.com',
    password: '$2b$10$J3LR8rzx.HDtYfBAbqvdfe4LNcWqT8HRVyGMg/JZvwOqVU3BPYUaW',
  }
];

export function fetchUser(): Promise<typeof users> {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(users);
    }, 1000)
  });
}

export const vendorList = [
  {
      id: '4mt4t4--te4asdf-edfgdfg',
      name: 'Sangam Thekedar',
      type: 'Work',
      address: '',
      contact: '',
  },
  {
      id: 't1err323--tswrdfgf-tyrhsg',
      name: 'VIP Trading',
      type: 'Material',
      address: 'Marwa',
      contact: '',
  },
  {
      id: '4t324t--65ue6eu6-7e65ie56',
      name: 'Sangay Enterprise',
      type: 'Material',
      address: '',
      contact: '',
  },
];
export function fetchVendors(): Promise<typeof vendorList> {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(vendorList);
    }, 1000)
  });
}




const WorkersProviders = [
  {id: '1', name: 'sanjay entrp', address: 'nnc', type: WorkersProviderEnum.vendor, contact: '9730372951' },
  {id: '2', name: 'Ramdhari', address: 'karmasa', type: WorkersProviderEnum.worker, additionalDetail: "painter" },
  {id: '3', name: 'Guddu', address: 'ncc', type: WorkersProviderEnum.worker, contact: '7391375129', additionalDetail: "worker manager" },
  {id: '4', name: 'Manish', address: 'chapiya', type: WorkersProviderEnum.worker, contact: '8963375453', additionalDetail: "Mason" },
  {id: '5', name: 'VIP co', address: 'Merwa', type: WorkersProviderEnum.vendor, contact: '7295973130' },
]
export const fetchProviderWorkers = (): Promise<Array<WorkersAndProvidersInterface>> => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(WorkersProviders);
    }, 1000)
  });
}

export const workerInvoice = [
  { id: 'w1', wpid: '2', date: '05 Dec 2021', wage: 300, halfDay: true, note: 'painting work'},
  { id: 'w2', wpid: '3', date: '06 Dec 2021', wage: 300 },
  { id: 'w3', wpid: '3', date: '07 Dec 2021', wage: 300 },
  { id: 'w4', wpid: '3', date: '12 Dec 2021', wage: 400, note: 'extra work'},
  { id: 'w5', wpid: '2', date: '07 Dec 2021', wage: 350, note: 'painting work'},
  { id: 'w6', wpid: '4', date: '08 Dec 2021', wage: 350, note: 'extra work'}
]
export const fetchWorkerInvoice = (): Promise<Array<WorkerInvoiceInterface>> => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(workerInvoice);
    }, 1000)
  });
}

const vendorInvoice = [
  { id: 'w1', wpid: '1', date: '05 Dec 2021', purchasedItems: [{expense_item: 'sariya 10mm', cost: 5676, qty: '1 quintol'}] },
  { id: 'w2', wpid: '5', date: '06 Dec 2021', purchasedItems: [{expense_item: 'sariya 12mm', cost: 12676, qty: '2 quintol'}, {expense_item: 'sariya 10mm', cost: 25676, qty: '4 quintol'}] },
]
export const fetchVendorInvoice = (): Promise<Array<VendorInvoiceInterface>> => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(vendorInvoice);
    }, 1000)
  });
}
export const users = [
  {
    name: 'Rajeev',
    email: 'rajeev@mail.com',
    password: 'admin',
  },
  {
    name: 'Sanjeev',
    email: 'sanjeev@mail.com',
    password: 'admin',
  },
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
  },
  {
      id: 't1err323--tswrdfgf-tyrhsg',
      name: 'VIP Trading',
      type: 'Material',
      address: 'Marwa',
  },
  {
      id: '4t324t--65ue6eu6-7e65ie56',
      name: 'Sangay Enterprise',
      type: 'Material',
      address: '',
  },
];
export function fetchVendors(): Promise<typeof vendorList> {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(vendorList);
    }, 1000)
  });
}

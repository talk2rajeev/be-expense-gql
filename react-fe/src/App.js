import { useState } from 'react';
import {
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";
import './App.css';


const FEFTCH_VENDORS = gql`
  query getVendorQuery {
    vendors{
      name
      type
      address
      earning{
        amount
        date
      }
    }
  }
`;

const ADD_VENDORS = gql`
  mutation($name: String!, $type: String!, $address: String){
    createVendor(name:$name, type:$type, address:$address) {
      id
      name
      type
      earning{
        expname
        amount
      }
    }
  }
`;

function VendorList({selectVendor}) {
  const { loading, error, data } = useQuery(FEFTCH_VENDORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div className="vendorlist-grid table-heading">
        <div>Vendor</div>
        <div>Type</div>
        <div>Earnings</div>
        <div></div>
      </div>  
      {
        data.vendors.map((item, i) => (
          <div className="vendorlist-grid" key={i}>
            <div>{item.name}</div>
            <div>{item.type}</div>
            <div>
            { item.earning.map(earning=><span>{earning.amount}</span>) }
            </div>
            <div><button onClick={()=>selectVendor(item)}>Edit</button></div>
          </div>
        ))
      }
    </div>
  )
}

function AddVendor({formType, selectedVendor}) {

  const [state, setstate] = useState({
    name: selectedVendor.name,
    type: selectedVendor.type,
    address: selectedVendor.address
  });

  const [addVendorFn, { data, loading, error }] = useMutation(ADD_VENDORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const isDisabled = state.name === '' || state.type=== '' || state.address === '' ? true : false

  const addVendor = () => {
    addVendorFn({
      variables: {
        name: state.name,
        type: state.type,
        address: state.address
      },
      update: (cache, {data}) => {
        const cacheId = cache.identify(data.createVendor);
        cache.modify({
          fields: {
            vendors: (existingData, { toReference }) => {
              return [...existingData, toReference(cacheId)]
            }
          }
        })
      }
    })
    setstate({
      name: '',
      type: '',
      address: ''
    })
  }

  const editVendor = () => {

  }

  const cancelEdit = () => {
    setstate({
      name: '',
      type: '',
      address: ''
    })
  }


  return <div className="vendor-form">
    <div className="vendor-form-grid">
      <div>
        <input type="text" placeholder="name" value={selectedVendor.name} onChange={(e)=>setstate({...state, "name": e.target.value})}/>
      </div>
      <div>
        <select value={selectedVendor.type} onChange={(e)=>setstate({...state, "type": e.target.value})}>
          <option value="">Select</option>
          <option value="Material">Material</option>
          <option value="Work">Work</option>
        </select>
      </div>
      <div>  
        <input type="text" placeholder="address" value={selectedVendor.address} onChange={(e)=>setstate({...state, "address": e.target.value})}/>
      </div>
      <div>
        {
          formType === 'add' ? <button disabled={isDisabled} onClick={addVendor}>Create Vendor</button> :
          <div className="btn-gridX2">
            <button disabled={isDisabled} onClick={editVendor}>Update</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        }
        
      </div>
    </div>
  </div>
}




function App() {
  const [formType, setFormType] = useState('add');
  const [selectedVendor, setSelectedVendor] = useState({
    name: '',
    type: '',
    address: ''
  })
  const selectVendor = (vendor) => {
    setSelectedVendor(vendor);
    setFormType('edit')
  }
  return (
    <div className="App">
      <div>
        <AddVendor formType={formType} selectedVendor={selectedVendor} />
        <VendorList selectVendor={selectVendor} />
      </div>
    </div>
  );
}

export default App;

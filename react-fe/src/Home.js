import React, {useEffect, useState, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import EventCalendar from './components/EventCalendar'
import Providers from './Providers';

import 'antd/dist/antd.css';
import './App.css';
import {
    useQuery,
    gql,
} from "@apollo/client";

const FETCH_PROVIDERS = gql`
query Providers {
  providers {
    id
    name
    address
    type
    contact
    workerInvoice {
      date
      wage
      halfDay
    }
  }
}`;


const Home = () => {
    const navigation = useNavigate();
    const { loading, error, data } = useQuery(FETCH_PROVIDERS);
    const [count, setCount] = useState(0)
    const [showLaborInvoice, setShowLaborInvoice] = useState(false);
    const [workerForm, setWorkerForm] = useState({});
    const [wpid, setWpid] = useState('');


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if(!token) {
            navigation("/", { replace: true });
        }
    }, [])

    const addWorkerInvoice = (wpid) => {
        setWpid(wpid)
        console.log(wpid)
    }

    // const MemoisedProviders = useMemo(Providers, [data, error, loading])
    const MemoisedProviders = useMemo(() => <Providers addWorkerInvoice={addWorkerInvoice} data={data} error={error} loading={loading}/>, [data, error, loading]);

    const workers = data && data.providers && data.providers.filter(provider => provider.type === 'worker' && provider.id === wpid);
    const tickedDates = [];
    workers && workers.forEach(w => {
        w.workerInvoice.forEach(wi => {
            const date = wi.date;
            const halfDay = wi.halfDay;
            if(date) {
                tickedDates.push({date, halfDay})
            }
        })
    })

    const onChangeRadio = (event) => {
        console.log(event.target.value);
        setWorkerForm({
            ...workerForm,
            halfDay: event.target.value === 'HalfDay' ? true : false
        })
    }
    
    return (
        <div>
            <h4 style={{background: '#f5f5f5', padding: '10px 0'}}>Home</h4>
            <button onClick={()=>setCount(count + 1)}>increase count {count}</button>
            <button onClick={()=>setShowLaborInvoice(true)}>Add Labor Invoice</button>
            <div>
                { MemoisedProviders }
            </div>
            {
                showLaborInvoice && <div style={{position: 'fixed', display: 'block',width: '50%', top: 100, left: '25%', padding: 20, background: '#fff', boxShadow: 'rgb(205 205 205) 0px -2px 8px 0px' }}>
                    <button style={{float: 'right'}} onClick={()=>setShowLaborInvoice(false)}>close</button> 
                    <div>
                        <input type="number" placeholder="wage" />
                    </div>
                    <div>
                        <input type="date" placeholder="dd/mm/yyyy" />
                    </div>
                    <div>
                        <input type="radio" value="FullDay" onChange={onChangeRadio} checked={!workerForm.halfDay} name="dayType" /> Full Day &nbsp;&nbsp;
                        <input type="radio" value="HalfDay" onChange={onChangeRadio} checked={workerForm.halfDay === true} name="dayType" /> Half Day
                    </div>
                    <div>
                        <EventCalendar tickedDates={tickedDates}/>
                    </div>
                </div>
            }
            
        </div>
    )
};

export default Home;
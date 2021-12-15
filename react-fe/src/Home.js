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

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if(!token) {
            navigation("/", { replace: true });
        }
    }, [])

    // const MemoisedProviders = useMemo(Providers, [data, error, loading])
    const MemoisedProviders = useMemo(() => <Providers data={data} error={error} loading={loading}/>, [data, error, loading]);

    return (
        <div>
            <h4 style={{background: '#f5f5f5', padding: '10px 0'}}>Home</h4>
            <button onClick={()=>setCount(count + 1)}>increase count {count}</button>
            <div>
                { MemoisedProviders }
            </div>
            <div style={{width: 500, border: '1px solid #f0f0f0', borderRadius: 2}} className="site-calendar-customize-header-wrapper">
                <EventCalendar />
            </div>
        </div>
    )
};

export default Home;
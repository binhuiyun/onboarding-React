import React, {useState, useEffect} from 'react';
import { Table } from 'antd';
import { fetchTokenHistory } from '../../../services/token-service';


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
        width: '10%',
        align: 'center',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        width: '12%',
        align: 'center',
        
        
    },
    {
        title: 'Registration Link',
        dataIndex: 'registrationLink',
        ellipsis: true,
        width: '50%',
        align: 'center',
        
    },
    {
        title: 'Status',
        dataIndex: 'status',
        width: '10%',
        align: 'center',
    },
    
    ];
    const data = [];

export default function ReviewTokenHistory() {
    const [tokenHistory, setTokenHistory] = useState([]);
    useEffect(() => {
        fetchTokenHistory().then((res) => {
            console.log(res[0]);
            setTokenHistory(res);    
        });
    }, []);
  return (
    <>
    <h1>ReviewTokenHistory</h1>
    {tokenHistory.map((token) => {
        data.push({
            key: token._id,
            name: token.name,
            email: token.email,
            registrationLink: token.link,
            status: token.status,
        });
    })}
    <Table columns={columns} dataSource={data} />
    </>
  )
}

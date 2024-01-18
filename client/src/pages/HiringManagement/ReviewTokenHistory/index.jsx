import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { Table } from 'antd';
import { fetchTokenHistoryThunk } from '../../../thunks/token-thunk';


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
 

export default function ReviewTokenHistory() {
    const dispatch = useDispatch();
    const {tokenHistory} = useSelector((state) => state.tokenHistory);
 
    useEffect(() => {
        dispatch(fetchTokenHistoryThunk())
        console.log("tokenHistory", tokenHistory)
    } , [dispatch]);    
     
  return (
    <>
    <h1>ReviewTokenHistory</h1>

    <Table 
    columns={columns} 
    dataSource={tokenHistory.map((token) => 
   ({
    key: token._id,
    name: token.name,
    email: token.email,
    registrationLink: token.link,
    status: token.status,
}))} 
  
    />
    </>
  )
}

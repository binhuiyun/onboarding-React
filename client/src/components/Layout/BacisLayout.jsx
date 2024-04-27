import React, { useMemo } from 'react';
import { Layout, Menu} from 'antd';
import { blue, gray, } from '@ant-design/colors';
import { Outlet, Link } from 'react-router-dom';
import { logOutUser } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
//import { useMediaQuery } from 'hooks/useMediaQuery';

export default function BasicLayout() {
 // const isMobile = useMediaQuery('(max-width: 450px)');
 const dispatch = useDispatch();

  const items = useMemo(
    () => [
      {
        key: '1',
        label: 
        <Link to = 'http://localhost:5173/personal-information'>Personal Information</Link>,
  
      },
      {
        key: '2',
        label: <Link to ='http://localhost:5173/visa'> Visa Status Management</Link>, 
      },
    
      {
        key: '3',
        label: 'Logout',
        onClick: () => {
          console.log("Logout Clicked");
          dispatch(logOutUser());
        },
      
      },
    ],
    []
  );

  return (
      <Layout>
        <Layout.Header >
        <Menu mode = "horizontal" 
        theme="dark"
        items= {items}
        style={{display: 'flex', justifyContent: 'space-between'}}
        />
        </Layout.Header>  
        <Layout.Content style={{padding: '0 48px'}}>
        
          <Outlet />
        </Layout.Content>
    
      </Layout>
 
  );
}
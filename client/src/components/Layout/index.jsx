import React, { useMemo } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { blue, gray, } from '@ant-design/colors';
import { Outlet, Link } from 'react-router-dom';
//import { useMediaQuery } from 'hooks/useMediaQuery';

export default function MainLayout() {
 // const isMobile = useMediaQuery('(max-width: 450px)');

  const items = useMemo(
    () => [
      {
        key: '1',
        label: 'Home',
        link: '/',    
      },
      {
        key: '2',
        label: 
        <Link to = 'http://localhost:5173/employee-profile'>Employee Profile</Link>,
  
      },
      {
        key: '3',
        label: <Link to ='http://localhost:5173/visa-hr'> Visa Status Management</Link>,
    
     
      },
      {
        key: '4',
        label: <Link to='http://localhost:5173/hiring-management'>Hiring Management</Link>,

      },
      {
        key: '5',
        label: 'Logout',
        link: '/logout',
      
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
        <Breadcrumb style={{ margin: '16px 0' }}
          items={[
          {
            title: <Link to="/token"> Token History </Link>,
          },
       
          {
            title:
            <a href="">Review Applications</a>,
            menu: {
              items:

               [
                {
                  key : "1",
                  label:
                     <Link to="applications/approved">Approved</Link>
    
                },
                {
                  key : "2",
                  label: <Link to="applications/rejected">Rejected</Link>
                  
                },
                {
                  key : "3",
                  label: <Link to="applications/pending">Pending</Link>
                  
                },
              ],
            },
          },
        ]}
      
      />
          <Outlet />
        </Layout.Content>
    
      </Layout>
 
  );
}
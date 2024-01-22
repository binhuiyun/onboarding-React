import React, { useMemo } from 'react';
import { Layout } from 'antd';
import { blue, gray } from '@ant-design/colors';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
//import { useMediaQuery } from 'hooks/useMediaQuery';

export default function MainLayout() {
 // const isMobile = useMediaQuery('(max-width: 450px)');





  const contentStyle =useMemo(
    () => ({
      height: 'calc(100vh )',
      padding: '0 50px',
      width: '100%',
      margin: '0 auto',
      overflowY: 'auto'
    }),
    []
  );

  return (

      <Layout>
    
   
        <Layout.Content style={contentStyle}>
          <Outlet />
        </Layout.Content>
    
      </Layout>
 
  );
}
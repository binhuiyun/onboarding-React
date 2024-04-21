import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfileThunk } from '../../thunks/profile-thunk';
import { Input, Table} from 'antd';
import { Link } from 'react-router-dom';
const { Search } = Input;


const EmployeeProfile = () => {
    const dispatch = useDispatch();
    //sortedEmployees
    const allEmployees = useSelector(state => state.profile.profiles);
    const status = useSelector(state => state.profile.status);
    const { user } = useSelector((state) => state.user);
    console.log("allEmployees", user.id);
    useEffect(() => {
        dispatch(getAllProfileThunk());
    }
    , []);

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text, record) => <Link to={`/employee-profile/${record.key}`}>{text}</Link>
          
        },
        {
          title: 'SSN',
          dataIndex: 'ssn',
          key: 'ssn',
        },
        {
          title: 'Work Authorization Title',
          dataIndex: 'workAuthorizationTitle',
          key: 'workAuthorizationTitle',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }
       
      ];

  return (
    <div>
      <h1>Employee Profile</h1>
      <Search placeholder="Search by name"
       onSearch={value => console.log(value)} 
       enterButton="Search" 
       style={{
        width: 500,
      }}/>
     
      {status === "success" && (
         <Table  columns={columns} 
      dataSource={allEmployees.map((employee) => {
        return {
            key: employee.userId,
            name: `${employee.firstName} ${employee.lastName}`,
            ssn: employee.ssn,
            workAuthorizationTitle: employee.workAuthorizationTitle,
            phoneNumber: employee.cellPhone,
            email: employee.email
        }
      }
      )}
      />
      )}
    </div>
  );
}

export default EmployeeProfile;
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
    const [searchInput, setSearchInput] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const status = useSelector(state => state.profile.status);
    console.log("allEmployees", allEmployees);

    useEffect(() => {
        const  filteredList = allEmployees.filter((employee) => {
          const {firstName, lastName, preferredName} = employee;
          const searchString = `${firstName} ${lastName} ${preferredName}`.toLowerCase();
          return searchString.includes(searchInput.toLowerCase());
        });
        setFilteredEmployees(filteredList);
    }
    , [searchInput, allEmployees]);

    useEffect(() => {
      dispatch(getAllProfileThunk());
    }, []);

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
       value = {searchInput}
       onChange={(e) => setSearchInput(e.target.value)}
       enterButton="Search" 
       style={{
        width: 500,
      }}/>
     
      {status === "success" && (
         <Table  columns={columns} 
      dataSource={filteredEmployees.map((employee) => {
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
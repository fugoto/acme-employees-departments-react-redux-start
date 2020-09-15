import React from 'react';
import Employees from './Employees';
import {connect} from 'react-redux'

const Department = ({ department, employees })=> {
    return (
      <li>
        <span className='department-title'>
          { department ? department.name : 'No Department' } ({
            employees.filter( employee => employee.departmentId === (department ? department.id : null) ).length
          })
        </span>
        <Employees
          department={ department }
        />
      </li>
    );
};

function mapStateToProps(state){
  return ({employees: state.employees})
}

// export default Department;
export default connect(mapStateToProps, null)(Department)
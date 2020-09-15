import React from 'react';
import Employee from './Employee';
import {connect} from 'react-redux'

const Employees = ({employees, department})=> {
  return (
      <ul>
        {
          employees.filter( employee => employee.departmentId === (department ? department.id : null )).map( employee => <Employee { ...employee } key={ employee.id }/>)
        }
      </ul>
  );
};

function mapStateToProps(state) {
  return ({employees: state.employees})
}

export default connect(mapStateToProps, null)(Employees)

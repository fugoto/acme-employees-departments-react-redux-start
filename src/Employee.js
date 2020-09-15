import React from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import {destroyedEmployee, removedFromDepartment} from './store'

const Employee = ({ id, name, departmentId, destroyEmployee, removeFromDepartment })=> {
  return (
    <li key={ id }>
      { name }
      <button onClick={()=> destroyEmployee(id)}>x</button>
      { !!departmentId ? 
      <button onClick={()=> removeFromDepartment(id, departmentId)}>Remove From Department</button> : null
      }
    </li>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    destroyEmployee: async function(id) {
      await axios.delete(`/api/employees/${id}`);
      dispatch(destroyedEmployee(id))
    },
    removeFromDepartment: async function(id, departmentId){
      const employee = (await axios.put(`/api/employees/${id}`, { departmentId: null})).data;
      dispatch(removedFromDepartment(employee))
    }
  }
}

// export default Employee;
export default connect(null, mapDispatchToProps)(Employee)

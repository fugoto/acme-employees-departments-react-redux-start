import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Departments from './Departments';
import Stats from './Stats';
import store from './store'
import {deleteEmployee, getAll, removeEmployee} from './store'

class App extends React.Component{
  constructor(){
    super();
    this.state = store.getState()

    this.destroyEmployee = this.destroyEmployee.bind(this);
    this.removeFromDepartment = this.removeFromDepartment.bind(this);
  }
  async destroyEmployee(employee){
    await axios.delete(`/api/employees/${employee.id}`);
    store.dispatch(deleteEmployee(employee.id))
    // const employees = this.state.employees.filter(_employee => employee.id !== _employee.id);
    // this.setState({ employees });
  }
  async removeFromDepartment(employee){
    employee = (await axios.put(`/api/employees/${employee.id}`, { departmentId: null})).data;
    store.dispatch(removeEmployee(employee.id))
    
    // const employees = this.state.employees.map(_employee => employee.id === _employee.id ? employee : _employee);
    // this.setState({ employees });
  }
  async componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))

    //does this belong in here? or is there a way to not call this every time?
    const responses = await Promise.all([
      axios.get('/api/employees'),
      axios.get('/api/departments')
    ]);
    store.dispatch(getAll({
        employees: responses[0].data,
        departments: responses[1].data
      }))

    // this.setState({
    //   employees: responses[0].data,
    //   departments: responses[1].data
    // });
  }

componentWillUnmount(){
  this.unsubscribe()
}

  render(){
    console.log('renderstate',this.state)
    const { departments, employees } = this.state;
    const { destroyEmployee, removeFromDepartment } = this;
    return (
      <div>
        <h1>Acme Employees And Departments</h1>
        <Stats employees={ employees }/>
        <Departments
          departments={ departments }
          employees={ employees }
          destroyEmployee = { destroyEmployee }
          removeFromDepartment = { removeFromDepartment }
      />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Departments from './Departments';
import Stats from './Stats';
import store from './store'
import {getAll} from './store'
import {Provider} from 'react-redux'

class App extends React.Component{
  constructor(){
    super();
    this.state = store.getState()
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
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  render(){
    return (
      <div>
        <h1>Acme Employees And Departments</h1>
        <Stats/>
        <Departments/>
      </div>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));

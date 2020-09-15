import React from 'react';
import {connect} from 'react-redux'

const Stats = ({ employees })=> {
  return (
    <p>{ employees.length } Total Employees</p>
  );
};

function mapStateToProps(state){
  return ({employees: state.employees})
}

// export default Stats;
export default connect(mapStateToProps,null)(Stats)

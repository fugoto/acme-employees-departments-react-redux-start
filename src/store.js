import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'

const initialState = {
    departments: [],
    employees: []
}

const GET_ALL = 'GET_ALL'
const DESTROY_EMP = 'DESTROY_EMP'
const REMOVE_EMP = 'REMOVE_EMP'

export function getAll(allObj){
    return ({type: GET_ALL, employees: allObj.employees, departments: allObj.departments})
}
export function destroyedEmployee(id){
    return ({type: DESTROY_EMP, id})
}
export function removedFromDepartment(employee) {
    return ({type: REMOVE_EMP, employee})
}

function reducer(state = initialState, action){
    switch (action.type){
        case GET_ALL:
            return {...state, departments: action.departments, employees: action.employees}
        case DESTROY_EMP:
            const employees = state.employees.filter(employee => employee.id !== action.id)
            return {...state, employees}
        case REMOVE_EMP:
            const rest = state.employees.filter(employee => employee.id !== action.employee.id)
            rest.push(action.employee)
            return {...state, employees: rest}
        default:
            return state
    }
}

const store = createStore(
    reducer,
    applyMiddleware(loggerMiddleware)
)

export default store
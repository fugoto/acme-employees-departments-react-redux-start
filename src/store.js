import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
// import react-redux from 'react-redux'
import axios from 'axios'

// async function loadAll(){
//     const state = {
//         departments: (await axios.get('/api/departments')).data,
//         employees: (await axios.get('/api/employees')).data
//     }
//     return state
// }

// const initialState = loadAll()

const initialState = {
    departments: [],
    employees: []
}

const GET_ALL = 'GET_ALL'
const DELETE_EMP = 'DELETE_EMP'
const REMOVE_EMP = 'REMOVE_EMP'

export function getAll(allObj){
    console.log(allObj)
    return ({type: GET_ALL, employees: allObj.employees, departments: allObj.departments})
}

export function deleteEmployee(id){
    return ({type: DELETE_EMP, id})
}

export function removeEmployee(id) {
    return ({type: REMOVE_EMP, id})
}
//is there any way to DRY DELETE and REMOVE? i tried combining case but didnt work.
function reducer(state = initialState, action){
    switch (action.type){
        default:
            console.log(state)
            return state
        case GET_ALL:
            console.log('action',action)
            return {...state, departments: action.departments, employees: action.employees}
        case DELETE_EMP:
        case REMOVE_EMP:
            const employees = state.employees.filter(employee => employee.id !== action.id)
            return {...state, employees}
        // case REMOVE_EMP:
        //     const deptEmployees = state.employees.filter(employee => employee.id !== action.id)
        //     return {...state, employees: deptEmployees}
    }
}

const store = createStore(
    reducer,
    applyMiddleware(loggerMiddleware)
)

console.log('store', store)

export default store
import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (lname_, fname_, fathername_, adress, phone_num, birth_date, hiring_date, contract_expiration, position_, email,password_) => {
    const {data} = await $authHost.post('api/employee/registration',{lname_, fname_, fathername_, adress, phone_num, birth_date, hiring_date, contract_expiration, position_, email,password_})
    return data
}

export const Login = async (email, password_) => {
    const {data} = await $host.post('api/employee/login', {email, password_})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/employee/check', )
    localStorage.getItem('token', data.token)
    return jwt_decode(data.token)
}
export const checkpar = async () => {
    const {data} = await $authHost.get('api/parent/parcheck', )
    localStorage.getItem('token_parent', data.token_parent)
    return jwt_decode(data.token_parent)
}
export const registrationPar = async  (lname_, fname_, fathername_, birth_date, parent_type,adress,work_place,phone_num,email,password_) =>{
    const response = await $authHost.post('api/parent/registration',{lname_, fname_, fathername_, birth_date, parent_type,adress,work_place,phone_num,email,password_})
    return response
}
export const LoginPar = async (email, password_) => {
    const {data} = await $host.post('api/parent/login', {email, password_})
    localStorage.setItem('token_parent', data.token_parent)
    return jwt_decode(data.token)
}



export const registrationChild = async (child_lname, child_fname, child_fathername,child_birth_date, receipt_date,release_date,  child_adress, medical_comment,  gender, group_name) =>{
    const response = await $authHost.post('api/child/post',{child_lname, child_fname, child_fathername,child_birth_date, receipt_date,release_date,  child_adress, medical_comment,  gender, group_name})
    return response
}
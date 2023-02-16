import {$authHost, $host} from "./index";

export const fetchEmployee = async () => {
    const {data} = await $authHost.get('api/group/getemployee',{})
    return data
}

export const AddGroup = async (group_name,type_,fk_employee_id) => {
    const {data} = await $authHost.post('api/group/post', {group_name,type_,fk_employee_id})
    return data
}
export const getEmptyGroups = async () => {
    const {data} = await $authHost.get('api/group/getemptygroups',{})
    return data
}

export const DeleteGroup = async (group_id) => {
    const {data} = await $authHost.post('api/group/delete', {group_id})
    return data
}

export const GetOneParent = async (parent_id)=>{
    const {data} = await $authHost.post('api/parent/getonepar', {parent_id} )
    return data
}

export const PutParent = async  (parent_id,lname_, fname_, fathername_, birth_date, parent_type,adress,work_place,phone_num,email) =>{
    const response = await $authHost.post('api/parent/put',{parent_id,lname_, fname_, fathername_, birth_date, parent_type,adress,work_place,phone_num,email})
    return response
}


export const delPar = async  (parent_id) =>{
    const response = await $authHost.post('api/parent/delete',{parent_id})
    return response
}

export const PutEmployee = async  (employee_id,lname_, fname_, fathername_,  adress,phone_num, birth_date, hiring_date, contract_expiration, position_, email) =>{
    const response = await $authHost.post('api/employee/put',{employee_id,lname_, fname_, fathername_,  adress,phone_num, birth_date, hiring_date, contract_expiration, position_, email})
    return response
}

export const fireEmployee = async (employee_id) =>{
    const response = await $authHost.post('api/employee/fire',{employee_id})
    return response
}

export const releaseChild = async (child_id) =>{
    const response = await $authHost.post('api/child/delete',{child_id})
    return response
}

export const putChild = async  (child_id,child_lname, child_fname, child_fathername,child_birth_date, receipt_date,release_date,  child_adress, medical_comment,  gender, group_name) =>{
    const response = await $authHost.post('api/child/put',{child_id,child_lname, child_fname, child_fathername,child_birth_date, receipt_date,release_date,  child_adress, medical_comment,  gender,group_name})
    return response
}


export const postSubject = async (subject_name,fk_employee_id) =>{
    const response = await $authHost.post('api/subject/post',{subject_name,fk_employee_id})
    return response
}


export const getSubjects = async () => {
    const {data} = await $authHost.get('api/subject/get',{})
    return data
}

export const getEmpBySubject = async (subject_name) => {
    const {data} = await $authHost.post('api/subject/getbyname',{subject_name})
    return data
}

export const putSubject = async (subject_name,fk_employee_id) => {
    const {data} = await $authHost.post('api/subject/put',{subject_name,fk_employee_id})
    return data
}

export const delSubject = async (subject_name) => {
    const {data} = await $authHost.post('api/subject/delete',{subject_name})
    return data
}

export const delSchedule = async (schedule_id) => {
    const {data} = await $authHost.post('api/schedule/delete',{schedule_id})
    return data
}

export const postSchedule = async ( day_week,time_,subject_name,group_name) =>{
    const response = await $authHost.post('api/schedule/post',{ day_week,time_,subject_name,group_name})
    return response
}


export const fetchParentbyid = async (child_id)=>{
    const {data} = await $authHost.post('api/parent/getparentbyid',{child_id})
    return data
}

export const fetchChildbyid = async (parent_id)=>{
    const {data} = await $authHost.post('api/parent/getchildbyid',{parent_id})
    return data
}

export const postFamily = async (parent_id,child_id)=>{
    const {data} = await $authHost.post('api/child/postfamily',{parent_id,child_id})
    return data
}

export const deleteFamily = async (child_id,parent_id)=>{
    const {data} = await $authHost.post('api/child/deletefamily',{child_id,parent_id})
    return data
}


export const deleteNews = async (news_id) =>{
    const {data} = await $authHost.post('/api/employee/remnew', {news_id})
    return data
}

export const addNews = async (topic,text_) =>{
    const {data} = await $authHost.post('/api/employee/addnew', {topic,text_})
    return data
}

export const getReceiptYears = async () =>{
    const {data} = await $authHost.get('/api/child/getyear')
    return data
}

export const getChildAudit = async (receipt_date)=>{
    const {data}= await $authHost.post('/api/child/auditbyyear',{receipt_date})
    return data
}

export const empStat = async (receipt_date)=>{
    const {data}= await $authHost.post('/api/child/state',{receipt_date})
    return data
}
export const empFStat = async (receipt_date)=>{
    const {data}= await $authHost.post('/api/child/statf',{receipt_date})
    return data
}

export const childStat = async (receipt_date)=>{
    const {data}= await $authHost.post('/api/child/statc',{receipt_date})
    return data
}


export const oneAudit = async (child_id) =>{
    const {data} = await $host.get('api/child/getaudit/' + child_id)
    return data
}
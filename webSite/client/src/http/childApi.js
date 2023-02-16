import {$authHost, $host} from "./index";


export const fetchGroups = async () => {
    const {data} = await $host.get('api/group/getnames',{})
    return data
}

//1//

export const fetchKids = async () => {
    const {data} = await $host.get('api/child/getall',{})
    return data
}

export const fetchOneKid = async (child_id) => {
    const {data} = await $host.get('api/child/getone/' + child_id)
    return data
}

export const fetchDairy = async (child_id) => {
    const {data} = await  $host.get('api/dairy/getchilddairy/' + child_id)
    return data
}
export const fetchAvgDairy = async (child_id) => {
    const {data} = await  $host.get('api/dairy/getavgdairy/' + child_id)
    return data
}

export const fetchAllDairy = async (child_id) =>{
    const {data} = await $host.get('api/dairy/getall/' + child_id)
    return data
}

export const fetchByGroup = async (group_name) => {
    const {data} = await $host.post('api/child/getbygrouptype',{group_name})
    return data
}

export const fetchParent = async (child_id)=>{
    const {data} = await $authHost.get('api/parent/getparent/' + child_id)
    return data
}

export const fetchByLname = async (child_lname) => {
    const {data} = await $host.post('api/child/getbylname',{child_lname})
    return data
}

export const createDairy = async (fk_child_id, nutrition, activity, gen_mood) => {
    const {data} = await $authHost.post('api/dairy/post',{fk_child_id, nutrition, activity, gen_mood})
    return data
}


export const group_info = async (group_id) =>{
    const {data} = await $authHost.post('api/group/info' , {group_id})
    return data
}

export const total_count = async() =>{
    const {data} = await $authHost.get('api/child/total',{})
    return data
}
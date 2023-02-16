import {$authHost, $host} from "./index";

export const fetchAllParent = async ()=>{
    const {data} = await $authHost.get('api/parent/getall',{})
    return data
}

export const fetchOneParent = async (parent_id)=>{
    const {data} = await $authHost.get('api/parent/getone/' + parent_id)
    return data
}

export const fetchOneParentChild = async (parent_id)=>{
    const {data} = await $authHost.get('api/parent/getchild/' + parent_id)
    return data
}
import {$authHost, $host} from "./index";

export const fetchSchedule1 = async (group_name) => {
    const {data} = await $host.post('api/schedule/getgroupday1',{group_name})
    return data
}
export const fetchSchedule2 = async (group_name) => {
    const {data} = await $host.post('api/schedule/getgroupday2',{group_name})
    return data
}
export const fetchSchedule3 = async (group_name) => {
    const {data} = await $host.post('api/schedule/getgroupday3',{group_name})
    return data
}
export const fetchSchedule4 = async (group_name) => {
    const {data} = await $host.post('api/schedule/getgroupday4',{group_name})
    return data
}
export const fetchSchedule5 = async (group_name) => {
    const {data} = await $host.post('api/schedule/getgroupday5',{group_name})
    return data
}

export const fetchNews = async () =>{
    const {data} = await $host.get('api/employee/getnews',{})
    return data
}
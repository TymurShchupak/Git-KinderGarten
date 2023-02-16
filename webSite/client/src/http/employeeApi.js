import {$authHost, $host} from "./index";

export const fetchOneEmployee = async (employee_id) => {
    const {data} = await $authHost.get('api/employee/getone/' + employee_id)
    return data
}

export const fetchAllWorkingEmployee = async () => {
    const {data} = await $authHost.get('api/employee/getworking',{})
    return data

}
export const fetchAllFiredEmployee = async () => {
    const {data} = await $authHost.get('api/employee/getfired',{})
    return data

}

export const fetchbyLname = async (lname_) => {
    const {data} = await $authHost.post('api/employee/getbylname',{lname_})
    return data
}


export const ranking = async (number) => {
    const {data} = await $authHost.post('api/employee/getrank', {number})
    return data
}

export const allowedtofire = async () => {
    const {data} = await $authHost.get('api/employee/gettofire',{})
    return data

}
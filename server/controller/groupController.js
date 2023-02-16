const { Pool } = require('pg')
const db = require('../db')
class GroupController{

    async post(req,res){
        const {group_name,type_,fk_employee_id} = req.body
        const response = await db.query(`insert into group2_0 VALUES(DEFAULT,'${group_name}','${type_}','${fk_employee_id}')`)
        
        return res.json(response)

    }

    async getnames(req,res){
        const response = await db.query(`select group_id,group_name from group2_0`)

        return res.json(response.rows)
    }

    async getemptygroups(req,res){
        const response = await db.query(`select * from group2_0 full outer join child2_0 on 
child2_0.fk_group_id = group2_0.group_id where child_id is null`)

        return res.json(response.rows)
    }

    async gettypes(req,res){
        const response = await db.query(`select  count(group_id),type_ from group2_0
group by type_`)

        return res.json(response.rows)
    }

    async getemployee(req,res){
        const response = await db.query(`select employee_id , lname_, fname_, fathername_ from employee2_0 where position_ = 'Викладач' and status = 1 `)
        return res.json(response.rows)
    }


    async put(req,res){
        const {group_id,group_name,type_,fk_employee_id} = req.body
        const response = await db.query(`update group2_0 set group_name='${group_name}',type_='${type_}',fk_employee_id='${fk_employee_id}' where group_id = '${group_id}'`)

        return res.json(response.rows)
    }

    async delete(req,res){
        const {group_id} = req.body
        const response = await db.query(`Delete from group2_0 where group_id = '${group_id}'`)

        return res.json(response)

    }
}

module.exports = new GroupController()
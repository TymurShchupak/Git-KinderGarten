const { Pool } = require('pg')
const db = require('../db')
class ScheduleController {

    async post(req,res){
        const { day_week,time_,subject_name,group_name} = req.body

        const fk_group_id = (await db.query(`select group_id from group2_0 where group_name = '${group_name}'`,)).rows[0].group_id
        const fk_subject_id = (await db.query(`select subject_id from subject2_0 where subject_name = '${subject_name}'`)).rows[0].subject_id

        const response = await db.query(`insert into schedule2_0 values('${day_week}',
            '${time_}','${fk_subject_id}','${fk_group_id}',DEFAULT)`)

        return res.json(response)

    }

    async getgroup(req,res){
        const {fk_group_id} = req.body
        const response = await db.query(`select * from schedule2_0 where fk_group_id = 
        '${fk_group_id}'`)

        return res.json(response.rows)
    }

    async getgroupday1(req,res){
        const {group_name} = req.body
        const response = await db.query(`select schedule_id,day_week, time_, subject_name, lname_,fname_,fathername_
from schedule2_0 inner join subject2_0 on subject2_0.subject_id = schedule2_0.fk_subject_id 
inner join employee2_0 on employee2_0.employee_id = subject2_0.fk_employee_id
inner join group2_0 on group2_0.group_id = schedule2_0.fk_group_id
where  group_name = '${group_name}' and day_week = 1
order by time_`)

        return res.json(response.rows)
    }
    async getgroupday2(req,res){
        const {group_name} = req.body
        const response = await db.query(`select schedule_id, day_week, time_, subject_name, lname_,fname_,fathername_
from schedule2_0 inner join subject2_0 on subject2_0.subject_id = schedule2_0.fk_subject_id 
inner join employee2_0 on employee2_0.employee_id = subject2_0.fk_employee_id
inner join group2_0 on group2_0.group_id = schedule2_0.fk_group_id
where  group_name = '${group_name}' and day_week = 2
order by time_`)

        return res.json(response.rows)
    }
    async getgroupday3(req,res){
        const {group_name} = req.body
        const response = await db.query(`select schedule_id, day_week, time_, subject_name, lname_,fname_,fathername_
from schedule2_0 inner join subject2_0 on subject2_0.subject_id = schedule2_0.fk_subject_id 
inner join employee2_0 on employee2_0.employee_id = subject2_0.fk_employee_id
inner join group2_0 on group2_0.group_id = schedule2_0.fk_group_id
where  group_name = '${group_name}' and day_week = 3
order by time_`)

        return res.json(response.rows)
    }
    async getgroupday4(req,res){
        const {group_name} = req.body
        const response = await db.query(`select schedule_id, day_week, time_, subject_name, lname_,fname_,fathername_
from schedule2_0 inner join subject2_0 on subject2_0.subject_id = schedule2_0.fk_subject_id 
inner join employee2_0 on employee2_0.employee_id = subject2_0.fk_employee_id
inner join group2_0 on group2_0.group_id = schedule2_0.fk_group_id
where  group_name = '${group_name}' and day_week = 4
order by time_`)

        return res.json(response.rows)
    }
    async getgroupday5(req,res){
        const {group_name} = req.body
        const response = await db.query(`select schedule_id, day_week, time_, subject_name, lname_,fname_,fathername_
from schedule2_0 inner join subject2_0 on subject2_0.subject_id = schedule2_0.fk_subject_id 
inner join employee2_0 on employee2_0.employee_id = subject2_0.fk_employee_id
inner join group2_0 on group2_0.group_id = schedule2_0.fk_group_id
where  group_name = '${group_name}' and day_week = 5
order by time_`)

        return res.json(response.rows)
    }

    async delete(req,res){
        const {schedule_id} = req.body
        const response = await db.query(`delete from schedule2_0 where schedule_id = '${schedule_id}'`)
        return res.json(response.rows)
    }
}

module.exports = new ScheduleController()
const { Pool } = require('pg')
const db = require('../db')
const ApiError = require("../error/ApiError");
class ChildController {
    async post(req, res) {
        const {
            child_lname,
            child_fname,
            child_fathername,
            child_birth_date,
            receipt_date,
            release_date,
            child_adress,
            medical_comment,
            gender,
            group_name
        } = req.body
        const fk_group_id = (await db.query(`select group_id from group2_0 where group_name = '${group_name}'`,)).rows[0].group_id
        const response = await db.query(`insert into child2_0 VALUES(DEFAULT,'${child_lname}','${child_fname}','${child_fathername}','${child_birth_date}','${receipt_date}','${release_date}','${child_adress}','${medical_comment}','${gender}','${fk_group_id}')`)
        return res.json(response)
    }

    async getall(req, res) {
        const response = await db.query(`select * from child2_0 inner join group2_0 on child2_0.fk_group_id = group2_0.group_id`)

        return res.json(response.rows)
    }

    async getbylname(req, res) {
        const {child_lname} = req.body
        const response = await db.query(`select * from child2_0 where LOWER(child_lname) ilike '${child_lname}%'`)

        return res.json(response.rows)
    }

    async getbygrouptype(req, res) {
        const {type_, group_name} = req.body
        if (!group_name) {
            const response = await db.query(`select * from child2_0 inner join  group2_0 on 
child2_0.fk_group_id = group2_0.group_id `)
            return res.json(response.rows)
        } else if (!type_) {
            const response = await db.query(`select * from child2_0 inner join  group2_0 on 
child2_0.fk_group_id = group2_0.group_id where group_name = '${group_name}' `)
            return res.json(response.rows)
        }
    }

    async getone(req, res, next) {
        const {child_id} = req.params
        if (!child_id) {
            return next(ApiError.badRequest('Всі поля повинні бути заповнені!'))
        }
        const response = await db.query(`select * from child2_0 full outer join group2_0 on 
        child2_0.fk_group_id = group2_0.group_id where child_id = '${child_id}'`)

        return res.json(response.rows)
    }

    async put(req, res) {
        const {
            child_id,
            child_lname,
            child_fname,
            child_fathername,
            receipt_date,
            child_birth_date,
            child_adress,
            medical_comment,
            release_date,
            gender,
            group_name
        } = req.body
        const fk_group_id = (await db.query(`select group_id from group2_0 where group_name = '${group_name}'`,)).rows[0].group_id
        const response = await db.query(`update child2_0 set child_lname ='${child_lname}',child_fname ='${child_fname}',child_fathername='${child_fathername}',receipt_date='${receipt_date}',child_birth_date='${child_birth_date}',child_adress='${child_adress}',medical_comment='${medical_comment}',release_date='${release_date}',gender='${gender}', fk_group_id = '${fk_group_id}' where child_id ='${child_id}' `)

        return res.json(response)

    }


    async delete(req, res) {
        const {child_id} = req.body
        const response = await db.query(`delete from child2_0 where child_id = '${child_id}'`)

        return res.json(response)

    }

    async postfamily(req, res) {
        const {child_id, parent_id} = req.body
        const response = await db.query(`INSERT INTO family2_0(fk_parent_id, fk_child_id , family_id)
VALUES('${parent_id}','${child_id}', DEFAULT)`)

        return res.json(response)

    }

    async deletefamily(req, res) {
        const {child_id,parent_id} = req.body
        const response = await db.query(`delete from family2_0 where fk_parent_id = '${parent_id}' and fk_child_id = '${child_id}' `)

        return res.json(response)

    }
}
module.exports = new ChildController()
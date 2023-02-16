const db = require("../db");
const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require("express");


const generateJwt = (parent_id, email, parent_type) => {
    return jwt.sign(
        { parent_id, email,parent_type },
        process.env.SECRET_KEY2,
        { expiresIn: '24h' }
    )
}


class ParentController {

    async registration(req, res, next) {
        const {lname_, fname_, fathername_, birth_date,parent_type,adress,work_place,phone_num,email,password_} = req.body
        if (!phone_num || !birth_date || !lname_ || !fname_ || !fathername_ || !email || !parent_type || !password_ || !adress || !work_place) {
            return next(ApiError.badRequest('Всі поля повинні бути заповнені!'))
        }
        const hashPassword = await bcrypt.hash(password_, 12)
        const parent = await db.query(`insert into parent2_0 VALUES(DEFAULT,'${lname_}','${fname_}','${fathername_}','${birth_date}','${parent_type}', '${adress}','${work_place}','${phone_num}','${email}','${hashPassword}') `)

        return res.json(parent)

    }

    async login(req, res, next) {
        const { email, password_ } = req.body
        const parent_type = (await db.query('Select parent_type from parent2_0 where email = $1', [email])).rows[0].parent_type
        const parent = (await db.query('Select email from parent2_0 where email = $1', [email])).rows[0].email
        const parent_id = (await db.query('select parent_id from parent2_0 where email=$1', [email])).rows[0].parent_id
        let passworddb = (await db.query('Select password_ from parent2_0 where email = $1', [email])).rows[0].password_
        let comparePassword = bcrypt.compareSync(password_, passworddb)
        if (!comparePassword) {
            return next(ApiError.internal('Вказаний пароль не правильний.'))

        }

        const token_parent = generateJwt(parent_id, parent,parent_type)
        return res.json({ token_parent })

    }
    async PARcheck(req, res) {
        const token_parent = generateJwt(req.user.parent_id, req.user.email,req.user.parent_type)
        return res.json({ token_parent })

    }

    async getall(req, res) {
        const response = await db.query(`select parent_id,lname_, fname_, fathername_, birth_date,parent_type,adress,work_place,phone_num,email from parent2_0`)

        return res.json(response.rows)
    }

    async getone(req, res) {
        const { parent_id } = req.params
        const response = await db.query(`select parent_id,lname_, fname_, fathername_, birth_date,parent_type,adress,work_place,phone_num,email from parent2_0 where parent_id = '${parent_id}'`)

        return res.json(response.rows)
    }
    async getonepar(req, res) {
        const { parent_id } = req.body
        const response = await db.query(`select parent_id,lname_, fname_, fathername_, birth_date,parent_type,adress,work_place,phone_num,email from parent2_0 where parent_id = '${parent_id}'`)

        return res.json(response.rows)
    }

    async getchild(req,res){
        const {parent_id} = req.params
        const response = await db.query(`select  parent_type, parent_id, child_id, child_lname, child_fname, child_fathername from parent2_0 inner join family2_0 on parent2_0.parent_id = family2_0.fk_parent_id 
inner join child2_0 on family2_0.fk_child_id = child2_0.child_id where parent_id = '${parent_id}'`)
        return res.json(response.rows)
    }
    async getparent(req,res){
        const {child_id} = req.params
        const response = await db.query(`select lname_,fname_,fathername_, parent_type, parent_id, child_id from parent2_0 inner join family2_0 on parent2_0.parent_id = family2_0.fk_parent_id 
inner join child2_0 on family2_0.fk_child_id = child2_0.child_id where child_id = '${child_id}'`)
        return res.json(response.rows)
    }

    async getparentbyid(req,res){
        const {child_id} = req.body
        const response = await db.query(`select lname_,fname_,fathername_, parent_type, parent_id, child_id from parent2_0 inner join family2_0 on parent2_0.parent_id = family2_0.fk_parent_id 
inner join child2_0 on family2_0.fk_child_id = child2_0.child_id where child_id = '${child_id}'`)
        return res.json(response.rows)
    }

    async getchildbyid(req,res){
        const {parent_id} = req.body
        const response = await db.query(`select child_lname,child_fname,child_fathername, parent_type, parent_id, child_id from parent2_0 inner join family2_0 on parent2_0.parent_id = family2_0.fk_parent_id 
inner join child2_0 on family2_0.fk_child_id = child2_0.child_id where parent_id = '${parent_id}'`)
        return res.json(response.rows)
    }

    async put(req, res) {
        const {parent_id,lname_, fname_, fathername_, birth_date, parent_type, adress, work_place, phone_num, email} = req.body
        const response = await  db.query(`update parent2_0 set lname_ = '${lname_}' ,
          fname_ = '${fname_}', fathername_ = '${fathername_}', birth_date = '${birth_date}',
          parent_type = '${parent_type}', adress = '${adress}', work_place = '${work_place}',
          phone_num = '${phone_num}', email = '${email}'
          where parent_id = '${parent_id}'`)
        return res.json(response.rows)
    }
    async delete(req, res) {
const {parent_id} = req.body
        const response = await db.query(`delete from parent2_0 where parent_id = '${parent_id}'`)
        return res.json(response.rows)
    }
}

module.exports = new ParentController()
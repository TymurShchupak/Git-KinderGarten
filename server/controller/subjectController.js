const db = require('../db')
class SubjectController {


    //Добавление в таблицу
    async post(req, res) {
        const { subject_name, fk_employee_id } = req.body
        const response = await db.query(`insert into subject2_0 values(DEFAULT, '${subject_name}',
            '${fk_employee_id}')`)
        return res.json(response)
    }

    //Получить все с таблички
    async get(req, res) {
        const response = await db.query('select * from subject2_0')

        return res.json(response.rows)

    }
    async getbyname(req, res) {
        const {subject_name} = req.body
        const response = await db.query(`select subject_id, subject_name, lname_ , fname_ ,fathername_, employee_id from subject2_0 inner join employee2_0 on employee2_0.employee_id = subject2_0.fk_employee_id where subject_name = '${subject_name}' limit 1`)
        return res.json(response.rows)

    }

    //Изменение данных в таблице
    async put(req, res) {
        const { subject_name, fk_employee_id } = req.body
        const response = await db.query(`update subject2_0 set fk_employee_id = '${fk_employee_id}' where subject_name = '${subject_name}'`)
        return res.json(response)
    }

    //Удаление по названию
    async delete(req, res) {
        const { subject_name } = req.body
        const response = await db.query(`delete from subject2_0 where subject_name = 
        '${subject_name}'`)
        return res.json(response)

    }
}

module.exports = new SubjectController()
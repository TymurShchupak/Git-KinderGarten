const { Pool } = require('pg')
const db = require('../db')
const ApiError = require("../error/ApiError");
class DairyController {
    async post(req, res) {
        const { fk_child_id, nutrition, activity, gen_mood } = req.body
        const response = await db.query(`insert into dairy2_0 VALUES(DEFAULT,'${fk_child_id}',DEFAULT,'${nutrition}','${activity}','${gen_mood}')`)

        return res.json(response)

    }

    async getchilddairy(req, res,next) {
        const { fk_child_id } = req.params
        if (!fk_child_id) {
            return next(ApiError.badRequest('Всі поля повинні бути заповнені!'))
        }
        const response = await db.query(`select dairy_num,date_,nutrition,activity,gen_mood from dairy2_0 where fk_child_id = '${fk_child_id}' and date_ = current_date `)

        return res.json(response.rows)
    }

async getAvgDairy (req,res,next) {
    const { fk_child_id } = req.params
    if (!fk_child_id) {
        return next(ApiError.badRequest('Всі поля повинні бути заповнені!'))
    }
    const response = await db.query(`SELECT fk_child_id ,avg(gen_mood)::numeric(10,2) as avg_mood , avg(activity)::numeric(10,2) as avg_activity, avg(Nutrition)::numeric(10,2) 
as avg_nutrition FROM dairy2_0 where fk_child_id ='${fk_child_id}'
group by fk_child_id `)

    return res.json(response.rows)
}

    async getall(req, res,next) {

        const { fk_child_id } = req.params
        if (!fk_child_id) {
            return next(ApiError.badRequest('Всі поля повинні бути заповнені!'))
        }
        const response = await db.query(`select * from dairy2_0 where fk_child_id = '${fk_child_id}' order by date_ desc`)

        return res.json(response.rows)
    }

    async put(req, res) {
        const { fk_child_id, nutrition, activity, gen_mood } = req.body
        const response = await db.query(`update subject2_0 set fk_child_id = '${fk_child_id}',nutrition='${nutrition}', activity = '${activity}', gen_mood ='${gen_mood}' where date(date_) = current_date`)
        return res.json(response)


    }

   

}
module.exports = new DairyController()
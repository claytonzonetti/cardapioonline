const db = require('../../config/db')
const Base = require('./Base')


Base.init({ table: 'categories' })

module.exports = {
    ...Base,
    async categories(){
        const query = `SELECT ct.name, ct.id FROM products pr
                     LEFT JOIN categories ct ON ct.id = pr.category_id
                     GROUP BY ct.id
                     ORDER BY ct.name`

        const results = await db.query(query)
        return results.rows
    }, 
    async categoriesInitiation(){
        const query = `SELECT id, name FROM categories
                       WHERE initiation = 1`

        const results = await db.query(query)        
        return results.rows[0]
    }

    
}
const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'sales' })

module.exports = {
    ...Base,
    async listOpenSales(filter) {
        const query = `SELECT sales.id AS sale_id, sales.status AS sale_status, sales.created_at, sales.updated_at, 
        products.name as produto, orders.id, orders.buyer_id, orders.product_id, orders.price, orders.quantity, orders.total, 
        users.name, users.address, users.cep, users.telefone1, users.email
        FROM sales  
        LEFT JOIN orders on orders.sale_id = sales.id
        LEFT JOIN users on users.id = orders.buyer_id
        LEFT JOIN products on products.id = orders.product_id
        WHERE
        sales.status = '${filter}'
        ORDER BY sales.id, ORDERS.ID`

        const results = await db.query(query)

        return results.rows
    },
}
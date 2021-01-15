const LoadProductService = require('../services/LoadProductService')
const LoadOrderService = require('../services/LoadOrderService')
const User = require('../models/User')
const Order = require('../models/Order')
const Sale = require('../models/Sale')

const Cart = require('../../lib/cart')

module.exports = { 
    async index(req, res) {
      //  console.log(req.query.status)        
        
        const sales = await Sale.listOpenSales(req.query.status)
        return res.json(sales)
    },
    async put(req, res) {        
       
        const createSalesPromise = req.body.map(async item => {
            const { sale_id, status } = item
          
            await Sale.update(sale_id, {
                status
            })        

        })    
        
        await Promise.all(createSalesPromise)
        
        return res.json(req.body)
    },    












    async sales(req, res) {    
      //  console.log(req.session.userId)    
        const sales = await LoadOrderService.load('orders', {
            where: { seller_id: req.session.userId }            
        })
      //  console.log(sales)
        return res.json(sales)
    },
    async show(req, res) {
        const order = await LoadOrderService.load('order', {
            where: {id: req.params.id}
        })

        return res.render("orders/details", { order })
    },
    async post1(req, res) {
        try {  

            // pegar os produtos do carrinho
            const cart = Cart.init(req.session.cart)
            // dados do comprador pegando a requisição do usuario logado
            const buyer_id = req.session.userId
            
   
                const status = "open"  

                const saleID = await Sale.create({                    
                    total: 0,                    
                    status
                })
            
                if(!saleID)
                throw new Error("Erro ao inserir pedido");    

                const sale_id = saleID

            const createOrdersPromise = Cart.items.map(async item => {
                let { product, price:total, quantity } = item
                const { price, id: product_id, user_id: seller_id } = product

                const order = await Order.create({
                    seller_id,
                    buyer_id,
                    product_id,
                    price,
                    total,
                    quantity,
                    status,
                    sale_id
                })

                if(!order)
                throw new Error("Erro ao inserir itens no pedido");

                return order
            })

            await Promise.all(createOrdersPromise)

            delete req.session.cart
            Cart.init()

            // notificar o usuário com alguma mensagem de sucesso
            return res.render('orders/success')
            
        }
        catch(err) {
            // ou erro
            console.error(err)
            return res.render('orders/error')
            
        }

    },
    async update(req, res) {
        try {

            const { id, action } = req.params

            const acceptedActions = ['close', 'cancel']
            
            if(!acceptedActions.includes(action)) return res.send("Can't do this action")

            // pegar o pedido
            const order = await Order.findOne({
                where: { id }
            })

            if(!order) return res.send('Order not found')

            // verificar se ele está aberto
            if(order.status != 'open') return res.send("Can't do this action")

            // atualizar o pedido
            const statuses = {
                close: "sold",
                cancel: "canceled"
            }

            order.status = statuses[action]

            await Order.update(id, {
                status:  order.status
            })

            // redirecionar
            return res.redirect('/orders/sales')
            
        } catch (error) {
            console.error(error);
        }
    }
}
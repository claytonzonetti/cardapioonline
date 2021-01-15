const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')
const ProductController = require('../app/controllers/ProductController')

const products = require('./products')
const users = require('./users')
const cart = require('./cart')
const orders = require('./orders')
const remote = require('./remote')

routes.get('/', HomeController.index)
routes.use('/products', products)
routes.use('/users', users)
routes.use('/cart', cart)
routes.use('/orders', orders)
routes.use('/remote', remote)


// Alias
routes.get('/ads/create', function(req, res) {
    return res.redirect("/products/create")
})

routes.get('/accounts', function(req, res) {
    return res.redirect("/users/login")
})

routes.get('/todos', ProductController.todososProdutos)


module.exports = routes
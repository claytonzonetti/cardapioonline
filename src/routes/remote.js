const express = require('express')
const routes = express.Router()

const RemoteController = require('../app/controllers/RemoteController')

routes.get('/all', RemoteController.index)
routes.post('/all', RemoteController.put)


module.exports = routes
const Product = require('../models/Product')
const LoadProductService = require('../services/LoadProductService')
const ModelCategory = require('../models/Category')

module.exports = { 
    async index(req, res) {
        try {
            let { filter, category } = req.query            
            let searched = filter
          
             filter = null       
            
             if(category){             
             req.session.useCategory.id = category
             req.session.useCategory.name = searched
            } else
             {category = req.session.useCategory.id
              searched = req.session.useCategory.name
             }

             allProducts = await LoadProductService.load('productsCategory', category)                                            
             const products = allProducts             
         
            const allcategories = await ModelCategory.categories()
            const categories = allcategories            

            const search = {            
                term: searched,
                total: products.length
            }
            
            return res.render("search/index-cardapio", { products, search, categories })

        }
        catch(err) {
            console.error(err)
        }
        
    }
}
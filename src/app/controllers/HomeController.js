const LoadProductService = require('../services/LoadProductService')
const ModelCategory = require('../models/Category')

module.exports = { 
    async index(req, res) {
        
         try {  
  /*       
            let allProducts
            let searched = 'Toda a Loja'
            let categoryInitial

            const categoryInitiation = await ModelCategory.categoriesInitiation()
            categoryInitial = categoryInitiation

            req.session.useCategory = categoryInitial                 
          
            if (categoryInitial){           
                allProducts = await LoadProductService.load('productsCategory', categoryInitial.id)                                            
                searched = categoryInitial.name
            } else {             
                allProducts = await LoadProductService.load('products')             
            }
            
            const products = allProducts
                

            //.filter((product, index) => index > 2 ? false : true)            
            //return res.render("home/index-cardapio", { products })


            const search = {
                term: searched,
                total: products.length
            }

            const allcategories = await ModelCategory.categories()
            const categories = allcategories

            return res.render("search/index-cardapio", { products, search ,categories })
*/
            return res.send("texto")
        }
        catch(err) {
            console.error(err)
        }
        
    }
}
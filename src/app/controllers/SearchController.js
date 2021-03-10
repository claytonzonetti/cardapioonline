const Product = require('../models/Product')
const LoadProductService = require('../services/LoadProductService')
const ModelCategory = require('../models/Category')

module.exports = { 
    async index(req, res) {
        try {
            console.log('Tela Pesquisar Por Filtro SearchController')
            //na requisição vem o filtro e o id do filtro
           // console.log('searchController Index req.query')
           // console.log(req.query)
           console.log('----serch controller sessao------')
           
            let categoryInitial = false
            let { filter, category } = req.query
            
            if (filter){
                
            }
            else
            if (req.session.filtro.filter)
            {
            filter = req.session.filtro.filter
            category = req.session.filtro.category            
            } else
            categoryInitial = true
            
      
       
          //  console.log('searchController Session com o  req.query')            
            req.session.filtro = req.query
           // console.log(req.session)                                  

         //   req.session.filtro = category
          //  console.log(`Filtro da categoria ID ${category}`)                      
            const filtro = req.query

            let searched = filter

            //   console.log(`Filtro da categoria ID ${filter}`)                      

          
         //   filter = null       
     /*       
             if(category){                               
                console.log('*************')
             console.log(category)
             req.session.useCategory.id = '1'
             req.session.useCategory.name = searched
             
            } else
             {
                console.log('*************')
                console.log(req.session.useCategory.id)
                console.log(req.session.useCategory.name)                
              //category = req.session.useCategory.id
              //searched = req.session.useCategory.name
                            
             }

         */  
             let products   
             if (categoryInitial == false) {
             allProducts = await LoadProductService.load('productsCategory', category)                                            
             products = allProducts   }                        
             else {             
            products = allProducts = await LoadProductService.load('products')             
            }

            const allcategories = await ModelCategory.categories()
            const categories = allcategories            
            
            let search
            
            try {
                search = {            
                term: searched,                
                total: products.length}
           } catch (error) {
                search = {            
                term: searched,                
                total: 0
           }            

        }

            return res.render("search/index-cardapio", { products, search, categories})
        }
        catch(err) {
            console.error(err)
        }
        
    }
}
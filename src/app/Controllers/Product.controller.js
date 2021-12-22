const Product = require('../Models/Product');


module.exports = {
    async index(req, res){
        try {
            const products = await Product.findAll();

            if(!products){
                return res.status(400).json({error: 'Product not found'});
            }

            return res.status(200).json({ products });
        } catch (error) {
            return res.status(400).json({error: 'Search products failed'});
        }
        
    },

    async store(req, res){
        const { nome, preco, codigo, caracteristicas, imagem } = req.body;

        try {
            const produto = await Product.findOne({ where: {codigo}});

            if( produto ){
                return res.status(400).json({error: 'Product already exists'});
            }

            const product = await Product.create({ 
                nome, 
                preco,
                codigo,
                caracteristicas,
                imagem,  
            });
            if( !product ){
                return res.status(400).json({error: 'Create product failed '});
            }

            return res.status(200).json({ mensage: 'Created product Successfully'});
        } catch (error) {
            return res.status(400).json({error: 'Create product failed'});
        }
    },
    async update(req, res){
        const { product_id } = req.params
        const { nome, preco, codigo, caracteristicas, imagem } = req.body;

        try {
            
            const product = await Product.findByPk(product_id);

            if( !product ){
                return res.status(400).json({error: 'Product not found'});
            }
            
            if(nome){
                product.nome = nome;
            }
            
            if(preco){
                product.preco = preco;
            }
            if(codigo){
                product.codigo = codigo;
            }
            if(caracteristicas){
                product.caracteristicas = caracteristicas;
            }
            if(imagem){
                product.imagem = imagem;
            }

            const productUp = await product.save();
            
            if(! productUp){
                return res.status(400).json({error: 'Update product failed'});
            }
            
            return res.status(200).json({a: productUp ,  mensage: 'Created product Successfully'});

        } catch (error) {
            return res.status(400).json({error: 'Update product failed'});
        }

    }

}
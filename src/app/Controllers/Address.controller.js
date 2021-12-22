const User = require('../Models/User');
const Address = require('../Models/Address');
const Client = require('../Models/Client');

module.exports = {
 
    async store(req, res){
        const { client_id } = req.params;
        const { rua, numero, bairro, cidade, estado } = req.body;
       
        try {

            const client = await Client.findByPk(client_id,{
                    include: { association: 'address'}
                });
                
            if( !client ){
                return res.status(400).json({error: 'Client not found'});
            }
        
            const address = await Address.create({ 
                client_id: client.id,
                rua,
                numero,
                bairro,
                cidade, 
                estado,
            });

            if(! address){
                return res.status(400).json({error: 'Address not created'});
            }

            return res.status(200).json({message: 'Address created successfully'});
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: 'Address not created'});
        }  
    },
    
    async update(req, res){
        const { client_id } = req.params
        const { rua, numero, bairro, cidade, estado } = req.body;

        try {
            
            const client = await Client.findByPk(client_id);

            if( !client ){
                return res.status(400).json({error: 'Client not found'});
            }
            
            const address = await Address.findOne({where: {client_id}});

            if( !address ){
                return res.status(400).json({error: 'Address not found'});
            }


            if(rua){
                address.rua = rua;
            }
            if(numero){
                address.numero = numero;
            }
            if(bairro){
                address.bairro = bairro;
            }
            if(cidade){
                address.cidade = cidade;
            }
            if(estado){
                address.estado = estado;
            }
            

            const addressUp = await address.save();
            
            if(! addressUp){
                return res.status(400).json({error: 'Update address failed'});
            }
            
            return res.status(200).json({a: addressUp ,  mensage: 'Update address Successfully'});

        } catch (error) {
            return res.status(400).json({error: 'Update address failed'});
        }

    },

    async delete(req, res){
        const { client_id } = req.params

       try {

            const client = await Client.findByPk(client_id);

            if( !client ){
                return res.status(400).json({error: 'Client not found'});
            }

            const addressDel = await Address.destroy({where: {client_id: client_id}})

            if(!addressDel){
                return res.status(400).json({error: 'Deleted address failed'});
            }

            return res.status(200).json({message: 'Address deleted successfully'});

       } catch (error) {
           console.log(error);
            return res.status(400).json({error: 'Deleted address failed'});
       }

    }

}

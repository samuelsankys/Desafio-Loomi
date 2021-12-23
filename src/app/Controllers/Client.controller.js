const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const User = require('../Models/User');
const Client = require('../Models/Client');

module.exports = {
    async index(req, res){
        const  {search}  = req.query;
        const filter =  {where: {} }


        const operatorsAliases = {
            like: Op.like,
            or: Op.or
        }

        if(search){

            filter.where[operatorsAliases.or] = [{
                    nome: {
                        [Op.like]: `%${search}%`,
                    },
                },{
                    email: {
                        [Op.like]: `%${search}%`,
                    }
                }]

                console.log(filter.where);
        }

        try {
            const user = await Client.findAll({
                where: filter.where
                ,
                include: {
                    association: 'address'
                },
            });


            if( !user ){
                return res.status(400).json({error: 'Users not found'});
            }

            if(user === []){
                return res.status(400).json({error: 'User not found'});
            }
           
            return res.json(user);
        } catch (error) {
            console.log(error);
        }
    },

    async userDetail(req, res){

        const { client_id } = await req.params;
        
        try {
            const client = await Client.findByPk(client_id, {
                include: { association: 'address'}
            });
            if( !client ){
                return res.status(400).json({error: 'Client not found'});
            }
            
            return res.status(200).json({ client });
        } catch (error) {
            return res.status(400).json({error: 'Search failed'});
        }
    },


    async store(req, res){
        const { user_id } = req.params//userId;
        const { nome, telefone } = req.body;

        try {
            const user = await User.findByPk(user_id);

            if( !user ){
                return res.status(400).json({error: 'User not found'});
            }
          
            const clientSearch = await Client.findOne({where: { user_id } });
           
            if( clientSearch ){
                return res.status(400).json({error: 'Client already exists'});
            }
            const client = await Client.create({
                nome,
                user_id,
                email: user.email,
                telefone,
            });

            if(! client){
                return res.status(400).json({error: 'Create client failed'});
            }

            return res.status(200).json({ mensage: 'Created client Successfully'});

        } catch (error) {
            return res.status(400).json({error: 'Create client failed'});
        }

    },

    async update(req, res){
        const { client_id } = req.params
        const { nome, email, telefone } = req.body;

        try {
            
            const client = await Client.findByPk(client_id);

            if( !client ){
                return res.status(400).json({error: 'Client not found'});
            }
            
            if(nome){
                client.nome = nome;
            }
            
            if(email){
                client.email = email;
            }
            if(telefone){
                client.telefone = telefone;
            }

            const clientUp = await client.save();
            
            if(! clientUp){
                return res.status(400).json({error: 'Update client failed'});
            }

            const user = await User.update({ email: email },
                {
                where: {
                    id: client.user_id
                },
                
            })

            if(! user){
                return res.status(400).json({error: 'Update user failed'});
            }
           
            
            return res.status(200).json({a: clientUp ,  mensage: 'Created client Successfully'});

        } catch (error) {
            return res.status(400).json({error: 'Update client failed'});
        }

    },

    async delete(req, res){
        const { client_id } = req.params

       try {

            const client = await Client.findByPk(client_id);

            if( !client ){
                return res.status(400).json({error: 'Client not found'});
            }
            const clientDel = await Client.destroy({where: {id: client_id}})

            if(!clientDel){
                return res.status(400).json({error: 'Deleted client failed'});
            }

            return res.status(200).json({message: 'Client deleted successfully'});

       } catch (error) {
            return res.status(400).json({error: 'Deleted client failed'});
       }

    }
    
}
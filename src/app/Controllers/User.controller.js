const User = require('../Models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../Config/auth.json');

module.exports = {
    async index(req, res){
        const { email, senha } = req.body;
        try {
    
            const users = await User.findAll({ 
                attributes: {exclude: ['senha', 'createdAt', 'updatedAt']}
            });

            if(!users){
                return res.status(400).json({ message: 'Users not found' });
            }
            
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(400).json({error: 'Search failed'});
        }
       
    },

    async store(req, res){
        const { email, senha } = req.body;

        try {
            const user = await User.findOne({ where: { email } })

            if(user){
                return res.status(400).json({error: 'Already Registered User'});
            }


            const senhaHash = await bcrypt.hashSync(senha, 10);

            if(senhaHash){
                const user = await User.create({ email, senha: senhaHash });

                if(user){
                    return res.status(201).json({message: 'Successfully Registered User'});
                }
            }
            //return res.json(user);
            return res.status(400).json({error: 'Registration failed'});

        } catch (error) {
            return res.status(400).json({error: 'Registration failed'});
        }
       
    },
    async update(req, res){
        const { email, senha } = req.body;


    },

    async delete(req, res){

        const { user_id } = req.params;

        try {
            const user = await User.findOne({ where: { id: user_id } })

            if(!user){
                return res.status(400).json({error: 'User not found'});
            }

            const deleted = await User.destroy({
                where: {
                    id: user_id
                }
            })

            if(deleted == 1){
                res.status(200).json({ message: "User deleted successfully" });
            }

            return res.status(400).json({error: 'User not deleted'});
            
        } catch (error) {
            return res.status(400).json({error: 'Delete failed'});
        }
       

    },

    async authenticate(req, res){
        const { email, senha } = req.body;

        try {
            
            const user = await User.findOne({ where: { email } })

            if( !user ){
                return res.status(400).json({error: 'User not found'});
            }

            const senhaOk = await bcrypt.compare(senha , user.senha);
        
            if(!senhaOk){
                return res.status(400).json({error: 'Invalid password'});
            }

            return res.status(200).send({
                user, 
                token: generateToken({id: user.id})
            });

        } catch (error) {
            return res.status(400).json({error: 'Login failed'});
        }
        
    }, 

    async logout(req, res){
        res.status(200).json({ token: null });
    }
}

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,  {
        expiresIn: 86400,
    })
}
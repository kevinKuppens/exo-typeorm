import { NextFunction, Request, Response } from 'express';
import {sign, verify} from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { UsersModel } from '../../../models/users.model';

class AuthController {
    
    static login = async (req:Request, res:Response, next:NextFunction)=>{
        const userRepository = getRepository(UsersModel);
        const user = await userRepository.findOne({email:req.body.email});
        if(user){
            if(user.password === req.body.password){
                // eslint-disable-next-line no-console
                console.log(user);
                const jwtToken = await sign({
                    exp:Math.floor(Date.now()/1000) +( 60* (parseInt(process.env.JWT_EXP || '1') )),
                    data:user.id
                },
                process.env.JWT_SECRET || 'triptyk');
                // eslint-disable-next-line no-console
                console.log(jwtToken);
                return res.json(jwtToken);
            }
                throw new Error('BAD CREDENTIAL');
            
        }
           
    }

    static authorize = async(req:Request, res:Response, next:NextFunction)=>{
    
        try{
            const jwtToken = req.headers.authorization?.split(' ')[1] || 'notoken';
            const userId = await verify(jwtToken, process.env.JWT_SECRET);
            next();
        }catch(e){
            const err = new Error('Bad token !!');
            err.status = 401;
            next(err);
            
        }
        //token no good err
    }
    
    static checkToken = async(req:Request, res:Response)=>{
    
        try{
            const jwtToken = req.headers.authorization?.split(' ')[1] || 'notoken';
            const userId = await verify(jwtToken, process.env.JWT_SECRET || '');
            return res.json({token:{isValid:true}});
        }catch(e){
            return res.status(401).json({token:{isValid:false}});      
        }
        
    }

}

export {AuthController};
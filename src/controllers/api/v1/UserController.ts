import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UsersModel } from '../../../models/users.model';



class UserController {
    static create = async(req:Request, res:Response) => {
        const userRepository = await getRepository(UsersModel);
        const newUser = new UsersModel();
        newUser.email = req.body.email;
        newUser.password = req.body.password;


        return res.json({user: await userRepository.save(newUser)});
    }

    static update = async(req:Request, res:Response) => {
        const id = parseInt(req.params.id);
        const userRepository = await getRepository(UsersModel);
        const user = await userRepository.preload({
            id,
            email : req.body.email,
            password : req.body.password
        });
        if(user === undefined){
            throw new Error('USER NOT FOUND');
        }
        return res.json(await userRepository.save(user));
    }
    static delete = async(req:Request, res:Response) => {
        const id = parseInt(req.params.id);
        const userRepository = await getRepository(UsersModel);
        const user = await userRepository.findOne(id);
        if(user){
            return res.json(await userRepository.remove(user));
        }
            throw new Error('USER NOT FOUND');
        
        
    }
    static findById = async(req:Request, res:Response) => {
        const id = parseInt(req.params.id);
        const userRepository = getRepository(UsersModel);

        return res.json(await userRepository.findOne(id));
    }
    static findAll= async (req:Request, res:Response) => {
        const userRepository = getRepository(UsersModel);

        return res.json({users:await userRepository.find()});
     }
}

export {UserController};
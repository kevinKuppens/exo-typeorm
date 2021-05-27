import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { CategoryModel } from '../../../models/category.model';
import { TodosModel } from '../../../models/todos.model';
import { UsersModel } from '../../../models/users.model';



class TodoController {


    static findAll= async (req:Request, res:Response) => {
        const userRepository = getRepository(UsersModel);
        const todosRepository = getRepository(TodosModel);
        const tokenUserId = verify(req.headers.authorization?.split(' ')[1], process.env.JWT_SECRET).data;
        const user =await userRepository.findOne({id : tokenUserId});
        if(req.query.filterByCategory){
            return res.json({todos:await todosRepository.find({where : {user}, order: {categories : 'ASC'}})});
        }
       return res.json({todos:await todosRepository.find({user})});
    }

    static create = async(req:Request, res:Response) => {
        // const todo:Todo = new TodoController.model(req.body);
        const userRepository = getRepository(UsersModel);
        const todosRepository = getRepository(TodosModel);
        const categoryRepository = getRepository(CategoryModel);
        const categories = await categoryRepository.find({id : req.body.categories});
        const tokenUserId = verify(req.headers.authorization?.split(' ')[1], process.env.JWT_SECRET).data;
        const user =await userRepository.findOne({id : tokenUserId});
        req.body.user=user;
        const newTodo = new TodosModel();
        newTodo.title = req.body.title;
        newTodo.description = req.body.description;
        if(user === undefined){
            throw new Error('USER NOT FOUND');
        }
        newTodo.user = user;
        newTodo.categories = categories;
    
        return res.json(await todosRepository.save(newTodo));
    }
    static update = async(req:Request, res:Response) => {
        const todosRepository = getRepository(TodosModel);
        const userRepository = getRepository(UsersModel);
        const categoryRepository = getRepository(CategoryModel);
        const id = parseInt(req.params.id);
        const tokenUserId = verify(req.headers.authorization?.split(' ')[1], process.env.JWT_SECRET).data;
        const user =await userRepository.findOne({id : tokenUserId});
        const categories = await categoryRepository.find({id : req.body.categories});
        const updatedTodo = await todosRepository.preload({
            id,
            title : req.body.title,
            description : req.body.description,
            categories,
            user
        });
        if(user === undefined){
            throw new Error('TODOS NOT FOUND');
        }
        return res.json(await todosRepository.save(updatedTodo));
    }
    static delete = async(req:Request, res:Response) => {
        const todosRepository = getRepository(TodosModel);
        const id = parseInt(req.params.id);
        const todo = await todosRepository.findOne(id);
        if(todo){
            return res.json(await todosRepository.remove(todo));
        }
            throw new Error('TODO NOT FOUND');
    }
    static findById = async(req:Request, res:Response) => {
        const todosRepository = getRepository(TodosModel);
        const id = parseInt(req.params.id);
        return res.json(await todosRepository.findOne(id));
    }
}

export {TodoController};
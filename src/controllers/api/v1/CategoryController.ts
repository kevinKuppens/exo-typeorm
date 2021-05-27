
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { CategoryModel } from '../../../models/category.model';
import { TodosModel } from '../../../models/todos.model';

class CategoryController {
    // static model = getModelForClass(Category);
    static findAll= async (req:Request, res:Response) => {
        const categoryRepository = getRepository(CategoryModel);
        
       return res.json({categories:await categoryRepository.find()});
    }

    static create = async(req:Request, res:Response) => {
        const categoryRepository = getRepository(CategoryModel);
        const todosRepository = getRepository(TodosModel);
        const todos = await todosRepository.find(req.body.todo);
      
        const newCategory = new CategoryModel();
        newCategory.title = req.body.title;
        newCategory.todo = todos;
        return res.json(await categoryRepository.save(newCategory));
    }
    static update = async(req:Request, res:Response) => {
        const id = parseInt(req.params.id);
        const categoryRepository = getRepository(CategoryModel);
        const todosRepository = getRepository(TodosModel);
        const todos = await todosRepository.find(req.body.todo);
        const updatedCategory = await categoryRepository.preload({
            id, 
            title : req.body.title,
            todo : todos
        });
        if(updatedCategory === undefined){
            throw new Error('CATEGORY NOT FOUND');
        }
        return res.json(await categoryRepository.save(updatedCategory));
    }
    static delete = async(req:Request, res:Response) => {
        const categoryRepository = getRepository(CategoryModel);

        const id = parseInt(req.params.id);
        const category =await categoryRepository.findOne(id);
        if(category === undefined){
            throw new Error('CATEGORY NOT FOUND');
        }
        return res.json(await categoryRepository.remove(category));
    }
    static findById = async(req:Request, res:Response) => {
        const id = parseInt(req.params.id);
        const categoryRepository = getRepository(CategoryModel);
        return res.json(await categoryRepository.findOne(id));
    }
}

export {CategoryController};
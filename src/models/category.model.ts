import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { baseModel } from './baseModel.model';
import { TodosModel } from './todos.model';

@Entity()
export class CategoryModel extends baseModel{
    @Column({
        nullable:false
    })
    public title !:string;

    @ManyToMany(()=> TodosModel, (todo) => todo.categories)
    @JoinTable()
    public todo ?: TodosModel[];

}
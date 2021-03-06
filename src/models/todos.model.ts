import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { baseModel } from './baseModel.model';
import { CategoryModel } from './category.model';
import { UsersModel } from './users.model';

@Entity()
export class TodosModel extends baseModel{
    @Column('varchar', {
        nullable:false
    })
    public title!:string;
    @Column('varchar', {
        nullable : false
    })
    public description !: string;

    @ManyToMany(() => CategoryModel, (categories) => categories.todo)
    public categories !: CategoryModel[];

    @ManyToOne(()=>UsersModel, (user) => user.todos)
    @JoinTable()
    public user !: UsersModel;
}
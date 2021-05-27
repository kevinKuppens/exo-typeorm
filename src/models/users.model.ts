import { Column, Entity, OneToMany } from 'typeorm';
import { baseModel } from './baseModel.model';
import { TodosModel } from './todos.model';

@Entity()
export class UsersModel extends baseModel{
    @Column('varchar', {
        nullable:false
    })
    public email!:string;
    @Column('varchar', {
        nullable:false
    })
    public password!:string;
    @OneToMany(() => TodosModel, (todo) => todo.user)
    public todos !: TodosModel;
}
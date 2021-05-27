import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { baseModel } from './baseModel.model';
import { TodosModel } from './todos.model';
import Bcrypt from 'bcrypt'; 

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

    @BeforeInsert()
    async cryptpwd(){
        this.password = await Bcrypt.hash(this.password, 10);
    }
}
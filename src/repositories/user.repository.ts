import { EntityRepository, Repository } from 'typeorm';
import { UsersModel } from '../models/users.model';

@EntityRepository(UsersModel)
export class UserRepository extends Repository<UsersModel>{
    async exists(id:number){
        const tableName = this.metadata.tableName;

        const user = await this.query(`SELECT email, password FROM ${tableName} WHERE id=?`, [id]);
        if(user.length){
            return true;
        }
        return false;
    }

    async usersWithNoTodos(){

        const users = await this.find({
            relations : ['todos']
        });

        return users.filter((e) => e.todos?.length === 0 ); 
    }
}
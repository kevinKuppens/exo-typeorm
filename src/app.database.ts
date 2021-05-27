// import { connect } from 'mongoose';

import { createConnection } from 'typeorm';
import { CategoryModel } from './models/category.model';
import { TodosModel } from './models/todos.model';
import { UsersModel } from './models/users.model';

// class DatabasConnector{
//     static async initDatabase(){
//         try{
//             return await connect(process.env.DB_URI ||'', {
//                 useCreateIndex:true,
//                 useFindAndModify:true,
//                 useNewUrlParser:true,
//                 useUnifiedTopology:true
//             });
//         } catch(error){
//             return false;
//         }
//     }
// }

// export {DatabasConnector};

export class DatabasConnector{
    static async initDataBase(){
        try{
            const connexion = await createConnection({
                type : 'mysql',
                username : 'root', 
                password : 'test123*', 
                host : 'localhost',
                port : 3306,
                name : 'default',
                database : 'todos',
                entities:[UsersModel, CategoryModel, TodosModel],
                synchronize : true
            });

            // eslint-disable-next-line no-console
            console.log('Connexion is set');

            return connexion;
        }catch(e){
            // eslint-disable-next-line no-console
            console.log(e);
        }
    }
}
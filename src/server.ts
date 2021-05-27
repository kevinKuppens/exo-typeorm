import { config } from 'dotenv';
import { getCustomRepository } from 'typeorm';
import { app } from './app.bootstrap';
import { DatabasConnector } from './app.database';
import { UserRepository } from './repositories/user.repository';

config({path:'variables.env'});

const init = async () =>{

    const db = await DatabasConnector.initDataBase();
    if(db){
        app.listen(process.env.PORT, ()=>{
            // eslint-disable-next-line no-console
            console.log(`app listening on port ${process.env.PORT}`);
        });
    } else {
        // eslint-disable-next-line no-console
        console.log('There was an error in the database connection');
    }
    // eslint-disable-next-line no-console
    console.table(await getCustomRepository(UserRepository).usersWithNoTodos());
};

init();
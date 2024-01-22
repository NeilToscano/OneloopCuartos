import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload';
import 'dotenv/config'
import authRoute from '../routes/auth.js'
import usuarioRoute from '../routes/usuarios.js'
import dbConnection from '../database/config.js';
import routerLookUp from '../routes/lookup.js';
import routerForm from '../routes/form.js';

export class server{
    constructor(){
        this.app = express();
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(fileUpload());
        this.app.use( express.json() );
    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use('/api/auth', authRoute);
        this.app.use('/api/usuarios', usuarioRoute);
        this.app.use('/api/lookup', routerLookUp);
        
        this.app.use('/api/form', routerForm);
    }

    listen() {
        this.app.listen(process.env.PORT, () => { console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)} )
    }

}

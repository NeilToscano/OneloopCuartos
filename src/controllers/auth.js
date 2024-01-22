import { generarJWT } from "../helpers/generar-jwt.js";
import Usuario from "../models/usuario.js";
import bcrypt from 'bcrypt';


export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email }).exec();
        if(!usuario){
            return res.status(400).json({
                msg:"Usuario-Password no son correctos"
            })
        }
        const validPassword = bcrypt.compareSync(password,usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg: "Usuario-Password no son validos"
            })
        }
        //Generar JWT
        const token = await generarJWT( usuario.id, '1h' );
        const refreshtoken = await generarJWT( usuario.id, '7d' );

        return res.status(200).json({
            usuario,
            token,
            refreshtoken
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Ocurrió un error desconocido"
        });
    }
}

export const googleSingIn = async(req, res) => {
    const { email, nombre } = req.body;
    const password = ':P';
    try {
        const usuario = await Usuario.findOne({ email }).exec();
        if(!usuario){
            const usuario = new Usuario({ nombre, email, password });
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            usuario.password = bcrypt.hashSync(password, salt);
            await usuario.save();
        }
        
        //Generar JWT
        const newUsuario = await Usuario.findOne({ email }).exec();
        const token = await generarJWT( newUsuario.id, '1h' );
        const refreshtoken = await generarJWT( newUsuario.id, '7d' );

        return res.status(200).json({
            ok: true,
            newUsuario,
            token,
            refreshtoken
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrió un error desconocido"
        });
    }
}
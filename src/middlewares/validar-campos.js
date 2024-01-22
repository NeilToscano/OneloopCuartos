import { request } from "express";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
export const validarCampos = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({ errors: result.array() })
    } 
    next();
}

export const validarJWT = (req, res, next) => {
    const data = req.query
    const { access_token } = data;
    console.log("access_token", access_token);
    try {
        const decoded = jwt.verify(access_token, process.env.PRIVATE_KEY);
        const { uid } = decoded;
        req.uid = uid;
    } catch (error) {
        console.log(error, 'error');
        return res.status(400).json(
            {   ok: false,
                msg: "Token no válido"
            }
        )
    }
    next()

}
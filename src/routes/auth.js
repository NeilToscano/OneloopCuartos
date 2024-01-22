import { Router } from "express";
import { body } from "express-validator";
import { googleSingIn, login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post('/login',[
    body('email').isEmail().withMessage("Debe ser un email correcto"),
    body('password').isLength({ min: 8 }).withMessage("La contraseña debe ser mayor a 8 caracteres"),
    validarCampos], login);

router.post('/google',[
    body('email').isEmail().withMessage("Debe ser un email correcto"),
    body('nombre').notEmpty().withMessage("El nombre es obligatorio"),
    validarCampos], googleSingIn);

export default router;
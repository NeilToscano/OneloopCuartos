import { Router } from "express";
import { query} from "express-validator";
import { validarCampos, validarJWT } from "../middlewares/validar-campos.js";
import { lookup } from "../controllers/lookup.js";

const router = Router();

router.post('',[
    query('access_token').notEmpty().withMessage("Debes Enviar el idToken"),
    validarCampos, validarJWT ], lookup);

export default router;
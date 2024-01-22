import { Router } from "express";
import { query} from "express-validator";
import { validarCampos, validarJWT } from "../middlewares/validar-campos.js";
import { formPost, formGet, formGetPosts, formDeletePosts } from "../controllers/form.js";


const router = Router();
router.post('',[
    query('access_token').notEmpty().withMessage("Debes Enviar el idToken"),
    validarCampos, validarJWT ], formPost);
router.get('', formGet);
router.get('/posts',[query('access_token').notEmpty().withMessage("Debes enviar el idToken"),
    query('id').notEmpty().withMessage("Debes enviar el id usuario"),
    validarCampos, validarJWT], formGetPosts);
router.delete('/posts',[query('access_token').notEmpty().withMessage("Debes enviar el idToken"),
    query('id').notEmpty().withMessage("Debes enviar el id habitación"),
    validarCampos, validarJWT], formDeletePosts);

export default router;
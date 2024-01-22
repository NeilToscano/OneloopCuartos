import { request } from "express";

import { uploadImgCuarto } from "../helpers/upload-files.js";
import { cuartoModel } from "../models/cuarto.js";


export const formPost = async(req=request, res) => {
    
    const {
        email,
        avenida,
        distrito,
        precio,
        roomLoc,
        tamroom,
        numbanio,
        descripcion,
        numtelefono,
        numdormitorio,
        usuario
    } = req.body;

    const allfiles = req.files;
    const filesKeys = Object.keys(allfiles);
    const listUrlImages = [];

    try {
        
        for (const element of filesKeys) {
            const imgProps = await uploadImgCuarto(allfiles[element].data);
            listUrlImages.push(imgProps.urlImage);
        }
       
        const dataCuarto = {
            email,
            avenida,
            distrito,
            precio: parseInt(precio),
            roomLoc,
            tamroom: parseInt(tamroom),
            numbanio: parseInt(numbanio),
            descripcion,
            numtelefono,
            numdormitorio: parseInt(numdormitorio),
            roomUrl: listUrlImages,
            roomLoc,
            usuario
    
        }
        const cuarto= new cuartoModel(dataCuarto);
        await cuarto.save();
    
        res.status(200).json({
            ok: true,
            msg: "correcto"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "ocurrió un error"
        })
    }

}

export const formGet = async(req,res) => {
    try {
        const cuarto= await cuartoModel.find().exec();
        res.status(200).json({
            ok: true,
            msg: cuarto
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false
        })

    }
}

export const formGetPosts = async(req,res) => {
    const { id } = req.query;
    try {
        const cuarto= await cuartoModel.find( { usuario: id } ).exec();
        res.status(200).json({
            ok: true,
            msg: cuarto
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false
        })

    }
}
export const formDeletePosts = async(req,res) => {
    const { id } = req.query;
    try {
        const cuarto= await cuartoModel.deleteOne( { _id: id } ).exec();
        res.status(200).json({
            ok: true,
            msg: "se borró correctamente"
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg:"error"
        })

    }
}


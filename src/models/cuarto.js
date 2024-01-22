import mongoose from "mongoose";
const { Schema, model } = mongoose;
const cuartoSchema = new Schema({
    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    avenida: {
        type: String,
        required: true
    },
    distrito: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    tamroom: {
        type: Number,
        required: true
    },
    numbanio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    numtelefono: {
        type: String,
        required: true
    },
    numdormitorio: {
        type: Number,
        required: true
    },
    roomLoc: {
        type: String,
        required: true
    },
    roomUrl: {
        type: Array,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    }
})
cuartoSchema.methods.toJSON = function() {
    const { __v, _id, ...cuarto } = this.toObject();
    cuarto.uid = _id;
    return cuarto;
}
const cuartoModel = model('cuarto', cuartoSchema); 

export { cuartoModel };
import jwt from 'jsonwebtoken';
export const generarJWT = (uid, exptoken) => {
    return new Promise((resolve, reject) => {
        const a = process.env.PRIVATE_KEY;
        console.log({a});
        jwt.sign({ uid:uid }, process.env.PRIVATE_KEY, { expiresIn: exptoken }, (err,token) => {
            if(err){
                console.log(err);
                reject("No se pudo generar el Token");
            }
            else{
                resolve(token);
            }

    })
    });
}
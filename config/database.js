const mongoose = require("mongoose");

const connectDB = () =>{
    mongoose.connect(process.env.CONNECTION_STRING,{
        dbName: process.env.DB_NAME
    }).then(
        ()=>{
            console.log("Conexión exitosa con la Base de Datos");
        }
    ).catch(
        (error)=>{
            console.log("Error al conectar con la base de datos");
            console.log(error);
        }
    )
}

module.exports = connectDB;
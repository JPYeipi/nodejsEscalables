class Validations {

    static username(username){
        if(typeof username !== "string") throw new Error("El nombre del usuario debe ser una cadena");
        if(username.length < 5) throw new Error("El nombre de usuario debe tener mínimo 5 caracteres");
    }

    static password(password){
        if(typeof password !== "string") throw new Error("La contraseña debe ser una cadena");
        if(password.length < 8) throw new Error("La contraseña debe tener mínimo 8 caracteres");     
    }
}


module.exports = {Validations};
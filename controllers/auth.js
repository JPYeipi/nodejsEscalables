const { response, request} = require("express");
const {UserRepository} = require("../repositories/user");
const { Validations } = require("../helpers/validations");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/jwt");

const login = async (req = request, res = response) => {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({
            msg: "Datos invalidos"
        })
    }

    const user = await UserRepository.getOne({ username: username});
    if(!user){
        return res.status(401).json({
            msg: "Usuario y/o contraseña invalidos"
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.status(401).json({
            msg: "Usuario y/o contraseña invalidos"
        });
    }

    try{
        const { password: _, ...simpleUser } = user.toObject();
        const token = await generateJWT(username);
        res.status(200).json({
            msg: "Login ok",
            token: token,
            user: simpleUser
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Internal error"
        })
    }

    // res.status(200).json({
    //     msg: "Login ok"
    // });
}

const register = async (req = request, res = response) => {
    const { username, password } = req.body;
    const saltrounds = process.env.SALT_ROUNDS || 10;

    try{
        Validations.username(username);
        Validations.password(password);
    }catch(error){
        return res.status(400).json({
            msg: error.message
        })
    }

    try{
        const user = await UserRepository.getOne({ username: username });
        if(user){
            return res.status(400).json({
                msg: "Username ya existente"
            })
        }

        const hashedPassword = await bcrypt.hash(password, Number(saltrounds)); 
        const newUser = await UserRepository.create({
            username: username,
            password: hashedPassword, //Falta encriptar
            role: "user" 
        })

        // const simpleUser = {
        //     username: newUser.username,
        //     role: newUser.role,
        //     id: newUser._id
        // }

        const { password: _, ...simpleUser } = newUser.toObject();

        res.status(200).json({
            msg: "Usuario creado",
            user: simpleUser
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Internal error"
        })
    }
}

module.exports = {
    login,
    register
}

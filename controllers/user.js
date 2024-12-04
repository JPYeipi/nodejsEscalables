const { response, request } = require("express")
const {UserRepository} = require("../repositories/user");
const User=require('../models/user');

const addToWishlist = async (req = request, res = response) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const updatedUser = await UserRepository.addToArray(userId, "wishlist", productId);
    res.status(200).json({ msg: "Producto agregado a la wishlist", wishlist: updatedUser.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al agregar al wishlist" });
  }
};

// // Eliminar de Wishlist
// const removeFromWishlist = async (req, res) => {
//   const { productId } = req.params;
//   const userId = req.userActive._id;

//   try {
//       const user = await UserRepository.getOne({ _id: userId });
//       user.wishlist = user.wishlist.filter(item => item.toString() !== productId);

//       await user.save();
//       res.json({ msg: "Producto eliminado del wishlist", wishlist: user.wishlist });
//   } catch (error) {
//       res.status(500).json({ msg: "Error al eliminar del wishlist", error });
//   }
// };




const getAllUsers = async (req = request, res = response) => {
    try{
      const result = await UserRepository.getAll({});
      res.status(200).json(result);
    }catch(error){
      console.log(error);
      res.status(500).json({
        msg: "Error al obtener los datos"
      });
    }
}

const createNewUsers = async (req = request, res = response) => {
    const {username, password, role} = req.body;
    const userData = {username, password, role};
  
    if( !username || !password || !role ){
      return res.status(400).json({
        msg: "Información incompleta"
      })
    }
  
    try{
      const savedUser = await UserRepository.create(userData); //Crear en la bd
      res.status(201).json(
        savedProduct
      )
    }catch(error){
      console.log(error);
      res.status(500).json({
        msg: "Error al agregar el nuevo usuario"
      })
    }
}

const addToCart = async (req = request, res = response) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const updatedUser = await UserRepository.addToArray(userId, "carrito", productId);
    res.status(200).json({ msg: "Producto agregado al carrito", carrito: updatedUser.carrito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al agregar al carrito" });
  }
};

// Eliminar del carrito
const removeFromCart = async (req = request, res = response) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const updatedUser = await UserRepository.removeFromArray(userId, "carrito", productId);
    res.status(200).json({ msg: "Producto eliminado del carrito", carrito: updatedUser.carrito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar del carrito" });
  }
};

const getCartItems = async (req = request, res = response) => {
  const { userId } = req.params;
  try {
    const user = await UserRepository.getOne({ _id: userId });
    res.json({ carrito: user.carrito });
    return user.carrito;
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los productos del carrito" });
  }
};

module.exports = {
    getAllUsers,
    createNewUsers,
    getCartItems,
    addToCart,
    removeFromCart,
    addToWishlist,
    //removeFromWishlist
}
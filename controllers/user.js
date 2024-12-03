const { response, request } = require("express")
const {UserRepository} = require("../repositories/user");
const User=require('../models/user');

// const addToWishlist = async (req, res) => {
//   const { productId } = req.params;
//   const userId = req.userActive._id;

//   try {
//       const product = await ProductsRepository.getById(productId);
//       if (!product) {
//           return res.status(404).json({ msg: "Producto no encontrado" });
//       }

//       const user = await UserRepository.getOne({ _id: userId });
//       if (user.wishlist.includes(productId)) {
//           return res.status(400).json({ msg: "Producto ya en el wishlist" });
//       }

//       user.wishlist.push(productId);
//       await user.save();

//       res.json({ msg: "Producto agregado al wishlist", wishlist: user.wishlist });
//   } catch (error) {
//       res.status(500).json({ msg: "Error al agregar al wishlist", error });
//   }
// };

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

// // Agregar al Carrito
// const addToCart = async (req, res) => {
//   const { productId } = req.params;
//   const userId = req.userActive._id;

//   try {
//       const product = await ProductsRepository.getById(productId);
//       if (!product) {
//           return res.status(404).json({ msg: "Producto no encontrado" });
//       }

//       const user = await UserRepository.getOne({ _id: userId });
//       user.carrito.push(productId);

//       await user.save();
//       res.json({ msg: "Producto agregado al carrito", carrito: user.carrito });
//   } catch (error) {
//       res.status(500).json({ msg: "Error al agregar al carrito", error });
//   }
// };

// // Eliminar del Carrito
// const removeFromCart = async (req, res) => {
//   const { productId } = req.params;
//   const userId = req.userActive._id;

//   try {
//       const user = await UserRepository.getOne({ _id: userId });
//       user.carrito = user.carrito.filter(item => item.toString() !== productId);

//       await user.save();
//       res.json({ msg: "Producto eliminado del carrito", carrito: user.carrito });
//   } catch (error) {
//       res.status(500).json({ msg: "Error al eliminar del carrito", error });
//   }
// };

// // Obtener productos del carrito
// const getCartItems = async (req, res) => {
//   const userId = req.userActive._id;

//   try {
//       const user = await UserRepository.getOne({ _id: userId }).populate('carrito');
//       res.json({ carrito: user.carrito });
//   } catch (error) {
//       res.status(500).json({ msg: "Error al obtener los productos del carrito", error });
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

const addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.carrito.push(productId);
    await user.save();

    res.status(200).json({ message: 'Producto agregado al carrito', carrito: user.carrito });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
    getAllUsers,
    createNewUsers,
    // getCartItems,
    addToCart
    // addToWishlist,
    // removeFromCart,
    // removeFromWishlist
}
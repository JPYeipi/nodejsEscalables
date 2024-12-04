const { response, request } = require("express");

const Product = require("../models/product");
const { ProductsRepository } = require("../repositories/product");

const products = [  ];

const getAllProducts = async (req = request, res = response) => {
  const { searchTerm } = req.query;
    try{
      const result = await ProductsRepository.getAll({title: RegExp(searchTerm)});
      res.status(200).json(result);
    }catch(error){
      console.log(error);
      res.status(500).json({
        msg: "Error al obtener los datos"
      });
    }
}

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;
  try{
    const result = await ProductsRepository.getById(id);
    if(result == null){
      res.status(404).json({
        msg: "No se encontró el producto"
      });
      return;
    }
    res.status(200).json(result);
  }catch(error){
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener los datos"
    })
  }
}

const createNewProducts = async (req = request, res = response) => {

  const {title, price, description, category, type, image, marca, rating} = req.body;
  const productData = {title, price, description, category, type, image, marca, rating};

  if( !title || !price || !description || !category || !type || !image || !marca || !rating){
    return res.status(400).json({
      msg: "Información incompleta"
    })
  }

  try{
    const savedProduct = await ProductsRepository.create(productData); //Crear en la bd
    res.status(201).json(
      savedProduct
    )
  }catch(error){
    console.log(error);
    res.status(500).json({
      msg: "Error al agregar el nuevo elemento"
    })
  }
}

const deleteTvShow = async (req = request, res = response) =>{
  const { id } = req.params;
  try{
    const deletedProduct = await ProductsRepository.deleteById(id);
    res.status(200).json({
      msg: `Producto con id: ${id} borrado`,
      deletedProduct
    });
  }catch(error){
    console.log(error);
    res.status(500).json({
      msg: "Error al borrar los datos"
    })
  }
}

const updateTvShow = async (req = request, res = response) =>{
  const { id } = req.params;

  const {title, price, description, category, type, image, marca, rating} = req.body;
  const productData = {title, price, description, category, type, image, marca, rating};

  if( !title || !price || !description || !category || !type || !image || !marca || !rating){
    return res.status(400).json({
      msg: "Información incompleta"
    })
  }

  try{
    const updatedProduct = await ProductsRepository.updateById(id, productData);
    res.status(200).json({
      updatedProduct,
      productData
    });
  }catch(error){
    console.log(error);
    res.status(500).json({
      msg: "Error al editar los datos"
    })
  }
}




module.exports = {
    getAllProducts,
    createNewProducts,
    getProductById,
    deleteTvShow,
    updateTvShow
}

const Product = require("../models/product");
const ObjectId = require("mongoose").Types.ObjectId;

class ProductsRepository{
    static async getAll(query){
        return await Product.find(query);
    }

    static async getById(id){
        // if(!ObjectId.isValid(id)){
        //     return null;
        // }
        return await Product.findOne( {_id: id});
    }

    static async create(productData){
        const product = new Product(productData);
        return await product.save();
    }

    static async deleteById(id){
        if(!ObjectId.isValid(id)){
            return null;
        }
        return await Product.deleteOne({ _id: id});
    }

    static async updateById(id, updateData){
        // if(!ObjectId.isValid(id)){
        //     return null;
        // }
        return await Product.updateOne({_id: id}, updateData);
    }
}

module.exports = {ProductsRepository};
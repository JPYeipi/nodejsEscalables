const User = require("../models/user");

class UserRepository{

    static async getAll(query){
        return await User.find(query);
    }

    static async getOne(query){
        return await User.findOne(query);
    }

    static async create(userData){
        const user = new User(userData);
        return await user.save();
    }

    static async addToArray(userId, field, item) {
        // Usa $push para agregar elementos
        return await User.findByIdAndUpdate(
          userId,
          { $push: { [field]: item } },
          { new: true } // Retorna el documento actualizado
        );
      }
    
      static async removeFromArray(userId, field, item) {
        // Usa $pull para eliminar elementos
        return await User.findByIdAndUpdate(
          userId,
          { $pull: { [field]: item } },
          { new: true }
        );
      }
}

module.exports = {UserRepository};
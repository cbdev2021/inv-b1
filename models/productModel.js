import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    correlative: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    idUsuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Hace referencia al modelo de usuario
      required: true,
    },
    // subtype: {
    //   type: String,
    //   required: true,
    // },
    // description: {
    //   type: String,
    //   required: true,
    // },
   
  },
  {
    timestamps: true,
  }
);

// Método para eliminar registros por ID
productSchema.statics.removeById = async function (productId) {
  return this.findByIdAndRemove(productId);
};

const Product = mongoose.model('Product', productSchema);

export default Product;

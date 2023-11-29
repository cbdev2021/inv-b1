import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    idUsuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Hace referencia al modelo de usuario
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
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

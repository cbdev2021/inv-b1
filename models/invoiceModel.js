import mongoose from 'mongoose';

const invoiceSchema = mongoose.Schema(
  {
    invoiceID: {
      type: Number,
      required: true,
    },
    fechaEmision: {
      type: Date,
      required: true,
     },
    idUsuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Hace referencia al modelo de usuario
      required: true,
    },
    // clienteProveedor: {
    //   nombre: {
    //     type: String,
    //     required: true,
    //   },
    //   direccion: {
    //     type: String,
    //     required: true,
    //   },
    // },
    // productosServicios: [
    //   {
    //     nombre: {
    //       type: String,
    //       required: true,
    //     },
    //     cantidad: {
    //       type: Number,
    //       required: true,
    //     },
    //     precioUnitario: {
    //       type: Number,
    //       required: true,
    //     },
    //   },
    // ],
    // subtotal: {
    //   type: Number,
    //   required: true,
    // },
    // impuestos: {
    //   type: Number,
    //   required: true,
    // },
    // total: {
    //   type: Number,
    //   required: true,
    // },
    // metodoPago: {
    //   type: String,
    //   required: true,
    // },
    // tipo: {
    //   type: String,
    //   enum: ['Compra', 'Venta'],
    //   required: true,
    // },
    // // Campos específicos de Compra
    // proveedor: {
    //   nombre: {
    //     type: String,
    //     required: function () {
    //       return this.tipo === 'Compra';
    //     },
    //   },
    // },
    // // Campos específicos de Venta
    // vendedor: {
    //   nombre: {
    //     type: String,
    //     required: function () {
    //       return this.tipo === 'Venta';
    //     },
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;

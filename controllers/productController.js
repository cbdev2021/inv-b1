import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Sequence from '../models/sequenceModel.js';

// @desc    Agregar un registro
// @route   POST /api/users/add-type-values
// @access  Private

// const addProduct = asyncHandler(async (req, res) => {
//   const { product} = req.body;
//   const userId = req.user._id;
//   try {
//     const newProduct = await Product.create({
//         product
//     });

//     if (newProduct) {
//       res.status(201).json({ message: 'Product agregado con éxito', data: newProduct });
//     } else {
//       res.status(400);
//       throw new Error('No se pudo agregar Product');
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error al agregar Product', error: error.message });
//   }
// });

// const addProduct = asyncHandler(async (req, res) => {
//   const { product } = req.body;
//   const userId = req.user._id;

//   try {
//     // Encuentra y actualiza el documento de la secuencia, incrementando el valor en 1
//     const updatedSequence = await Sequence.findOneAndUpdate(
//       { _id: "sequenceProductId" },
//       { $inc: { sequence_value: 1 } },
//       { new: true, upsert: true }
//     );

//     // El valor actualizado de la secuencia es el nuevo correlativo
//     const newCorrelative = updatedSequence.sequence_value;

//     // Crear el nuevo producto con el correlativo actualizado
//     const newProduct = await Product.create({
//       product,
//       correlative: newCorrelative,
//     });

//     if (newProduct) {
//       res.status(201).json({ message: 'Product agregado con éxito', data: newProduct });
//     } else {
//       res.status(400);
//       throw new Error('No se pudo agregar Product');
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error al agregar Product', error: error.message });
//   }
// });

const addProduct = asyncHandler(async (req, res) => {

  //const { description, idUsuario } = req.body;
  const { name, description, price, amount } = req.body;

  const userId = req.user._id;

  try {
    // Encuentra y actualiza el documento de la secuencia, incrementando el valor en 1
    const updatedSequence = await Sequence.findOneAndUpdate(
      { _id: "sequenceProductId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // El valor actualizado de la secuencia es el nuevo correlativo
    const newCorrelative = updatedSequence.sequence_value;

    // Crear el nuevo producto con el correlativo actualizado
    const newProduct = await Product.create({
      idUsuario: userId,
      productId: newCorrelative,
      name: name,
      description: description,
      price: price,
      amount: amount
      //idUsuario: idUsuario
    });

    if (newProduct) {
      res.status(201).json({ message: 'Product agregado con éxito', data: newProduct });
    } else {
      res.status(400);
      throw new Error('No se pudo agregar Product');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar Product', error: error.message });
  }
});








// @desc    Actualizar un registro por ID
// @route   PUT /api/users/update-type-values/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  //const { typevalue, subtype, description } = req.body;
  const { name, description, price, amount } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      if (product.idUsuario.toString() === req.user._id.toString()) {
        product.name = name;
        product.description = description;
        product.price = price;
        product.amount = amount;

        const updatedProduct = await product.save();
        res.json({ message: 'Product actualizado con éxito', data: updatedProduct });
      } else {
        res.status(403);
        throw new Error('No tienes permiso para actualizar este Product');
      }
    } else {
      res.status(404);
      throw new Error('Product no encontrado');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar Product', error: error.message });
  }
});

// @desc    Eliminar un registro por ID
// @route   DELETE /api/users/delete-type-values/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const removedProduct = await Product.removeById(productId);

  if (removedProduct) {
    res.json({ message: 'Product eliminado con éxito' });
  } else {
    res.status(404);
    throw new Error('Product no encontrado');
  }
});

// @desc    Obtener un registro por ID
// @route   GET /api/users/get-type-values/:id
// @access  Private
const getProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      if (product.idUsuario.toString() === req.user._id.toString()) {
        res.json(product);
      } else {
        res.status(403);
        throw new Error('No tienes permiso para acceder a este Product');
      }
    } else {
      res.status(404);
      throw new Error('Product no encontrado');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el Product', error: error.message });
  }
});

// @desc    Obtener registros por ID de usuario
// @route   GET /api/users/get-type-values/:idUsuario
// @access  Private
const getProductByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.idUsuario;

  try {
    const product = await Product.find({ idUsuario: userId });

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('No se encontraron Product para este usuario');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los Product', error: error.message });
  }
});

// const updateProductAmount = asyncHandler(async (req, res) => {
//   const { typevalue, amount } = req.body;

//   try {
//     const product = await Product.findById(req.params.productId);

//     if (product) {
//       if (product.idUsuario.toString() === req.user._id.toString()) {
//         // Verificar si typevalue es "Sales" o "Purchase"
//         if (typevalue === "Sales") {
//           // Restar amount al amount existente
//           product.amount -= amount;
//         } else if (typevalue === "Purchase") {
//           // Sumar amount al amount existente
//           product.amount += amount;
//         } else {
//           // Manejar otro caso si es necesario
//           res.status(400);
//           throw new Error('typevalue no es válido');
//         }

//         const updatedProduct = await product.save();
//         res.json({ message: 'Producto actualizado con éxito', data: updatedProduct });
//       } else {
//         res.status(403);
//         throw new Error('No tienes permiso para actualizar este producto');
//       }
//     } else {
//       res.status(404);
//       throw new Error('Producto no encontrado');
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
//   }
// });

// const updateProductAmount = asyncHandler(async (req, res) => {
//   const { typevalue, amount, productId } = req.body;

//   try {
//     // const product = await Product.findById(req.params.productId);
//     const product = await Product.findById(productId);

//     if (product) {
//       if (product.idUsuario.toString() === req.user._id.toString()) {
//         // Verificar si typevalue es "Sales" o "Purchase"
//         if (typevalue === "Sales") {
//           // Restar amount al amount existente
//           product.amount -= amount;
//         } else if (typevalue === "Purchase") {
//           // Sumar amount al amount existente
//           product.amount += amount;
//         } else {
//           // Manejar otro caso si es necesario
//           res.status(400);
//           throw new Error('typevalue no es válido');
//         }

//         const updatedProduct = await product.save();
//         res.json({ message: 'Producto actualizado con éxito', data: updatedProduct });
//       } else {
//         res.status(403);
//         throw new Error('No tienes permiso para actualizar este producto');
//       }
//     } else {
//       res.status(404);
//       throw new Error('Producto no encontrado');
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
//   }
// });

// const updateProductAmount = asyncHandler(async (req, res) => {
//   const { typevalue, amount, productId } = req.body;

//   try {
//     // const product = await Product.findById(mongoose.Types.ObjectId(productId));
//     const product = await Product.findOne({ productId: productId });


//     if (product) {
//       if (product.idUsuario.toString() === req.user._id.toString()) {
//         // Verificar si typevalue es "Sales" o "Purchase"
//         if (typevalue === "Sales") {
//           // Restar amount al amount existente
//           product.amount -= amount;
//         } else if (typevalue === "Purchase") {
//           // Sumar amount al amount existente
//           product.amount += amount;
//         } else {
//           // Manejar otro caso si es necesario
//           res.status(400);
//           throw new Error('typevalue no es válido');
//         }

//         const updatedProduct = await product.save();
//         res.json({ message: 'Producto actualizado con éxito', data: updatedProduct });
//       } else {
//         res.status(403);
//         throw new Error('No tienes permiso para actualizar este producto');
//       }
//     } else {
//       res.status(404);
//       throw new Error('Producto no encontrado');
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
//   }
// }); 

const updateProductAmount = asyncHandler(async (req, res) => {
  // const { typevalue, amount, productId } = req.body; //1
  const { typevalue, amount } = req.body;

  try {
    // const product = await Product.findOne({ productId: productId }); //1
    const product = await Product.findOne({ productId: req.params.productId });

    //   if (product) {
    //     if (product.idUsuario.toString() === req.user._id.toString()) {
    //       // Verificar si typevalue es "Sales" o "Purchase"
    //       if (typevalue === "Sales" || typevalue === "Purchase") {
    //         // Convertir amount a número
    //         const numericAmount = parseFloat(amount);

    //         // Verificar si es un número válido
    //         if (!isNaN(numericAmount)) {
    //           // Operación según el tipo de valor
    //           product.amount += (typevalue === "Sales" ? -numericAmount : numericAmount);
    //         } else {
    //           res.status(400);
    //           throw new Error('amount no es un número válido');
    //         }
    //       } else {
    //         // Manejar otro caso si es necesario
    //         res.status(400);
    //         throw new Error('typevalue no es válido');
    //       }

    //       const updatedProduct = await product.save();
    //       res.json({ message: 'Producto actualizado con éxito', data: updatedProduct });
    //     } else {
    //       res.status(403);
    //       throw new Error('No tienes permiso para actualizar este producto');
    //     }
    //   } else {
    //     res.status(404);
    //     throw new Error('Producto no encontrado');
    //   }
    // } catch (error) {
    //   res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    // }


    if (product) {
      if (product.idUsuario.toString() === req.user._id.toString()) {
        // Verificar si typevalue es "Sales", "Purchase" o "SaveAmount"
        if (typevalue === "Sales" || typevalue === "Purchase" || typevalue === "SaveAmount") {
          // Convertir amount a número
          const numericAmount = parseFloat(amount);

          // Verificar si es un número válido
          if (!isNaN(numericAmount)) {
            // Operación según el tipo de valor
            if (typevalue === "Sales" || typevalue === "Purchase") {
              product.amount += (typevalue === "Sales" ? -numericAmount : numericAmount);
            } else if (typevalue === "SaveAmount") {
              // Actualizar el valor de "amount" directamente
              product.amount = numericAmount;
            }
          } else {
            res.status(400);
            throw new Error('amount no es un número válido');
          }

          const updatedProduct = await product.save();
          res.json({ message: 'Producto actualizado con éxito', data: updatedProduct });
        } else {
          // Manejar otro caso si es necesario
          res.status(400);
          throw new Error('typevalue no es válido');
        }
      } else {
        res.status(403);
        throw new Error('No tienes permiso para actualizar este producto');
      }
    } else {
      res.status(404);
      throw new Error('Producto no encontrado');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }

});

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductByUserId,
  updateProductAmount
};
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
  
  const { description, idUsuario } = req.body;
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
      productId: newCorrelative,
      description,
      idUsuario: userId
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
  const {description} = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      if (product.idUsuario.toString() === req.user._id.toString()) {
        // product.typevalue = typevalue;
        // product.subtype = subtype;
        // product.description = description;
        product.description = description;

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

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductByUserId,
};

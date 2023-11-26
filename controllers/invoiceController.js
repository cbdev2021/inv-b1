import asyncHandler from 'express-async-handler';
import Invoice from '../models/invoiceModel.js';

// @desc    Agregar una factura
// @route   POST /api/invoices/add-invoice
// @access  Public
const addInvoice = asyncHandler(async (req, res) => {
    const {
        numeroFactura,
        fechaEmision,
        idUsuario,
        clienteProveedor,
        productosServicios,
        subtotal,
        impuestos,
        total,
        metodoPago,
        tipo,
        proveedor,
        vendedor,
    } = req.body;

    try {
        const newInvoice = await Invoice.create({
            numeroFactura,
            fechaEmision,
            idUsuario,
            clienteProveedor,
            productosServicios,
            subtotal,
            impuestos,
            total,
            metodoPago,
            tipo,
            proveedor,
            vendedor,
        });

        if (newInvoice) {
            res.status(201).json({ message: 'Factura agregada con éxito', data: newInvoice });
        } else {
            res.status(400);
            throw new Error('No se pudo agregar la factura');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar la factura', error: error.message });
    }
});

// @desc    Actualizar una factura por ID
// @route   PUT /api/invoices/update-invoice/:id
// @access  Public
const updateInvoice = asyncHandler(async (req, res) => {
    const { numeroFactura, fechaEmision, clienteProveedor, productosServicios, subtotal, impuestos, total, metodoPago, tipo, proveedor, vendedor } = req.body;

    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            req.params.id,
            {
                numeroFactura,
                fechaEmision,
                clienteProveedor,
                productosServicios,
                subtotal,
                impuestos,
                total,
                metodoPago,
                tipo,
                proveedor,
                vendedor,
            },
            { new: true, runValidators: true }
        );

        if (updatedInvoice) {
            res.json({ message: 'Factura actualizada con éxito', data: updatedInvoice });
        } else {
            res.status(404);
            throw new Error('Factura no encontrada');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la factura', error: error.message });
    }
});

// @desc    Eliminar una factura por ID
// @route   DELETE /api/invoices/delete-invoice/:id
// @access  Public
const deleteInvoice = asyncHandler(async (req, res) => {
    const invoiceId = req.params.id;

    const removedInvoice = await Invoice.findByIdAndDelete(invoiceId);

    if (removedInvoice) {
        res.json({ message: 'Factura eliminada con éxito' });
    } else {
        res.status(404);
        throw new Error('Factura no encontrada');
    }
});

// @desc    Obtener una factura por ID
// @route   GET /api/invoices/get-invoice/:id
// @access  Public
const getInvoice = asyncHandler(async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);

        if (invoice) {
            res.json(invoice);
        } else {
            res.status(404);
            throw new Error('Factura no encontrada');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la factura', error: error.message });
    }
});

// @desc    Obtener facturas por ID de usuario
// @route   GET /api/invoices/get-invoices-by-user/:idUsuario
// @access  Public
const getInvoicesByUserId = asyncHandler(async (req, res) => {
    const userId = req.params.idUsuario;

    try {
        //const invoices = await Invoice.find({ 'clienteProveedor.idUsuario': userId });
        const invoices = await Invoice.find({ 'idUsuario': userId });

        if (invoices) {
            res.json(invoices);
        } else {
            res.status(404);
            throw new Error('No se encontraron facturas para este usuario');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las facturas', error: error.message });
    }
});

export {
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoice,
    getInvoicesByUserId
};

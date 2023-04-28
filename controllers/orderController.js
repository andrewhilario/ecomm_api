import Order from '../schema/orderSchema.js';

// CREATE ORDER
export const createOrder = async (req, res, next) => {
  try {
    const orderItems = req.body.orderItems.map((item) => {
      return {
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item.product
      };
    });

    const shippingAddress = {
      address: req.body.shippingAddress.address
    };

    const order = new Order({
      user: req.body.user,
      orderItems,

      shippingAddress,
      paymentMethod: req.body.paymentMethod,
      paymentResult: {
        id: req.body.paymentResult.id,
        status: req.body.paymentResult.status,
        email_address: req.body.paymentResult.email_address
      }
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    return next(error);
  }
};

// GET ORDER BY ID
export const getOrderById = async (req, res, next) => {
  try {
    const getOrderById = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    res.status(200).json(getOrderById);
  } catch (error) {
    return next(error);
  }
};

// GET ALL ORDERS
export const getAllOrders = async (req, res, next) => {
  try {
    const getAllOrders = await Order.find().populate('user', 'name email');

    res.status(200).json({
      data: getAllOrders
    });
  } catch (error) {
    return next(error);
  }
};

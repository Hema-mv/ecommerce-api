import Order from '../models/order.mjs';
import OrderDetail from '../models/orderDetail.mjs';


export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const newOrder = new Order({
      _id: new mongoose.Types.ObjectId(),
      userId,
      items,
      totalAmount,
      __v: 0
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, items, totalAmount } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { userId, items, totalAmount },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
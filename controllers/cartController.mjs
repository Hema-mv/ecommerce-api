import mongoose from 'mongoose';
import Cart from '../models/cart.mjs';


// Create a new cart

export const createCart = async (req, res) => {
    console.log(`HTTP Method: ${req.method}, URL: ${req.url}`);
    try {
      const { userId, items, totalAmount } = req.body;
  
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      const objectId = new mongoose.Types.ObjectId(userId);
      let cart = await Cart.findOne({ userId: objectId });
 
      if (cart) 
        {
           items.forEach(newItem => {
          const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === newItem.productId);
          if (existingItemIndex > -1) {
          
            cart.items[existingItemIndex].quantity += newItem.quantity;
          } else {
              cart.items.push(newItem);
          }
        });
        cart.totalAmount += totalAmount;
        cart.updatedAt = Date.now();
      } else {
        // Create a new cart for the user
        cart = new Cart({
          userId: objectId,
          items,
          totalAmount,
          status: 'pending',
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
      }
  
      await cart.save();
      res.status(201).json(cart);
    } catch (error) {
      console.error('Error creating or updating cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// Get all cart items by user ID and product ID
export const getCartItemsByUserIdAndProductId = async (req, res) => {
    console.log(`HTTP Method: ${req.method}, URL: ${req.url}`);
    try {
      const { userId, productId } = req.params;
      const cart = await Cart.findOne({
        userId: mongoose.Types.ObjectId(userId),
        'items.productId': mongoose.Types.ObjectId(productId)
      }).populate('items.productId');
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Filter items to only include those with the specified productId
      const items = cart.items.filter(item => item.productId._id.toString() === productId);
  
      res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching cart items by user ID and product ID:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// export const createCartnew = async (req, res) => {
//     try {
//       const { userId, items, totalAmount } = req.body;

//       let cart = await Cart.findOne({ userId });
// 		if (cart) {
// 			// Check if the product already exists in the cart
// 			const itemIndex = cart.items.findIndex(
// 				(item) => item.productId.toString() === items.
// 			);
// 			if (itemIndex > -1) {
// 				// Update quantity if the product exists
// 				cart.items[itemIndex].quantity += quantity;
// 			} else {
// 				// Add a new product to the cart if it doesn't exist
// 				cart.items.push({ productId, quantity });
// 			}
// 		} else {
// 			// Create a new cart for the user if it doesn't exist
// 			cart = new Cart({ userId, items: [{ productId, quantity }] });
// 		}



//       const newCart = new Cart({userId,items,totalAmount,status: 'pending'    });
//       await newCart.save();
//       res.status(201).json(newCart);
//     } catch (error) {
//       console.error('Error creating cart:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };
export const getAllCarts = async (req, res) => {
    console.log(`HTTP Method: ${req.method}, URL: ${req.url}`);
    const { userId } = req.params;

    if (!userId || userId.trim() === "") {
        return res.status(400).json({ message: "Invalid or missing userId" });
      }
  try {
  
    let cart = await Cart.findOne({ userId }).populate(
        "items.productId"
      );
      if (!cart) {
        cart = new Cart({ userId, items: [] });
        await cart.save();
      }
   // const carts = await Cart.find().populate('items.productId');
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching all carts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Get a cart by ID
export const getCartByUserId = async (req, res) => {
    try {
   
        const { userId } = req.params;



// Validate and convert userId to ObjectId
if (!mongoose.isValidObjectId(userId)) {
  return res.status(400).json({ message: 'Invalid user ID' });
}
 
      //const objectId =  new mongoose.Types.ObjectId(userId);
      const cart = await Cart.findOne({ userId }).populate('items.productId');
      //const cart = await Cart.findOne(userId).populate('items.productId');
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Update a cart by ID
export const updateCartById = async (req, res) => {
    console.log(`HTTP Method: ${req.method}, URL: ${req.url}`);
  try {
    const { id } = req.params;
    const { userId, items, totalAmount, status } = req.body;
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { userId, items, totalAmount, status, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const deleteCartById = async (req, res) => {
console.log(`HTTP Method: ${req.method}, URL: ${req.url}`);
  try {
    const { id } = req.params;
    const deletedCart = await Cart.findByIdAndDelete(id);
    if (!deletedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const deleteCartItem = async (req, res) => {
    console.log(`HTTP Method: ${req.method}, URL: ${req.url}`);
    try {
        console.log('req.params', req.params);
      const { cartId, itemId } = req.params;
  
      // Validate and convert cartId and itemId to ObjectId
      if (!mongoose.isValidObjectId(cartId) || !mongoose.isValidObjectId(itemId)) {
        return res.status(400).json({ message: 'Invalid cart ID or item ID' });
      }
  
      const cartObjectId = new mongoose.Types.ObjectId(cartId);
      const itemObjectId = new mongoose.Types.ObjectId(itemId);
  
      // Find the cart by cartId
      const cart = await Cart.findById(cartObjectId);
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Find the item in the cart and remove it
      const itemIndex = cart.items.findIndex(item => item._id.equals(itemObjectId));
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      cart.items.splice(itemIndex, 1);
      await cart.save();
  
      res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
      console.error('Error deleting cart item:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
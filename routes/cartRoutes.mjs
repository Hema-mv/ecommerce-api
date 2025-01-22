import express from 'express';
import {createCart, getCartByUserId, updateCartById, deleteCartById,getAllCarts,deleteCartItem, updateCartStatus} from '../controllers/cartController.mjs';

const router = express.Router();

// Route to create a new cart
router.post('/', createCart);

// Route to get all carts
router.get('/', getAllCarts);

// Route to get a cart by product ID
router.get('/:userId', getCartByUserId);

// Route to get all cart items by user ID and product ID using query parameters
//router.get('/items', getCartItemsByUserIdAndProductId);

// Route to update a cart by ID
router.put('/:id', updateCartById);

// Route to delete a cart by ID
router.delete('/:id', deleteCartById);

// Route to delete an item from a cart by cart ID and item ID
router.delete('/:cartId/item/:itemId', deleteCartItem);

// Route to update the status of a cart by user ID
router.put('/:cartId/status', updateCartStatus);

export default router;
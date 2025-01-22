import express from 'express';
import {createCart, getCartByUserId, updateCartById, deleteCartById,getAllCarts,deleteCartItem} from '../controllers/cartController.mjs';

const router = express.Router();


router.post('/', createCart);
router.get('/', getAllCarts);
router.get('/:userId', getCartByUserId);

router.put('/:id', updateCartById);

router.delete('/:id', deleteCartById);
router.delete('/:cartId/item/:itemId', deleteCartItem);

export default router;
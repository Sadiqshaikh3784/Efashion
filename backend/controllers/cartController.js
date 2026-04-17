import Cart from "../models/Cart.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // ❌ ERROR CASE
    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing data" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity: 1 }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }

      await cart.save();
    }

    res.json(cart);

  } catch (error) {
    console.error("ADD CART ERROR:", error); // 👈 IMPORTANT
    res.status(500).json({ message: "Server Error", error });
  }
};

// Remove item from cart
export const removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);

    await cart.save();
    res.json({
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update item quantity in cart

export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;

    await cart.save();
    res.json({
      message: "Item quantity updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get cart by user ID
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate("items.productId");

    if (!cart) return res.json({ items: [] });

    // 💥 REMOVE NULL PRODUCTS
    cart.items = cart.items.filter(item => item.productId);

    await cart.save();

    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
import express from "express";
import Product from "../models/Product.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ GET /api/products - All products (Public)
router.get("/", async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };
    if (minPrice || maxPrice)
      query.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

// ✅ GET /api/products/:id - Single product (Public)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
});

// ✅ POST /api/products - Create (Admin)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, author, description, category, price, stock, image } = req.body;

    const newProduct = await Product.create({
      title,
      author,
      description,
      category,
      price,
      stock,
      image,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
});

// ✅ PUT /api/products/:id - Update (Admin)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updates = req.body;
    Object.assign(product, updates);
    const updated = await product.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
});

// ✅ DELETE /api/products/:id - Delete (Admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
});

export default router;

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { auth, adminOnly } = require("../middleware/auth");

// GET /api/products - Get all products with filters
router.get("/", async (req, res) => {
  try {
    const { family, minPrice, maxPrice, search } = req.query;
    
    let query = {};
    
    // Scent family filter
    if (family) {
      query.family = family;
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    // Search query filter (matches name, inspiredBy, family, or notes)
    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { name: searchRegex },
        { inspiredBy: searchRegex },
        { family: searchRegex },
        { "notes.top": searchRegex },
        { "notes.middle": searchRegex },
        { "notes.base": searchRegex }
      ];
    }
    
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id - Get product detail
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products - Create product (Admin only)
router.post("/", auth, adminOnly, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/products/:id - Update product (Admin only)
router.put("/:id", auth, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/products/:id - Delete product (Admin only)
router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

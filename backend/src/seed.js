const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const mockProducts = [
  {
    name: "Golden Hour",
    inspiredBy: "Tom Ford's Soleil Blanc",
    price: 29,
    size: "50ml",
    family: "Warm Amber Floral",
    notes: {
      top: ["Bergamot", "Cardamom", "Pink Pepper", "Pistachio"],
      middle: ["Ylang Ylang", "Egyptian Jasmine", "Tuberose"],
      base: ["Coconut", "Amber", "Vanilla", "Tonka Bean"]
    },
    stock: 120,
    rating: 4.8,
    reviewsCount: 142,
    description: "A sun-drenched, solar floral fragrance capturing the warmth of private islands. Creamy coconut meets amber and bright ylang-ylang.",
  },
  {
    name: "Noir Oud",
    inspiredBy: "Creed's Royal Oud",
    price: 34,
    size: "50ml",
    family: "Woody Oriental",
    notes: {
      top: ["Lemon", "Pink Berry", "Bergamot"],
      middle: ["Cedar", "Galbanum", "Angelica Root"],
      base: ["Regal Oud", "Sandalwood", "Tonkin Musk"]
    },
    stock: 85,
    rating: 4.9,
    reviewsCount: 98,
    description: "An opulent blend of wood, leather, and spice. Sophisticated, warm, and majestic with a smooth regal oud presence.",
  },
  {
    name: "Santal Breeze",
    inspiredBy: "Le Labo's Santal 33",
    price: 29,
    size: "50ml",
    family: "Woody Spicy",
    notes: {
      top: ["Violet Accord", "Cardamom"],
      middle: ["Iris", "Ambrox", "Papyrus"],
      base: ["Sandalwood", "Leather", "Cedarwood"]
    },
    stock: 210,
    rating: 4.7,
    reviewsCount: 215,
    description: "A defining woody signature scent representing freedom and open fires. Cardamom combined with rich cedar and Australian sandalwood.",
  },
  {
    name: "Citrus Surf",
    inspiredBy: "Louis Vuitton's Afternoon Swim",
    price: 29,
    size: "50ml",
    family: "Citrus Fresh",
    notes: {
      top: ["Sicilian Orange", "Bergamot"],
      middle: ["Mandarin", "Ginger"],
      base: ["Ambergris", "Musk"]
    },
    stock: 150,
    rating: 4.6,
    reviewsCount: 64,
    description: "A wave of energy and sea-salted orange juice. Bursting with sweet citrus extracts and fresh spicy ginger undertones.",
  },
  {
    name: "Velvet Rose",
    inspiredBy: "Parfums de Marly's Delina",
    price: 32,
    size: "50ml",
    family: "Floral Sweet",
    notes: {
      top: ["Rhubarb", "Lychee", "Bergamot"],
      middle: ["Turkish Rose", "Peony", "Petalia"],
      base: ["Cashmeran Wood", "Musk", "Vetiver", "Incense"]
    },
    stock: 95,
    rating: 4.8,
    reviewsCount: 112,
    description: "A charming, ultra-feminine floral bouquet. Turkish rose blended with lychee and cashmere wood for an enchanting trail.",
  },
  {
    name: "Lost Cherry",
    inspiredBy: "Tom Ford's Lost Cherry",
    price: 34,
    size: "50ml",
    family: "Amber Gourmand",
    notes: {
      top: ["Black Cherry", "Cherry Liqueur", "Bitter Almond"],
      middle: ["Griotte Syrup", "Turkish Rose", "Jasmine Sambac"],
      base: ["Roasted Tonka Bean", "Sandalwood", "Vetiver", "Cedarwood"]
    },
    stock: 75,
    rating: 4.7,
    reviewsCount: 184,
    description: "A full-bodied, luscious journey into the once-forbidden. Sweet black cherry meets warm almond and roasted tonka bean.",
  }
];

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/aurascent";

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB for seeding...");
    await Product.deleteMany({});
    console.log("Cleared existing products.");
    
    await Product.insertMany(mockProducts);
    console.log("Successfully seeded mock products!");
    
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });

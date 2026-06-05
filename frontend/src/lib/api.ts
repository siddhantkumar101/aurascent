export interface Product {
  id: string;
  name: string;
  inspiredBy: string;
  price: number;
  size: string;
  family: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  image: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  description: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
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
    image: "",
    stock: 120,
    rating: 4.8,
    reviewsCount: 142,
    description: "A sun-drenched, solar floral fragrance capturing the warmth of private islands. Creamy coconut meets amber and bright ylang-ylang.",
  },
  {
    id: "2",
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
    image: "",
    stock: 85,
    rating: 4.9,
    reviewsCount: 98,
    description: "An opulent blend of wood, leather, and spice. Sophisticated, warm, and majestic with a smooth regal oud presence.",
  },
  {
    id: "3",
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
    image: "",
    stock: 210,
    rating: 4.7,
    reviewsCount: 215,
    description: "A defining woody signature scent representing freedom and open fires. Cardamom combined with rich cedar and Australian sandalwood.",
  },
  {
    id: "4",
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
    image: "",
    stock: 150,
    rating: 4.6,
    reviewsCount: 64,
    description: "A wave of energy and sea-salted orange juice. Bursting with sweet citrus extracts and fresh spicy ginger undertones.",
  },
  {
    id: "5",
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
    image: "",
    stock: 95,
    rating: 4.8,
    reviewsCount: 112,
    description: "A charming, ultra-feminine floral bouquet. Turkish rose blended with lychee and cashmere wood for an enchanting trail.",
  },
  {
    id: "6",
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
    image: "",
    stock: 75,
    rating: 4.7,
    reviewsCount: 184,
    description: "A full-bodied, luscious journey into the once-forbidden. Sweet black cherry meets warm almond and roasted tonka bean.",
  }
];

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5005/api";

export async function getProducts(filters: { family?: string; search?: string } = {}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (filters.family) params.append("family", filters.family);
    if (filters.search) params.append("search", filters.search);

    const res = await fetch(`${BACKEND_URL}/products?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Map database _id to id
        return data.map((item: any) => ({
          ...item,
          id: item._id || item.id
        }));
      }
    }
  } catch (error) {
    console.warn("Backend API not reachable, falling back to static mock data");
  }

  // Fallback client filtering
  let results = [...mockProducts];
  if (filters.family) {
    results = results.filter((p) => p.family === filters.family);
  }
  if (filters.search) {
    const s = filters.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.inspiredBy.toLowerCase().includes(s) ||
        p.family.toLowerCase().includes(s) ||
        p.notes.top.some((n) => n.toLowerCase().includes(s)) ||
        p.notes.middle.some((n) => n.toLowerCase().includes(s)) ||
        p.notes.base.some((n) => n.toLowerCase().includes(s))
    );
  }
  return results;
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/products/${id}`);
    if (res.ok) {
      const data = await res.json();
      return {
        ...data,
        id: data._id || data.id
      };
    }
  } catch (error) {
    console.warn("Backend API not reachable, falling back to static mock data");
  }

  const found = mockProducts.find((p) => p.id === id);
  return found || null;
}

// Simple scoring system for fragrance quiz recommendations
export function getRecommendations(answers: { family: string; intensity: string }): Product[] {
  // Filters or ranks based on answers
  const familyMatch = mockProducts.filter((p) => p.family.toLowerCase().includes(answers.family.toLowerCase()));
  if (familyMatch.length > 0) {
    return familyMatch;
  }
  return [mockProducts[0], mockProducts[2]]; // default best fits
}

export async function loginAPI(email: string, password: string): Promise<{ token: string; user: { name: string; email: string; role: "user" | "admin" } } | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.warn("Backend auth API not reachable for login");
  }
  return null;
}

export async function registerAPI(name: string, email: string, password: string, role?: string): Promise<{ token: string; user: { name: string; email: string; role: "user" | "admin" } } | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.warn("Backend auth API not reachable for register");
  }
  return null;
}

export async function createProductAPI(productData: Partial<Product>, token: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(productData),
    });
    if (res.ok) {
      const data = await res.json();
      return {
        ...data,
        id: data._id || data.id
      };
    }
  } catch (error) {
    console.error("Failed to create product in DB:", error);
  }
  return null;
}

export async function deleteProductAPI(id: string, token: string): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return res.ok;
  } catch (error) {
    console.error("Failed to delete product from DB:", error);
  }
  return false;
}

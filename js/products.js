
const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1499,
    originalPrice: 2299,
    rating: 4.3,
    reviews: 218,
    description:
      "Over-ear wireless headphones with 30-hour battery life, deep bass and a foldable design that's perfect for daily commutes and long study sessions.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    stock: 24,
    badge: "BESTSELLER",
    featured: true
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 2999,
    originalPrice: 3499,
    rating: 4.1,
    reviews: 156,
    description:
      "Track your steps, heart rate and sleep with this lightweight smart watch. Comes with a 7-day battery and a bright, always-on display.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    stock: 12,
    badge: "NEW",
    featured: true
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 3499,
    originalPrice: 3499,
    rating: 4.6,
    reviews: 342,
    description:
      "A tactile mechanical keyboard with hot-swappable switches and per-key RGB lighting, built for coders who like to hear every keystroke.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    stock: 8,
    badge: "",
    featured: true
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 1299,
    originalPrice: 1799,
    rating: 4.0,
    reviews: 97,
    description:
      "A compact, water-resistant Bluetooth speaker with surprisingly punchy sound. Great for dorm rooms, hostels and weekend trips.",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    stock: 30,
    badge: "SALE",
    featured: false
  },
  {
    id: 5,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 599,
    originalPrice: 899,
    rating: 4.2,
    reviews: 410,
    description:
      "An ergonomic wireless mouse with silent clicks and a battery that lasts for months. Works smoothly on almost any surface.",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
    stock: 0,
    badge: "",
    featured: false
  },
  {
    id: 6,
    name: "Oversized Hoodie",
    category: "Fashion",
    price: 1199,
    originalPrice: 1599,
    rating: 4.4,
    reviews: 88,
    description:
      "A soft, oversized fleece hoodie that's roomy enough for layering and cozy enough for late-night debugging sessions.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    stock: 18,
    badge: "NEW",
    featured: true
  },
  {
    id: 7,
    name: "Canvas Backpack",
    category: "Fashion",
    price: 1799,
    originalPrice: 2199,
    rating: 4.5,
    reviews: 132,
    description:
      "A durable canvas backpack with a padded 15-inch laptop sleeve, water bottle pockets and enough space for a full day on campus.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    stock: 15,
    badge: "",
    featured: false
  },
  {
    id: 8,
    name: "Minimalist Wallet",
    category: "Accessories",
    price: 499,
    originalPrice: 699,
    rating: 4.0,
    reviews: 64,
    description:
      "A slim, RFID-blocking leather wallet that fits comfortably in your front pocket without the usual bulk.",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
    stock: 40,
    badge: "SALE",
    featured: false
  },
  {
    id: 9,
    name: "Clean Code",
    category: "Books",
    price: 699,
    originalPrice: 899,
    rating: 4.7,
    reviews: 512,
    description:
      "Robert C. Martin's classic guide to writing readable, maintainable software. Required reading before your next pull request.",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    stock: 20,
    badge: "BESTSELLER",
    featured: true
  },
  {
    id: 10,
    name: "JavaScript: The Good Parts",
    category: "Books",
    price: 599,
    originalPrice: 799,
    rating: 4.3,
    reviews: 276,
    description:
      "A short, sharp tour of the best features of JavaScript, and a good excuse to understand the language you're about to debug.",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
    stock: 9,
    badge: "",
    featured: false
  },
  {
    id: 11,
    name: "Desk Lamp",
    category: "Home",
    price: 899,
    originalPrice: 1199,
    rating: 4.1,
    reviews: 73,
    description:
      "A dimmable LED desk lamp with three color temperatures and a USB charging port built into the base, ideal for late-night coding.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    stock: 6,
    badge: "NEW",
    featured: false
  },
  {
    id: 12,
    name: "Stainless Steel Bottle",
    category: "Home",
    price: 449,
    originalPrice: 599,
    rating: 4.4,
    reviews: 190,
    description:
      "A double-walled stainless steel bottle that keeps drinks cold for 24 hours or hot for 12. Fits in most bag side pockets.",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    stock: 50,
    badge: "SALE",
    featured: true
  }
];

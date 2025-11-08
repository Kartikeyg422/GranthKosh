const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
  try {
    // Get token from localStorage if available
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    // Add authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    // Check if response has content
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    // Get response text first
    const text = await response.text();
    
    // Try to parse as JSON if content-type is JSON or if text is not empty
    let data;
    if (isJson && text) {
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Response text:', text);
        throw new Error('Invalid JSON response from server');
      }
    } else if (text) {
      // Extract error message from HTML if it's an HTML error page
      if (text.includes('<!DOCTYPE html>') || text.includes('<html>')) {
        // Try to extract error message from HTML
        const preMatch = text.match(/<pre[^>]*>([^<]+)<\/pre>/i);
        const titleMatch = text.match(/<title[^>]*>([^<]+)<\/title>/i);
        
        if (preMatch && preMatch[1]) {
          throw new Error(preMatch[1].trim());
        } else if (titleMatch && titleMatch[1]) {
          throw new Error(titleMatch[1].trim());
        } else {
          throw new Error(`Server error: ${response.status} ${response.statusText}. The endpoint may not exist.`);
        }
      } else {
        // Plain text error
        throw new Error(text.trim() || 'Server returned non-JSON response');
      }
    } else {
      // Empty response
      data = {};
    }

    if (!response.ok) {
      const errorMessage = data.message || data.error || `Server error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error('Network Error:', error);
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    }
    
    // Re-throw if it's already our custom error
    if (error.message) {
      console.error('API Error:', error.message);
      throw error;
    }
    
    // Otherwise, wrap in a generic error
    console.error('API Error:', error);
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

// Product API functions
export const productAPI = {
  // Get all products
  getAll: async (filters = {}) => {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    return apiRequest(endpoint);
  },

  // Get single product by ID
  getById: async (id) => {
    return apiRequest(`/products/${id}`);
  },

  // Create new product
  create: async (productData) => {
    return apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // Update product
  update: async (id, productData) => {
    return apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  // Delete product
  delete: async (id) => {
    return apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  // Get dashboard stats
  getStats: async () => {
    // This endpoint might need to be created in your backend
    // For now, we'll calculate from products
    const response = await apiRequest('/products');
    
    // Handle different response structures (array or object with products property)
    const products = Array.isArray(response) ? response : (response.products || []);
    
    const totalBooks = products.length || 0;
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const totalValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0);
    
    return {
      totalBooks,
      totalStock,
      totalValue,
      products,
    };
  },
};

// Auth API functions
export const authAPI = {
  // Login user
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Register user
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Get current user
  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    return apiRequest('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Orders API functions
export const orderAPI = {
  // Get all orders
  getAll: async () => {
    return apiRequest('/orders');
  },

  // Get user's orders
  getMyOrders: async () => {
    return apiRequest('/orders/my');
  },

  // Get single order by ID
  getById: async (id) => {
    return apiRequest(`/orders/${id}`);
  },

  // Create new order
  create: async (orderData) => {
    return apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  // Update order status
  updateStatus: async (id, status) => {
    return apiRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Delete order
  delete: async (id) => {
    return apiRequest(`/orders/${id}`, {
      method: 'DELETE',
    });
  },
};

// Users API functions
export const userAPI = {
  // Get all users
  getAll: async () => {
    return apiRequest('/users');
  },

  // Get single user by ID
  getById: async (id) => {
    return apiRequest(`/users/${id}`);
  },

  // Create new user
  create: async (userData) => {
    return apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Update user
  update: async (id, userData) => {
    return apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Delete user
  delete: async (id) => {
    return apiRequest(`/users/${id}`, {
      method: 'DELETE',
    });
  },

  // Update user role
  updateRole: async (id, role) => {
    return apiRequest(`/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  },
};

// Cart API functions (using localStorage for now, can be replaced with backend API)
export const cartAPI = {
  // Get cart from localStorage
  getCart: () => {
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  },

  // Save cart to localStorage
  saveCart: (cart) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  },

  // Add item to cart
  addItem: (product, quantity = 1) => {
    const cart = cartAPI.getCart();
    const existingItem = cart.find(item => item.productId === (product._id || product.id));
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: product._id || product.id,
        title: product.title,
        author: product.author,
        price: product.discountPrice || product.price,
        image: product.imageUrl || product.image,
        quantity: quantity,
      });
    }
    
    cartAPI.saveCart(cart);
    return cart;
  },

  // Update item quantity
  updateQuantity: (productId, quantity) => {
    const cart = cartAPI.getCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
      if (quantity <= 0) {
        cartAPI.removeItem(productId);
      } else {
        item.quantity = quantity;
        cartAPI.saveCart(cart);
      }
    }
    
    return cartAPI.getCart();
  },

  // Remove item from cart
  removeItem: (productId) => {
    const cart = cartAPI.getCart();
    const updatedCart = cart.filter(item => item.productId !== productId);
    cartAPI.saveCart(updatedCart);
    return updatedCart;
  },

  // Clear cart
  clearCart: () => {
    localStorage.removeItem('cart');
  },
};

export default productAPI;


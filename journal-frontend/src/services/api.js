const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Auth API
export const authAPI = {
  register: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Registration failed' }));
      console.error('Registration API Error:', error);
      throw new Error(error.message || 'Registration failed');
    }
    
    return response.json();
  },

  login: async (email, password) => {
    try {
      console.log('Attempting login for:', email);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      console.log('Login Response Status:', response.status);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Login failed' }));
        console.error('Login API Error Payload:', error);
        throw new Error(error.message || 'Invalid credentials');
      }
      
      return response.json();
    } catch (err) {
      console.error('Login Network/Logic Error:', err);
      throw err;
    }
  }
};

// Journal API
export const journalAPI = {
  getByUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/api/journals/user/${userId}`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch journals');
    }
    
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/journals/${id}`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch journal');
    }
    
    return response.json();
  },

  create: async (title, content, userId) => {
    const response = await fetch(`${API_BASE_URL}/api/journals`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title, content, userId })
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create journal' }));
      throw new Error(error.message || 'Failed to create journal');
    }
    
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/journals/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete journal');
    }
    
    return true;
  },

  update: async (id, title, content) => {
    const response = await fetch(`${API_BASE_URL}/api/journals/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title, content })
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update journal' }));
      throw new Error(error.message || 'Failed to update journal');
    }
    
    return response.json();
  }
};

export default { authAPI, journalAPI };

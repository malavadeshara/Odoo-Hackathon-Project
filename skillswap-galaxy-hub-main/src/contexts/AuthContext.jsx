import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('skillsync_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - in real app would come from backend
    const userData = {
      id: '1',
      name: email === 'admin@skillsync.com' ? 'Admin User' : 'Demo User',
      email,
      role: email === 'admin@skillsync.com' ? 'admin' : 'user',
      isAdmin: email === 'admin@skillsync.com',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
      location: 'San Francisco, CA',
      points: email === 'admin@skillsync.com' ? 0 : 150,
      badges: email === 'admin@skillsync.com' ? ['Administrator'] : ['Newbie', 'Helper'],
      skillsOffered: email === 'admin@skillsync.com' ? [] : ['React', 'JavaScript', 'UI/UX Design'],
      skillsWanted: email === 'admin@skillsync.com' ? [] : ['Python', 'Machine Learning'],
      isPublic: email !== 'admin@skillsync.com',
      availability: email !== 'admin@skillsync.com',
      rating: email === 'admin@skillsync.com' ? 0 : 4.8,
      swapsCompleted: email === 'admin@skillsync.com' ? 0 : 12
    };
    
    setUser(userData);
    localStorage.setItem('skillsync_user', JSON.stringify(userData));
    setIsLoading(false);
  };

  const register = async (userData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: 'user',
      isAdmin: false,
      points: 0,
      badges: ['Newbie'],
      rating: 0,
      swapsCompleted: 0
    };
    
    setUser(newUser);
    localStorage.setItem('skillsync_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillsync_user');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('skillsync_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const login = (email: string, password: string): boolean => {
  if (email && password) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', 'true');
    }
    return true;
  }
  return false;
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('isAuthenticated');
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  return false;
};
import { ref } from 'vue';

const isAuthenticated = ref(false);

export function useAuth() {
  const login = (username, password) => {
    // Hardcoded credentials
    if (username === 'admin' && password === 'password123') {
      isAuthenticated.value = true;
      return true;
    }
    return false;
  };

  const logout = () => {
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated,
    login,
    logout
  };
}
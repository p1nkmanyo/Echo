import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/api';

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (e) {
    console.error('Error storing auth token', e);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('@auth_token');
  } catch (e) {
    console.error('Error retrieving auth token', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@auth_token');
  } catch (e) {
    console.error('Error removing auth token', e);
  }
};

export const registerWithEmail = async (email, password, name) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Ошибка при регистрации.' };
    }

    if (data.token) {
      await storeToken(data.token);
    }

    return { success: true, user: data.user };
  } catch (error) {
    console.error('Register API Error:', error);
    return { success: false, error: 'Ошибка сети. Проверьте подключение к интернету или адрес сервера.' };
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Ошибка при входе.' };
    }

    if (data.token) {
      await storeToken(data.token);
    }

    return { success: true, user: data.user };
  } catch (error) {
    console.error('Login API Error:', error);
    return { success: false, error: 'Ошибка сети. Проверьте подключение к интернету или адрес сервера.' };
  }
};

// Заглушка для входа через Google
export const signInWithGoogle = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: false, error: 'Вход через Google временно недоступен.' });
    }, 1000);
  });
};

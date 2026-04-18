import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const getFriendlyErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Неверный формат email.';
    case 'auth/user-disabled':
      return 'Этот аккаунт был заблокирован.';
    case 'auth/user-not-found':
      return 'Пользователь не найден.';
    case 'auth/wrong-password':
      return 'Неверный пароль.';
    case 'auth/email-already-in-use':
      return 'Этот email уже используется.';
    case 'auth/weak-password':
      return 'Слишком слабый пароль.';
    case 'auth/invalid-credential':
      return 'Неверные учетные данные.';
    default:
      return 'Произошла ошибка при авторизации.';
  }
};

import { updateProfile } from 'firebase/auth';

export const registerWithEmail = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (name && userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
    }
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: getFriendlyErrorMessage(error) };
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: getFriendlyErrorMessage(error) };
  }
};

// Заглушка для входа через Google
export const signInWithGoogle = async () => {
  // В реальном проекте здесь будет логика Google Sign-In (например, @react-native-google-signin/google-signin или expo-auth-session)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: false, error: 'Вход через Google временно недоступен.' });
    }, 1000);
  });
};

import { Platform } from 'react-native';

// Replace '192.168.1.100' with the actual local IP address of your machine on your Wi-Fi network
// For Android emulator, use '10.0.2.2'
// For iOS simulator, use 'localhost'

const LOCAL_IP = '192.168.1.100';

const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      // return `http://10.0.2.2:3000`; // uncomment for emulator
      return `http://${LOCAL_IP}:3000`; // uncomment for physical device
    }
    return `http://${LOCAL_IP}:3000`; // or 'http://localhost:3000' for iOS simulator
  }
  // Production URL
  return 'https://your-production-server.com';
};

export const API_URL = getBaseUrl();

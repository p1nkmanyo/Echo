import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { signInWithGoogle, getToken } from '../utils/auth';

export default function WelcomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const styles = getStyles(isDark);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        // If token exists, redirect to main app immediately
        router.replace('/(tabs)');
      } else {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={isDark ? '#FFFFFF' : '#000000'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>Echo</Text>
          <Text style={styles.slogan}>Твой голос имеет значение</Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.primaryButtonText}>Войти</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.secondaryButtonText}>Зарегистрироваться</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.outlineButton]}
            onPress={async () => {
              const result = await signInWithGoogle();
              if (!result.success) {
                Toast.show({
                  type: 'info',
                  text1: 'Google Auth',
                  text2: result.error,
                });
              }
            }}
          >
            <Text style={styles.outlineButtonText}>Продолжить с Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (isDark) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#121212' : '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: '800',
    color: isDark ? '#FFFFFF' : '#000000',
    marginBottom: 12,
    letterSpacing: -1,
  },
  slogan: {
    fontSize: 18,
    color: isDark ? '#A0A0A0' : '#666666',
    fontWeight: '500',
  },
  footer: {
    width: '100%',
    gap: 16,
    paddingBottom: 24,
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: isDark ? '#FFFFFF' : '#000000',
  },
  primaryButtonText: {
    color: isDark ? '#000000' : '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
  },
  secondaryButtonText: {
    color: isDark ? '#FFFFFF' : '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: isDark ? '#3A3A3C' : '#E5E5EA',
  },
  outlineButtonText: {
    color: isDark ? '#FFFFFF' : '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

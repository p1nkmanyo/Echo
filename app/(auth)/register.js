import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, useColorScheme, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { registerWithEmail } from '../../utils/auth';

export default function RegisterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        text2: 'Пожалуйста, заполните все поля.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        text2: 'Пароли не совпадают.',
      });
      return;
    }

    setIsLoading(true);
    const result = await registerWithEmail(email, password, name);
    setIsLoading(false);

    if (result.success) {
      Toast.show({
        type: 'success',
        text1: 'Успешно',
        text2: 'Аккаунт создан.',
      });
      router.replace('/(tabs)/chats');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Ошибка регистрации',
        text2: result.error,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Создать аккаунт</Text>
        <Text style={styles.subtitle}>Присоединяйтесь к Echo уже сегодня</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Имя</Text>
            <TextInput
              style={styles.input}
              placeholder="Как к вам обращаться?"
              placeholderTextColor={isDark ? '#666666' : '#999999'}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Ваш email"
              placeholderTextColor={isDark ? '#666666' : '#999999'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Пароль</Text>
            <TextInput
              style={styles.input}
              placeholder="Придумайте пароль (мин. 6 символов)"
              placeholderTextColor={isDark ? '#666666' : '#999999'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Подтверждение пароля</Text>
            <TextInput
              style={styles.input}
              placeholder="Повторите пароль"
              placeholderTextColor={isDark ? '#666666' : '#999999'}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={isDark ? '#000' : '#FFF'} />
            ) : (
              <Text style={styles.primaryButtonText}>Создать аккаунт</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const getStyles = (isDark) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#121212' : '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: isDark ? '#A0A0A0' : '#666666',
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: isDark ? '#FFFFFF' : '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: isDark ? '#A0A0A0' : '#666666',
    marginBottom: 32,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#000000',
    marginLeft: 4,
  },
  input: {
    height: 56,
    backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: isDark ? '#FFFFFF' : '#000000',
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  primaryButton: {
    backgroundColor: isDark ? '#FFFFFF' : '#000000',
  },
  primaryButtonText: {
    color: isDark ? '#000000' : '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

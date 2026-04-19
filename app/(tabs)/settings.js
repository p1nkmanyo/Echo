import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, useColorScheme, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { removeToken } from '../../utils/auth';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);
  const router = useRouter();

  const handleLogout = async () => {
    await removeToken();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Настройки</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Аккаунт</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Выйти</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (isDark) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: isDark ? '#121212' : '#F2F2F7',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: isDark ? '#121212' : '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#2C2C2E' : '#E5E5EA',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: isDark ? '#FFFFFF' : '#000000',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: isDark ? '#8E8E93' : '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 16,
  },
  logoutButton: {
    backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
});

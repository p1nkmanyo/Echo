import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, useColorScheme, Platform } from 'react-native';

export default function ChatsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Чаты</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.emptyText}>У вас пока нет активных чатов.</Text>
          <Text style={styles.subText}>Здесь будут отображаться ваши переписки.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (isDark) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: isDark ? '#121212' : '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#000000',
    marginBottom: 8,
  },
  subText: {
    fontSize: 15,
    color: isDark ? '#8E8E93' : '#8E8E93',
    textAlign: 'center',
  },
});

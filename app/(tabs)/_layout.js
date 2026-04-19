import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
          borderTopColor: isDark ? '#2C2C2E' : '#E5E5EA',
        },
        tabBarActiveTintColor: isDark ? '#FFFFFF' : '#000000',
        tabBarInactiveTintColor: isDark ? '#8E8E93' : '#8E8E93',
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Чаты',
          // В будущем здесь можно добавить иконку (например, из @expo/vector-icons)
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Настройки',
        }}
      />
    </Tabs>
  );
}

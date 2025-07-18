import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4A90E2', // Bleu doux pour les icônes actives
        tabBarInactiveTintColor: '#9CA3AF', // Gris pour les icônes inactives
        tabBarStyle: {
          backgroundColor: '#4A90E2', // Fond bleu pour la barre
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          height: Platform.OS === 'ios' ? 90 : 70,
        },
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={28} 
              name="house.fill" 
              color={focused ? '#FFFFFF' : '#B8D4F0'} 
            />
          ),
          tabBarLabelStyle: {
            color: '#FFFFFF',
            fontSize: 12,
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={28} 
              name="paperplane.fill" 
              color={focused ? '#FFFFFF' : '#B8D4F0'} 
            />
          ),
          tabBarLabelStyle: {
            color: '#FFFFFF',
            fontSize: 12,
          },
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={28} 
              name="trophy.fill" 
              color={focused ? '#FFFFFF' : '#B8D4F0'} 
            />
          ),
          tabBarLabelStyle: {
            color: '#FFFFFF',
            fontSize: 12,
          },
        }}
      />
      <Tabs.Screen
        name="detailsItem"
        options={{
          href: null, // Cacher de la navigation
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null, // Cacher de la navigation
        }}
      />
    </Tabs>
  );
}

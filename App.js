import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/presentation/screens/HomeScreen';
import { theme } from './src/core/theme';

const SearchScreen = () => <View style={{flex:1, backgroundColor: theme.colors.background}}><Text style={{color:'white', margin:50}}>Search Screen</Text></View>;
const SettingsScreen = () => <View style={{flex:1, backgroundColor: theme.colors.background}}><Text style={{color:'white', margin:50}}>Settings Screen</Text></View>;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.tabBar,
            borderTopWidth: 0,
            height: 60,
            paddingBottom: 10,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
            else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
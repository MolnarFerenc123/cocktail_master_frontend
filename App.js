import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/presentation/screens/HomeScreen';
import CocktailDetailScreen from './src/presentation/screens/CocktailDetailScreen';
import { View, Text } from 'react-native';
import { theme } from './src/core/theme';
import AnimationScreen from './src/presentation/screens/AnimationScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SearchScreen = () => <View style={{flex:1, backgroundColor: theme.colors.background}}><Text style={{color:'white', margin:50}}>Search Screen</Text></View>;
const SettingsScreen = () => <View style={{flex:1, backgroundColor: theme.colors.background}}><Text style={{color:'white', margin:50}}>Settings Screen</Text></View>;

function BottomTabs() {
  return (
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
          if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{title: 'Home'}} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="CocktailDetail" component={CocktailDetailScreen} />
        <Stack.Screen name="Animation" component={AnimationScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
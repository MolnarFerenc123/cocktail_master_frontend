import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/presentation/screens/HomeScreen';
import CocktailDetailScreen from './src/presentation/screens/CocktailDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CocktailDetail" component={CocktailDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
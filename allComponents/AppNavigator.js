import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherCard from '../allComponents/WeatherCard';
import ForecastList from '../allComponents/ForecastList';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Weather" component={WeatherCard} options={{ title: 'Weather' }} />
      <Stack.Screen name="Forecast" component={ForecastList} options={{ title: '5-Day Forecast' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

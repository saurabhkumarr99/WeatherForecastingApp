import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const WeatherCard = ({ navigation }) => {
  const [cityName, setCityName] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'aea4409bceb55ad9dd2f2ffacc996213';
  const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}?q=${cityName}&appid=${API_KEY}`);
      setForecastData([response.data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setForecastData([]);
      setLoading(false);
    }
  };

  const handleCityNameChange = (text) => {
    setCityName(text);
  };

  const navigateToForecastList = () => {
    navigation.navigate('Forecast', { city: cityName });
  };

  const renderWeatherCondition = (weatherData) => {
    return (
      <View style={styles.weatherBox}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : weatherData.length > 0 ? (
          <View>
            <Text style={styles.cityName}>{weatherData[0].name}</Text>
            <View style={styles.weatherDetails}>
              <View style={styles.detailItem}>
                <Icon name="thermometer" size={25} color="#333" style={styles.icon} />
                <Text style={styles.detailText}>
                  Temperature: <Text style={styles.boldText}>{weatherData[0].main.temp }°C</Text>
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Icon name="tachometer" size={25} color="#333" style={styles.icon} />
                <Text style={styles.detailText}>
                  Pressure: <Text style={styles.boldText}>{weatherData[0].main.pressure} hPa</Text>
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Icon name="cloud" size={25} color="#333" style={styles.icon} />
                <Text style={styles.detailText}>
                  Weather: <Text style={styles.boldText}>{weatherData[0].weather[0].main}</Text>
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Icon name="tint" size={25} color="#333" style={styles.icon} />
                <Text style={styles.detailText}>
                  Humidity: <Text style={styles.boldText}>{weatherData[0].main.humidity}%</Text>
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Icon name="flag" size={25} color="#333" style={styles.icon} />
                <Text style={styles.detailText}>
                  Wind Speed: <Text style={styles.boldText}>{weatherData[0].wind.speed} m/s</Text>
                </Text>
              </View>
            </View>
            <Button title="5-Day Forecast" onPress={navigateToForecastList} />
          </View>
        ) : (
          <Text>No weather data available</Text>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      width: '100%',
      borderRadius: 8, // Rounded corner style for input box
    },
    cityName: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    weatherBox: {
      backgroundColor: '#f5f5f5',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      width: '100%',
    },
    weatherDetails: {
      alignItems: 'center',
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    detailText: {
      fontSize: 16,
      textAlign: 'center',
    },
    boldText: {
      fontWeight: 'bold',
    },
    icon: {
      marginRight: 10,
      marginTop: 3,
      alignSelf: 'center',
    },
    button: {
      borderRadius: 8,
      overflow: 'hidden',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter City Name"
        value={cityName}
        onChangeText={handleCityNameChange}
      />
      
      <Button title="Get Weather" onPress={fetchWeatherData}  style={styles.button}/>
      <View style={{ height: 20 }} />
      {renderWeatherCondition(forecastData)}
    </View>
  );
};

export default WeatherCard;

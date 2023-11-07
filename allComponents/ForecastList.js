import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

const ForecastList = ({ route }) => {
  const { city } = route.params;

  const [middayForecastData, setMiddayForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=aea4409bceb55ad9dd2f2ffacc996213`);
        const middayData = response.data.list.filter(item => item.dt_txt.includes("06:00:00"));
        setMiddayForecastData(middayData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
        setLoading(false);
      }
    };

    fetchForecastData();
  }, [city]);

  const renderForecastItem = ({ item }) => {
    let weatherIcon = null;
  
    switch (item.weather[0].main) {
      case 'Clear':
        weatherIcon = <Feather name="sun" size={24} color="orange" />;
        break;
      case 'Clouds':
        weatherIcon = <Feather name="cloud" size={24} color="gray" />;
        break;
      case 'Rain':
        if (item.weather[0].description === 'light rain') {
          weatherIcon = <Feather name="cloud-drizzle" size={24} color="lightblue" />;
        } else if (item.weather[0].description === 'moderate rain') {
          weatherIcon = <Feather name="cloud-rain" size={24} color="blue" />;
        } else {
          weatherIcon = <Feather name="cloud-rain" size={24} color="darkblue" />;
        }
        break;
      default:
        weatherIcon = <Feather name="sun" size={24} color="orange" />;
        break;
    }
  
    const formattedDate = item.dt_txt.split(' ')[0].split('-').reverse().join('-');
  
    return (
      <View style={styles.forecastItem}>
        <View style={styles.weatherDetails}>
        <Text style={styles.date}>{formattedDate}</Text>
          <View style={styles.row}>         
            <View style={styles.row1}>
              <Feather name="thermometer" size={24} color="red" />
              <Text style={styles.temperature}>{(item.main.temp / 10).toFixed(2)}°C</Text>
            </View>
          </View>
          <View style={styles.row}>         
              <Feather name="wind" size={24} color="blue" />
              <Text style={styles.windSpeed}>{item.wind.speed} m/s</Text>
              <View style={{ width: 20 }} />
              {weatherIcon}
              <Text style={styles.description}>{item.weather[0].description}</Text>
            </View>
          
        </View>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.futureForecastText}>Future Forecast</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : middayForecastData.length > 0 ? (
        <FlatList
          data={middayForecastData}
          renderItem={renderForecastItem}
          keyExtractor={(item) => item.dt.toString()}
        />
      ) : (
        <Text>No forecast data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    padding: 20,
  },
  futureForecastText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  forecastItem: {
    borderWidth: 1,
    borderColor: 'black',
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherDetails: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 16,
    marginLeft: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  windSpeed: {
    fontSize: 14,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default ForecastList;

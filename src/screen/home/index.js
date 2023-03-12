import React from 'react';
import {getWeatherApi} from '../../redux/action/index';
import {
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import localImages from '../../utils/localImages';

export default function HomeScreen() {
  const [location, setLocation] = React.useState({
    lat: 0,
    long: 0,
  });

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=437b42a4ae70478eb8271532230903&q=${location.lat}, ${location.long}&aqi=yes`;

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Weather App Location Permission',
            message: 'Weather App needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              setLocation({
                lat: position.coords.latitude,
                long: position.coords.longitude,
              });
            },
            error => console.log(error),
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
            },
          );
        } else {
          console.log('deined');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Geolocation.getCurrentPosition(
        position => {
          setLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        error => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    }
  };

  const wetherApi = () => {
    getWeatherApi(
      apiUrl,
      response => {
        console.log({
          temp_c: `${response.current.temp_c} C`,
          temp_f: `${response.current.temp_f} F`,
        });
      },
      errorResponse => {
        console.log(errorResponse);
      },
    );
  };

  React.useEffect(() => {
    requestLocationPermission();
    wetherApi();
  }, []);

  return (
    <ImageBackground
      style={{flex: 1}}
      source={localImages.night}
      resizeMode="cover">
      <Image
        source={localImages.nightHouse}
        style={{alignSelf: 'center'}}
        resizeMode="contain"
      />
      <View style={{backgroundColor: 'red', justifyContent: 'flex-end'}}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            borderBottomWidth: 1,
          }}>
          <Text style={{fontWeight: '600', fontSize: 15, color: 'black'}}>
            Hourly Forecast
          </Text>
          <Text style={{fontWeight: '600', fontSize: 15, color: 'black'}}>
            Weekly Forecast
          </Text>
        </View>
        <FlatList
          horizontal
          data={[
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
          ]}
          // style={{backgroundColor: 'red'}}
          contentContainerStyle={{paddingHorizontal: 16}}
          renderItem={() => (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                marginRight: 10,
                height: 146,
                width: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text> riHABH</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
}

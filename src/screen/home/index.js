import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';
import React from 'react';
import localImages from '../../utils/localImages';
import {getWeatherApi} from '../../redux/action/index';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../utils/colors';
import localstrings from '../../utils/strings';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [location, setLocation] = React.useState({
    lat: 0,
    long: 0,
  });
  const [active, setActive] = React.useState(1);
  const {HEIGHT} = NativeModules?.StatusBarManager;
  const [temperature, setTemperature] = React.useState(null);
  const {current} = useSelector(Store => Store.ForecastReducer);
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=437b42a4ae70478eb8271532230903&q=${location.lat}, ${location.long}&days=5&aqi=yes&alerts=yes`;
  // http://api.weatherapi.com/v1/forecast.json?key=3b0e1975ea6e4c6e9dd124408230703&q=28.6278956,77.3057513&days=5&aqi=yes&alerts=yes
  console.log(current.con);

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
              console.log(position);
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
          console.log(position);
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

  const next = () => {};

  const wetherApi = () =>
    getWeatherApi(
      apiUrl,
      response => {
        console.log('response', response);
        setTemperature(response.current.temp_c);
        // console.log(`${response.current.temp_c}`);
      },
      errorResponse => {
        console.log(errorResponse);
      },
    );

  React.useEffect(() => {
    requestLocationPermission();
    dispatch(wetherApi());
  }, []);

  const activeButton = tab => {
    if (tab) {
      setActive(0);
    } else {
      setActive(1);
    }
  };

  return (
    <LinearGradient
      style={{alignItems: 'center', flex: 1, paddingTop: HEIGHT}}
      colors={['#064C61', '#08151E', '#08151E']}>
      <Text style={styles.vanarsText}>Varanasi</Text>
      <Text style={styles.dateText}>{localstrings.date}</Text>
      <View
        style={{
          marginTop: 30,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#135275',
        }}>
        <CustomButton
          titleStyle={{
            fontSize: 16,
            fontWeight: '500',
            color: active ? 'white' : '#CFDCE3',
          }}
          onPress={() => activeButton(0)}
          title={'Forecast'}
          container={{
            width: 125,
            height: 48,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: active ? '#4084DF' : '#135275',
          }}
        />
        <CustomButton
          titleStyle={{
            fontSize: 16,
            fontWeight: '500',
            color: active ? '#CFDCE3' : 'white',
          }}
          onPress={() => activeButton(1)}
          title={'Air Quality'}
          container={{
            width: 125,
            height: 48,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: active ? '#135275' : '#4084DF',
          }}
        />
      </View>
      <Image source={localImages.cloudIcon} style={styles.cloudImge} />
      <Text style={styles.temperatureText}>{temperature}</Text>
      <Text style={styles.currentCondition}>{current?.condition?.text}</Text>
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          justifyContent: 'space-between',
          marginVertical: 20,
          alignItems: 'center',
        }}>
        <Text style={styles.todayText}>Today</Text>
        <Text style={styles.fullReport}>View Full Report</Text>
      </View>
      <FlatList
        data={['', '', '', '', '', '', '', '', '', '', '', '', '', '', '']}
        horizontal
        style={{width: '90%', borderRadius: 13, backgroundColor: '#2566A333'}}
        bounces={false}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingRight: 15,
        }}
        renderItem={() => {
          return (
            <View style={styles.listItemView}>
              <Text style={styles.temText}>28°C</Text>
            </View>
          );
        }}
      />
    </LinearGradient>
  );
}

export const CustomButton = ({...props}) => {
  return (
    <TouchableOpacity
      style={props.container}
      onPress={props.onPress}
      activeOpacity={0.7}>
      <Text style={props.titleStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  vanarsText: {
    marginTop: 30,
    color: colors.white,
    fontSize: 39.88,
    fontWeight: '500',
  },
  dateText: {color: 'lightgrey', fontSize: 15},
  cloudImge: {width: 237, height: 247, alignSelf: 'center'},
  listItemView: {
    borderWidth: 1,
    marginLeft: 15,
    borderRadius: 25,
    padding: 16,
  },
  temText: {color: 'white', fontSize: 23},
  temperatureText: {
    color: colors.white,
    fontSize: 39.88,
    fontWeight: '900',
  },
  currentCondition: {
    color: 'lightgrey',
  },
  todayText: {color: 'white', fontSize: 20},
  fullReport: {color: '#5491E2', fontSize: 21},
});

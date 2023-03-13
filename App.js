import {View, Text} from 'react-native';
import React from 'react';
import HomeScreen from './src/screen/home';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    </View>
  );
}

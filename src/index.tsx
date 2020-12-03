import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Alert, PermissionsAndroid, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';
import { HomeScreen } from './screens';
import { ExposedToJava } from './tools/ExposedToJava';

const Tab = createBottomTabNavigator();
const exposedToJava = new ExposedToJava();
BatchedBridge.registerCallableModule('JavaScriptVisibleToJava', exposedToJava);

interface AppState {
  loaded: boolean;
}

export default class App extends Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { loaded: false };
  }
  async UNSAFE_componentWillMount() {
    try {
      // const granted = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      // );
      // // const granted1 = await PermissionsAndroid.request(
      // //   PermissionsAndroid.PERMISSIONS.ACCESS_NETWORK_STATE,
      // // );
      // const granted1 = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      // );
      // // const granted2 = await PermissionsAndroid.request(
      // //   PermissionsAndroid.PERMISSIONS.CAPTURE_AUDIO_OUTPUT,
      // // );
      // const granted3 = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      // );
      // if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      //   Alert.alert('Uyarı', 'Lütfen dosya erişim izni veriniz.');
      // }
      this.setState({ loaded: true });
    } catch (err) {
      Alert.alert('Hata', err.toString());
      if (__DEV__) {
        console.log(err);
      }
    }
  }
  render() {
    return this.state.loaded ? (
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
              labelStyle: { fontSize: 14, fontWeight: 'bold' },
              style: { height: 60 },
            }}>
            <Tab.Screen
              name="Home"
              options={{
                title: 'Anasayfa',
                tabBarIcon: (props) => {
                  return (
                    <FontAwesome5
                      name={'home'}
                      size={props.size}
                      color={props.color}
                    />
                  );
                },
              }}
              component={HomeScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    ) : (
      <View></View>
    );
  }
}

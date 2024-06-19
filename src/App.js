import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {MyStack} from './Stack/MyStack';
import {ChannelsContext} from './Context/ChannelsContext';
import NetInfo from '@react-native-community/netinfo';
import InternetInfo from './screens/InternetInfo';
import {SearchContext} from './Context/SearchContext';
import {OneSignal} from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';
import {globalVariables} from './global';
import getCountryList from './helper/getCountryList';
import {ShowAppContext} from './Context/ShowAppCondex';

const App = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [netOk, setNetOk] = useState(false);
  const [backPressCount, setBackPressCount] = useState(0);

  useEffect(() => {
    const backAction = () => {
      if (backPressCount === 0) {
        setBackPressCount(1);
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        setTimeout(() => {
          setBackPressCount(0);
        }, 2000); // reset back press count after 2 seconds
        return true;
      } else if (backPressCount === 1) {
        BackHandler.exitApp();
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [backPressCount]);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      setNetOk(state.isConnected);
      SplashScreen.hide();
    });

    getCountryList();

    // Unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);

  // OneSignal.initialize(globalVariables.OneSignalId);

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <ShowAppContext.Provider
            value={{showMainContent, setShowMainContent}}>
            <ChannelsContext.Provider value={{data, setData}}>
              <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <StatusBar />
                {netOk ? <MyStack /> : <InternetInfo />}
              </SearchContext.Provider>
            </ChannelsContext.Provider>
          </ShowAppContext.Provider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

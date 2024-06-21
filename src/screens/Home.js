import {
  ActivityIndicator,
  BackHandler,
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import InAppReview from 'react-native-in-app-review';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SingleStreamModal from '../components/Single_Stream/SingleStreamModal';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryDetailsScreen from './CategoryDetailsScreen';
import {ChannelsContext} from '../Context/ChannelsContext';
import {getChannels} from '../helper/getChannels';
import {getMergedChannels} from '../helper/getMergedChannels';
import BannerAd from '../components/adComponents/BannerAd';
import {globalColors, globalVariables} from '../global';
import CountryListScreen from './CountryListScreen';
import {ShowAppContext} from '../Context/ShowAppCondex';
import {InterstitialAdManager} from 'react-native-fbads';
const Home = () => {
  const navigation = useNavigation();
  const {showMainContent, setShowMainContent} = useContext(ShowAppContext);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const toggleModal = () => {
    setShowModal(() => !showModal);
  };
  const handleSeachChannels = () => {
    navigation.navigate('GooglePageScreen');
  };

  const handleRefresh = () => {
    // checkPlaylist(countryCode);3
  };

  const checkShowApp = async () => {
    setLoading(true);
    const jsonValue = await AsyncStorage.getItem('showApp');
    if (jsonValue !== null) {
      const {showApp} = JSON.parse(jsonValue);
      setShowMainContent(showApp);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkShowApp();
  }, []);

  const handleCountrySelect = data => {
    setCountryCode(data.code.toLowerCase());
    // ad start
    InterstitialAdManager.showAd(globalVariables.InterstitialAdId)
      .then(didClick => {})
      .catch(error => {
        console.log('err', error);
      });
    // ad end
    navigation.navigate('CategoryDetailsScreen', {
      countryCode: data.code.toLowerCase(),
      countryName: data.name,
      flag: data.flag,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={globalVariables.Title} refreshData={handleRefresh} />
      {/* Home page before loading country list start*/}
      {!showMainContent && !loading && (
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: globalColors.secondaryText,
            }}>
            No Playlist Added
          </Text>
          <Icon
            name={'search'}
            size={32}
            color={globalColors.primaryBackground}
          />
          <Text style={{color: globalColors.secondaryText}}>
            Click on "Search Playlist" and select suitable website
          </Text>
          <Icon.Button
            name="live-tv"
            backgroundColor={globalColors.primaryBackground}
            onPress={handleSeachChannels}>
            <Text
              style={{
                fontFamily: 'Arial',
                fontSize: 15,
                color: globalColors.primaryText,
              }}>
              Search Playlist
            </Text>
          </Icon.Button>
          <Icon.Button
            name="play-circle"
            backgroundColor={globalColors.primaryBackground}
            onPress={toggleModal}>
            <Text
              style={{
                fontFamily: 'Arial',
                fontSize: 15,
                color: globalColors.primaryText,
              }}>
              Play Single Stream
            </Text>
          </Icon.Button>
          {/* modal signle stream */}
          <Modal
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
            }}
            visible={showModal}
            animationType="fade"
            onRequestClose={toggleModal}>
            <SingleStreamModal onClose={toggleModal} />
          </Modal>
        </View>
      )}

      {/* Home page before loading country list end*/}
      {showMainContent && !loading && (
        <CountryListScreen onCountrySelect={handleCountrySelect} />
      )}
      {/* loading indicatior start */}
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <ActivityIndicator
            size="large"
            color={globalColors.primaryBackground}
          />
        </View>
      )}
      {/* loading indicatior end */}

      {/* banner ad */}
      <BannerAd placement_id={globalVariables.BannerAdId} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

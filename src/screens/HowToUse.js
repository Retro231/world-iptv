import {BackHandler, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../components/Header/Header';
import {FlatList} from 'react-native-gesture-handler';
import SingleStep from '../components/How_to_use/SingleStep';
import BannerAd from '../components/adComponents/BannerAd';
import {useNavigation} from '@react-navigation/native';
import {globalColors, globalVariables} from '../global';
import {InterstitialAdManager} from 'react-native-fbads';

const img1 = require('./../assets/screenshots/1.png');
const img2 = require('./../assets/screenshots/2.png');
const img3 = require('./../assets/screenshots/3.png');
const img4 = require('./../assets/screenshots/4.png');
const img5 = require('./../assets/screenshots/5.png');

const data = [
  {
    id: 1,
    image: img1,
  },
  {
    id: 2,
    image: img2,
  },
  {
    id: 3,
    image: img3,
  },
  {
    id: 4,
    image: img4,
  },
  {
    id: 5,
    image: img5,
  },
];

const HowToUse = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
      // show ad
      InterstitialAdManager.showAd(globalVariables.InterstitialAdId)
        .then(didClick => {})
        .catch(error => {
          console.log('err', error);
        });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: globalColors.primaryBackground}}>
      <Header title={'How To Use'} goBackTo={'oneStep'} />
      <View style={{flex: 1, margin: 10}}>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <SingleStep title={index + 1} image={item.image} />
          )}
          keyExtractor={item => item.id}
          ListFooterComponent={() => (
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: 'white',
                textAlign: 'center',
                margin: 20,
              }}>
              End
            </Text>
          )}
        />
      </View>
      {/* banner ad */}
      <BannerAd placement_id={globalVariables.BannerAdId} />
    </View>
  );
};

export default HowToUse;

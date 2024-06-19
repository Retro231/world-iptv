import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {InterstitialAdManager, NativeAdsManager} from 'react-native-fbads';
import {useNavigation} from '@react-navigation/native';
import AdComponent from '../adComponents/AdComponent';
import {globalColors, globalVariables} from '../../global';
const adsManager = new NativeAdsManager(globalVariables.NativeAdId, 2);
const SingleStreamModal = ({onClose}) => {
  const [url, setUrl] = useState('');
  const navigation = useNavigation();

  const handleUrl = value => {
    setUrl(value);
  };

  const onPlayBtnClick = () => {
    if (url.length > 0) navigation.navigate('Player', {streamUrl: url});
  };

  useEffect(() => {
    console.log(url);
  }, [url]);

  // ads
  useEffect(() => {
    // Interstitial Ad
    InterstitialAdManager.showAd(globalVariables.InterstitialAdId)
      .then(didClick => {})
      .catch(error => {
        console.log('err', error);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Pressable
          style={{
            alignItems: 'center',
            borderWidth: 1,
            backgroundColor: globalColors.primaryBackground,
            borderColor: globalColors.primaryBackground,
          }}
          onPress={onClose}>
          <Text style={{fontSize: 24, color: globalColors.primaryText}}>X</Text>
        </Pressable>
        <View style={styles.centeredView}>
          <Text style={styles.title}>Play Single Stream</Text>
          <View style={styles.textInput}>
            <Text style={styles.label}>Channel Name</Text>
            <TextInput style={styles.inputField}></TextInput>
          </View>
          <View style={styles.textInput}>
            <Text style={styles.label}>Channel Url</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={handleUrl}></TextInput>
          </View>
        </View>
        <View style={styles.actionBtn}>
          <Icon.Button
            name="play-circle"
            backgroundColor={globalColors.primaryBackground}
            iconStyle={{marginRight: 0}}
            onPress={onPlayBtnClick}>
            <Text
              style={{
                fontFamily: 'Arial',
                fontSize: 15,
                color: globalColors.primaryText,
                fontWeight: 'bold',
                paddingHorizontal: 10,
              }}>
              Play
            </Text>
          </Icon.Button>
        </View>
        <View style={{justifyContent: 'center', margin: 10, marginTop: 20}}>
          <AdComponent adsManager={adsManager} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingleStreamModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.primaryText,
  },
  centeredView: {
    padding: 25,
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: globalColors.primaryBackground,
  },
  textInput: {
    gap: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: globalColors.secondaryText,
  },
  inputField: {
    borderWidth: 1,
    borderColor: globalColors.primaryBackground,
    borderRadius: 5,
    color: globalColors.secondaryText,
  },
  actionBtn: {
    paddingHorizontal: 25,
    gap: 5,
    alignItems: 'center',
  },
});

import {Text, View} from 'react-native';
import React from 'react';
import {globalColors} from '../global';

const InternetInfo = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalColors.primaryBackground,
      }}>
      <Text
        style={{
          fontSize: 24,
          color: globalColors.primaryText,
          fontWeight: 'bold',
        }}>
        No Internet Connection!!
      </Text>
      <Text style={{fontSize: 18, color: globalColors.primaryText}}>
        Please check you internet connection.
      </Text>
    </View>
  );
};

export default InternetInfo;

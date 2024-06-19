import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useContext} from 'react';
import {
  Alert,
  BackHandler,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ChannelsContext} from '../Context/ChannelsContext';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {globalColors, globalURLs, globalVariables} from '../global';
import {ShowAppContext} from '../Context/ShowAppCondex';

function MyCustomDrawer(props) {
  const {data, setData} = useContext(ChannelsContext);
  const {showMainContent, setShowMainContent} = useContext(ShowAppContext);

  const navigation = useNavigation();

  const exitApp = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
  };

  const handleReset = async () => {
    await AsyncStorage.clear();
    setData(null);
    setShowMainContent(false);
    navigation.navigate('Home');
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  const redirectToGmail = receiverEmail => {
    const gmailURL = `mailto:${receiverEmail}`;

    Linking.canOpenURL(gmailURL)
      .then(supported => {
        if (supported) {
          Linking.openURL(gmailURL);
        } else {
          // Fallback to web URL
          Linking.openURL(
            `https://mail.google.com/mail/?view=cm&fs=1&to=${receiverEmail}`,
          );
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const handleRateUs = () => {
    const URL = globalURLs.RateUsUrl;

    Linking.canOpenURL(URL)
      .then(supported => {
        if (supported) {
          Linking.openURL(URL);
        } else {
          // Fallback to web URL
          Linking.openURL(globalURLs.RateUsUrl);
        }
      })
      .catch(err => console.error('An error occurred', err));
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          padding: 15,
          backgroundColor: globalColors.primaryBackground,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: globalColors.primaryText,
            textTransform: 'uppercase',
          }}>
          {globalVariables.Title}
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Email Us"
          labelStyle={{marginLeft: -25}}
          onPress={() => redirectToGmail(globalVariables.Email)}
          icon={({color}) => <Icon name="email" size={24} color={color} />}
        />
        <DrawerItem
          label="Rate Us"
          labelStyle={{marginLeft: -25}}
          onPress={handleRateUs}
          icon={({color}) => <Icon name="star-rate" size={24} color={color} />}
        />
      </DrawerContentScrollView>
      <View style={{padding: 13}}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            gap: 10,
          }}
          onPress={handleReset}>
          <Icon name="reset-tv" size={24} color={'gray'} />
          <Text style={{fontWeight: 'bold', color: 'gray'}}>Reset App</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            gap: 10,
          }}
          onPress={exitApp}>
          <Icon name="exit-to-app" size={24} color={'#ff4f4f'} />
          <Text style={{fontWeight: 'bold', color: '#ff4f4f'}}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default MyCustomDrawer;

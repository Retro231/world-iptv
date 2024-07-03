import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useEffect} from 'react';
import getCountryList from '../helper/getCountryList';
import {globalColors} from '../global';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ChannelsContext} from '../Context/ChannelsContext';
import {SearchContext} from '../Context/SearchContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChannelCard from '../components/ChannelCard';
import Snackbar from 'react-native-snackbar';
import updateChannels from '../helper/updateChannels';

// {
//   "name": "Afghanistan",
//   "code": "AF",
//   "languages": [
//     "prs",
//     "pus",
//     "tuk"
//   ],
//   "flag": "🇦🇫"
// },
const headItem = [
  {
    id: 1,
    name: 'All Countries',
    iconName: 'playlist-play',
    iconSize: 22,
  },
  {
    id: 2,
    name: 'Favourite',
    iconName: 'favorite',
    iconSize: 20,
  },
];
const CountryListScreen = ({onCountrySelect}) => {
  const {data, setData} = useContext(ChannelsContext);
  const {searchValue, setSearchValue} = useContext(SearchContext);
  const [active, setActive] = useState(1);
  const [countries, setCounties] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [favChannels, setFavChannels] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const getList = async () => {
    setLoading(true);
    const list = await getCountryList();
    setCounties(list);
    setSearchedCountries(list);
    setLoading(false);
  };
  useEffect(() => {
    getList();
    setData([]);
  }, []);

  const getStoredFavChannels = async () => {
    const jsonValue = await AsyncStorage.getItem('favourite');
    let storedFavChannels = jsonValue !== null ? JSON.parse(jsonValue) : [];

    setFavChannels(storedFavChannels);
  };

  useEffect(() => {
    getStoredFavChannels();
  }, [active]);

  // activate when user click on fav icon.
  const handleFavourite = async item => {
    //set favourite property to the item,,
    const {favouriteChannels} = await updateChannels(data, item);
    setFavChannels(favouriteChannels);

    let exists = favChannels.filter(element => element.tvgId === item.tvgId);
    if (exists.length === 0) {
      Snackbar.show({
        text: 'Saved to favorite.',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      Snackbar.show({
        text: 'Removed to favorite.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const saveFavourite = async data => {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('favourite', jsonValue);
  };

  useEffect(() => {
    saveFavourite(favChannels);
  }, [favChannels]);

  const handleSearch = async () => {
    if (searchValue !== '') {
      const filteredData = countries.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setSearchedCountries(filteredData);
    } else {
      setSearchedCountries(countries);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  const handlePress = id => {
    setActive(id);
  };

  const handleRefresh = () => {
    setRefresh(true);
    getList();
    setData([]);
    setRefresh(false);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.categorayHead}>
        {headItem.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(item.id)}
            style={[
              styles.headItem,
              {
                backgroundColor:
                  active === item.id
                    ? globalColors.secondaryBackground
                    : globalColors.primaryBackground,
              },
            ]}>
            <Icon
              name={item.iconName}
              size={item.iconSize}
              color={active === item.id ? '#fff' : globalColors.primaryText}
            />
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: active === item.id ? '#fff' : globalColors.primaryText,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        {searchedCountries?.length > 0 && !loading && (
          <FlatList
            data={active === 1 ? searchedCountries : favChannels}
            numColumns={2}
            horizontal={false}
            renderItem={({item}) =>
              active === 1 ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => onCountrySelect(item)}
                  style={styles.card}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      margin: 10,
                      padding: 3,
                      gap: 4,
                    }}>
                    <View style={{width: '90%', gap: 10, flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: globalColors.primaryText,
                          textAlign: 'left',
                        }}>
                        {item.flag}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontWeight: 'bold',
                          color: globalColors.primaryText,
                          textAlign: 'left',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <ChannelCard data={item} handleFavourite={handleFavourite} />
              )
            }
            keyExtractor={(item, index) => index}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
            }
          />
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
      </View>
    </View>
  );
};

export default CountryListScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: globalColors.primaryBackground,
    margin: 2,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1.5,

    width: Dimensions.get('screen').width / 2 - 6,
  },
  categorayHead: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    // borderTopWidth: 2,
    // borderTopColor: globalColors.secondaryBackground,
    borderBottomWidth: 3,
    borderBottomColor: globalColors.secondaryBackground,
  },
  headItem: {
    backgroundColor: 'gray',
    width: Dimensions.get('window').width / headItem.length,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    alignItems: 'center',
  },
});

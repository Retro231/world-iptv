import {createStackNavigator} from '@react-navigation/stack';
import GooglePageScreen from '../screens/GooglePageScreen';
import CategoryDetailsScreen from '../screens/CategoryDetailsScreen';
import Player from '../components/player/Player';
import CardWebView from '../components/cardwebview/CardWebView';
import MyDrawer from '../Drawer/MyDrawer';
import CountryListScreen from '../screens/CountryListScreen';

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen name="GooglePageScreen" component={GooglePageScreen} />
      <Stack.Screen name="CountryListScreen" component={CountryListScreen} />
      <Stack.Screen
        name="CategoryDetailsScreen"
        component={CategoryDetailsScreen}
      />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="CardWebView" component={CardWebView} />
    </Stack.Navigator>
  );
}

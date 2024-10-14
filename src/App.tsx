
//PACKAGES
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

//SCREENS
import LoginScreen from './LoginScreen';
import Content from './Content';
import { ConscentWebView, StorageKeys, conscentLogger } from 'csc-react-native-sdk';

export default function App() {
  const Stack = createStackNavigator();
  AsyncStorage.setItem(StorageKeys.ClientId, '66cdad650aa6d0b6dda7b47e')
  AsyncStorage.setItem(StorageKeys.ApiEnv, 'SANDBOX')

  // Configure the logger
  conscentLogger.configure({
    enableLog: true,
    enableAllLog: true,
    enableError: true,
    enableWarn: true, // Disable warnings
    logEnvironment: 'development',
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Content" component={Content} />
        <Stack.Screen
          name="ConscentWebView"
          component={ConscentWebView}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

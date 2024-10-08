import { useEffect, useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

//PACKAGES
import SelectDropdown from 'react-native-select-dropdown';
import { appleSignIn, googleSignIn, login, logOut, openUserProfile } from 'csc-react-native-sdk-test';
import { EventRegister } from "react-native-event-listeners";
import Toast from 'react-native-toast-message';

export default function LoginScreen(props: any) {
  const [clientId, setClientId] = useState<string>('661907c2487ae1aba956dcc4');
  const [contentId, setContentId] = useState<string>('Client-Story-Id-1');
  const [mode, setMode] = useState<string>('SANDBOX');
  const environment = ['STAGING', 'SANDBOX', 'LIVE'];
  const fontFamily = ['PlayfairDisplay-Regular',
    'Poppins-Regular', 'OpenSans-Regular',
    'Laila-Regular', 'Arima-Regular',
    'Eczar-Regular', 'Faustina-Regular',
    'HindMadurai-Regular', 'Montserrat-Regular',
    'NotoSans-Regular', 'NotoSansTamil-Regular',
  ];
  const [getFontFamily, setFontFamily] = useState<string>('PlayfairDisplay-Regular');
  // 784024490654-r5htgk5oletn228deq8fh6s85hsdn0pg.apps.googleusercontent.com  Android
  useEffect(() => {
    if (props?.route?.params) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      console.log('props?.route?.params?.message', props?.route?.params?.CONSCENT_MESSAGE);
    }
  }, [props?.route?.params]);

  useEffect(() => {
    const CONSCENT_MESSAGE_LISTENER = EventRegister.addEventListener(
      "CONSCENT_MESSAGE",
      (data) => {
        console.log('LoginScreen CONSCENT_MESSAGE', data);
      }
    );
    const CONSCENT_SUCCESS_LISTENER = EventRegister.addEventListener(
      "CONSCENT_SUCCESS",
      (data) => {

        Toast.show({
          type: 'success',
          text1: `SUCCESS`,
          text2: `${data?.message}`,
        });
        console.log('LoginScreen CONSCENT_SUCCESS', data);
      }
    );
    const CONSCENT_FAILURE_LISTENER = EventRegister.addEventListener(
      "CONSCENT_FAILURE",
      (data) => {

        Toast.show({
          type: 'error',
          text1: `FAILURE`,
          text2: `${data?.message}`,
        });
        console.log('LoginScreen CONSCENT_FAILURE', data);
      }
    );
    return () => {
      if (typeof CONSCENT_MESSAGE_LISTENER === 'string') {
        EventRegister.removeEventListener(CONSCENT_MESSAGE_LISTENER);
      }
      if (typeof CONSCENT_SUCCESS_LISTENER === 'string') {
        EventRegister.removeEventListener(CONSCENT_SUCCESS_LISTENER);
      }
      if (typeof CONSCENT_FAILURE_LISTENER === 'string') {
        EventRegister.removeEventListener(CONSCENT_FAILURE_LISTENER);
      }
    };
  });

  return (
    <SafeAreaView style={styles.container}>


      <ScrollView style={styles.scrollView}>

        <Image style={styles.logo} source={require('../assets/conscent.png')} />
        <Toast
          position='top'
          bottomOffset={20}
        />
        <Text style={styles.title}>Welcome to demo</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={clientId}
            placeholder="Enter your clientId"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setClientId(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={contentId}
            placeholder="Enter your contentId"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setContentId(text)}
          />
        </View>
        <SelectDropdown
          data={environment}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
          onSelect={(item) => {
            setMode(item);
          }}
          buttonTextAfterSelection={(selectedItem: any) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          defaultButtonText="SANDBOX"
          rowTextForSelection={(item: any) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />

        <SelectDropdown
          data={fontFamily}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
          onSelect={(item) => {
            setFontFamily(item);
          }}
          buttonTextAfterSelection={(selectedItem: any) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          defaultButtonText="PlayfairDisplay-Regular"
          rowTextForSelection={(item: any) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Content', {
              contentId: contentId,
              clientId: clientId,
              mode: mode,
              fontFamily: getFontFamily
            });
          }}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Show Content </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await login('LoginScreen', props.navigation)
          }}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Log In </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await openUserProfile('LoginScreen', props.navigation,)
          }}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>User Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await logOut('LoginScreen', props?.navigation)
          }}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Log Out </Text>

        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex: 1,
    // marginHorizontal: 20,
    width: '100%',
  },
  logo: {
    // margin: 30,
    alignSelf: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 30,
    color: 'black',
    marginBottom: 40,
    margin: 10,
    alignSelf: 'center'
  },
  inputView: {
    width: '80%',
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    // margin: 10,
    alignSelf: 'center'
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  forgotAndSignUpText: {
    color: 'black',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#0164B1',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    alignSelf: 'center'
  },
  loginText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'PlayfairDisplay-Regular',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveAreaViewContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  viewContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },
  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    margin: 10,
    alignSelf: 'center'
  },
  dropdown1BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {
    backgroundColor: '#444',
    borderBottomColor: '#C5C5C5',
  },
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown3BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
  },
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {
    backgroundColor: 'slategray',
  },
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
  },
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown4BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown4BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdown4DropdownStyle: {
    backgroundColor: '#EFEFEF',
  },
  dropdown4RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown4RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
});

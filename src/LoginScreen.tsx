import { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

//PACKAGES
import SelectDropdown from 'react-native-select-dropdown';
import { logOut, login } from 'csc-react-native-sdk';

export default function LoginScreen(props: any) {
  const [clientId, setClientId] = useState<string>('661907c2487ae1aba956dcc4');
  const [contentId, setContentId] = useState<string>('Client-Story-Id-1');
  const [mode, setMode] = useState<string>('SANDBOX');
  const environment = ['STAGING', 'SANDBOX', 'LIVE'];

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image style={styles.logo} source={require('../assets/conscent.png')} />
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

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Content', {
            contentId: contentId,
            clientId: clientId,
            mode: mode,
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
          await logOut('LoginScreen', props?.navigation, mode)
          // Alert.alert(res?.data?.message);
        }}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Log Out </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
  },
  logo: {
    margin: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
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
  },
  loginText: {
    fontSize: 16,
    color: 'white',
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

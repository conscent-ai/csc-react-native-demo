// import { getEnvDetails, getLoginChallengeId, getServiceEnvDetails, validateLoginChallenge, isLogin } from 'csc-react-native-sdk';
// import base64 from 'react-native-base64';

import { isLogin } from 'csc-react-native-sdk';

// export const genrateTempToken = async (email: string, mode: any) => {
//     // let base64 = require("base-64"); // install it before use from npm i base-64

//     const username = "J1EFAQR-H0N4921-QCXKVNH-6W9ZYY9";
//     const password = "CFR472795Q42TTQJFV84M37A5G4SJ1EFAQRH0N4921QCXKVNH6W9ZYY9";

//     //function for Fetching data from API
//     const API_BASE_URL = getEnvDetails(mode);
//     const url = `${API_BASE_URL}/client/generate-temp-token`
//     const raw = JSON.stringify({
//         "email": email
//     });
//     console.log(raw);
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 Authorization: "Basic " + base64.encode(username + ":" + password) as any,
//             },
//             body: raw,
//         });
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error(error);
//     }

// }

// export const autoLoginView = async (tempToken: string, clientId: string, email: string, phoneNumber: string, currentStackName: string, navigation: string, mode: any) => {
//     let FRONT_END_BASE_URL = getServiceEnvDetails(mode);
//     const API_BASE_URL = getEnvDetails(mode);
//     const loginChallengeId = await getLoginChallengeId(API_BASE_URL);
//     const encodeEmail = base64.encode(email)
//     try {

//         const REDIRECT_URL = `${FRONT_END_BASE_URL}/auto-login-user?id=${tempToken}&clientId=${clientId}&phone=${phoneNumber}&email=${encodeEmail}&loginChallengeId=${loginChallengeId}`

//         navigation.navigate('ConscentWebView', {
//             REDIRECT_URL: REDIRECT_URL,
//             currentStackName: currentStackName,
//             mode
//         });

//     } catch (error) {
//         console.log(error);

//     }

// }

export const checkLogin = async () => {
  const res = await isLogin();
  console.log('checkLogin =========>>>>>', res);
};

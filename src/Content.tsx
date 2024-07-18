import React, { useRef, useState } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';

//PACKAGES
import { useFocusEffect } from '@react-navigation/native';
import {
    pageExist,
    getEventsEnvDetails,
    onTouchListener,
    PopUp,
    PayWall,
    loginWithOneTap,
} from 'csc-react-native-sdk';
import { checkLogin } from './api';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    iosClientId: '784024490654-8k1g0kunb509qsbae5c1fndjs51j4c78.apps.googleusercontent.com',
    webClientId: '784024490654-r5htgk5oletn228deq8fh6s85hsdn0pg.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true,
    forceCodeForRefreshToken: true,
})

export default function Content(props: any) {
    const paywallRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const [showPaywall, setShowPaywall] = useState<boolean>(true);
    const [showContent, setShowContent] = useState(false);
    const { contentId, clientId, mode } = props?.route?.params;


    const signIn = async () => {
        try {
            const res = await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            console.log(res);

            console.warn(userInfo.idToken);

            if (userInfo.idToken) {
                await loginWithOneTap('Content', props.navigation, userInfo.idToken)
            }

        } catch (error: any) {
            console.log('got error: ', error.message);

        }
    };


    const text = [
        'Where does it come from?\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    ];
    const premiumContent = ['Content Unlock \n Read premium content'];

    const conscentMessage = (message: string) => {
        if (message == 'GoogleLoginClick') {
            console.log('GoogleLoginClick');

            signIn();
        }
    };


    useFocusEffect(
        React.useCallback(() => {
            checkLogin();
            setShowPaywall(true);
            return () => {
                removePage();
            };
        }, [])
    );

    async function removePage() {
        const res = await pageExist(
            getEventsEnvDetails(mode),
            clientId,
            contentId,
            scrollY
        );
        console.log('Respones====>', JSON.stringify(res));
    }

    const goBack = () => {
        props.navigation.goBack();
    };

    async function onStatusChange(result: any) {
        if (result?.successMessage == 'METERBANNER') {
            setShowPaywall(true);
            setShowContent(true);
        } else if (result?.successMessage == 'PAYWALL') {
            setShowPaywall(true);
            setShowContent(false);
        } else if (result?.successMessage == 'UNLOCK') {
            setShowPaywall(false);
            setShowContent(true);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                onScroll={(e) => {
                    setScrollY(e.nativeEvent.contentOffset.y);
                    onTouchListener();
                }}
            >
                {showContent ? (
                    <Text>
                        {premiumContent[0] +
                            '\n\n' +
                            text[0] +
                            '\n\n' +
                            text[0] +
                            '\n\n' +
                            text[0] +
                            '\n\n' +
                            text[0] +
                            '\n\n' +
                            text[0] +
                            '\n\n' +
                            text[0] +
                            '\n\n' +
                            text[0] +
                            '\n\n' +
                            text[0] +
                            '\n\n' +
                            text[0] +
                            '\n\n' +
                            text[0]}
                    </Text>
                ) : (
                    <Text>{text[0] + '\n\n' + text[0] + '\n\n' + text[0]}</Text>
                )}
            </ScrollView>

            {showPaywall && (
                <PayWall
                    ref={paywallRef}
                    clientId={clientId}
                    contentId={contentId}
                    environment={mode}
                    fontFamily={'PlayfairDisplay-Regular'}
                    userAgent={
                        'Dalvik/2.1.0 (Linux; U; Android 12; RMX2121 Build/SP1A.210812.016'
                    }
                    conscentMessage={conscentMessage}
                    onPaywallStatus={(result: any) => {
                        onStatusChange(result);
                    }}
                    onErrorMessage={(error: string) => {
                        console.log('Error', error);
                    }}
                    currentStackName={'Content'}
                    navigation={props?.navigation}
                    scrollY={scrollY}
                    goBack={() => {
                        goBack();
                    }}
                />
            )}
            <PopUp
                environment={mode}
                currentStackName={'Content'}
                navigation={props?.navigation}
                scrollY={scrollY}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

import React, { useEffect, useRef, useState } from 'react';

import {
    Alert,
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
    PopUp,
    PayWall,
} from 'csc-react-native-sdk';
import { EventRegister } from 'react-native-event-listeners';
import Toast from 'react-native-toast-message';
import DeviceInfo from 'react-native-device-info';

export default function Content(props: any) {
    const paywallRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const { contentId, clientId, mode } = props?.route?.params;
    const [userAgent, setUserAgent] = useState('')

    useEffect(() => {
        const loadData = async () => {
            const userAgent1 = await DeviceInfo.getUserAgent();
            console.log(userAgent1);

            setUserAgent(userAgent1)
        };
        loadData();
    }, [])

    const text = [
        'Where does it come from?\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    ];
    const premiumContent = ['Content Unlock \n Read premium content'];

    const goBack = () => {
        props?.navigation.goBack();
    }

    useFocusEffect(
        React.useCallback(() => {
            const CONSCENT_MESSAGE_LISTENER = EventRegister.addEventListener(
                "CONSCENT_MESSAGE",
                (data) => {
                    Toast.show({
                        type: 'success',
                        text1: `MESSAGE`,
                        text2: `${data}`,
                    });
                    console.log('Content CONSCENT_MESSAGE', data);
                }
            );
            const CONSCENT_SUCCESS_LISTENER = EventRegister.addEventListener(
                "CONSCENT_SUCCESS",
                (data) => {
                    if (data?.message === 'UNLOCK') {
                        setShowContent(true);
                    }
                    Toast.show({
                        type: 'success',
                        text1: `SUCCESS`,
                        text2: `${data?.message} ${data?.message?.accessType}`,
                    });
                    console.log('Content CONSCENT_SUCCESS', data);
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
                    console.warn('Content CONSCENT_FAILURE', data);
                }
            );
            return () => {
                removePage();
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
        }, [])
    );

    async function removePage() {
        await pageExist(
            getEventsEnvDetails(mode),
            clientId,
            contentId,
            scrollY
        );
    }

    return (

        <SafeAreaView style={styles.container}>

            <ScrollView
                onScroll={(e) => {
                    setScrollY(e.nativeEvent.contentOffset.y);
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
            <Toast
                position='top'
                bottomOffset={20}
            />
            {userAgent && (
                <PayWall
                    ref={paywallRef}
                    clientId={clientId}
                    contentId={contentId}
                    environment={mode}
                    fontFamily={'PlayfairDisplay-Regular'}
                    userAgent={userAgent}
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

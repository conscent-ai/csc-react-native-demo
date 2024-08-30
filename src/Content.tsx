import React, { useEffect, useRef, useState } from 'react';

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
    PopUp,
    PayWall,
} from 'csc-react-native-sdk';
import { EventRegister } from 'react-native-event-listeners';

export default function Content(props: any) {
    const paywallRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const { contentId, clientId, mode } = props?.route?.params;

    const text = [
        'Where does it come from?\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    ];
    const premiumContent = ['Content Unlock \n Read premium content'];


    const conscentMessage = async (message: string) => {
        // if (message == 'GoogleLoginClick') {
        //     console.log('GoogleLoginClick');

        //     // await loginWithOneTap('LoginScreen', props.navigation, '8765432123456787654321234567')
        // }
    };

    const goBack = () => {
        props?.navigation.goBack();
    }

    useFocusEffect(
        React.useCallback(() => {
            let CONSCENT_MESSAGE_LISTENER = EventRegister.addEventListener(
                "CONSCENT_MESSAGE" as string,
                (data) => {
                    console.log('Content CONSCENT_MESSAGE', data);
                }
            );
            let CONSCENT_SUCCESS_LISTENER = EventRegister.addEventListener(
                "CONSCENT_SUCCESS" as string,
                (data) => {
                    if (data?.message === 'UNLOCK') {
                        setShowContent(true);
                    }
                    console.log('Content CONSCENT_SUCCESS', data);
                }
            );
            let CONSCENT_FAILURE_LISTENER = EventRegister.addEventListener(
                "CONSCENT_FAILURE" as string,
                (data) => {
                    console.warn('Content CONSCENT_FAILURE', data);
                }
            );
            return () => {
                removePage();
                EventRegister.removeEventListener(CONSCENT_MESSAGE_LISTENER);
                EventRegister.removeEventListener(CONSCENT_SUCCESS_LISTENER);
                EventRegister.removeEventListener(CONSCENT_FAILURE_LISTENER);
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

            <PayWall
                ref={paywallRef}
                clientId={clientId}
                contentId={contentId}
                environment={mode}
                fontFamily={'PlayfairDisplay-Regular'}
                userAgent={
                    'Dalvik/2.1.0 (Linux; U; Android 12; RMX2121 Build/SP1A.210812.016'
                }
                currentStackName={'Content'}
                navigation={props?.navigation}
                scrollY={scrollY}
                goBack={() => {
                    goBack();
                }}
            />
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

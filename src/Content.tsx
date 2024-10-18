import React, { useRef, useState } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

//PACKAGES
import { useFocusEffect } from '@react-navigation/native';
import {
    pageExist,
    getEventsEnvDetails,
    PopUp,
    PayWall,
    MeterBanner,
} from 'csc-react-native-sdk-test';
import { EventRegister } from 'react-native-event-listeners';
import Toast from 'react-native-toast-message';

export default function Content(props: any) {
    const paywallRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const { contentId, clientId, mode, fontFamily } = props?.route?.params;

    const text = [
        'Where does it come from?\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    ];
    const premiumContent = ['Content Unlock \n Read premium content'];


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
                    Toast.show({
                        type: 'success',
                        text1: `SUCCESS`,
                        text2: `${data?.message}`,
                    });
                    if (data?.message === 'UNLOCK') {
                        setShowContent(true);
                    }
                    console.log('Content CONSCENT_SUCCESS', data);
                }
            );
            let CONSCENT_FAILURE_LISTENER = EventRegister.addEventListener(
                "CONSCENT_FAILURE" as string,
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
                <View>
                    <Text>{text[0]}</Text>
                    <Toast
                        position='top'
                        bottomOffset={20}
                    />
                    <View style={{ zIndex: 1050 }}>
                        <PayWall
                            ref={paywallRef}
                            clientId={clientId}
                            contentId={contentId}
                            title={contentId}
                            contentUrl={'https://mock-client-demo-blog-v2-sandbox.netlify.app/business/b1'}
                            authorName={'name'}
                            publicationDate={'2024-07-17T11:57:27.312Z'}
                            categories={['category1', 'category2']}
                            tags={['free', 'premium', 'metered']}
                            sections={['section1', 'section2', 'section3']}
                            apiEnv={mode}
                            fontFamily={fontFamily}
                            userAgent={
                                'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
                            }
                            currentStackName={'Content'}
                            navigation={props?.navigation}
                            scrollY={scrollY}
                            goBack={() => {
                                goBack();
                            }}
                        />
                    </View>
                    {
                        showContent ? <><Text style={{ color: 'green', fontWeight: 900 }}>{premiumContent[0]}</Text>
                            <Text>{text[0]}</Text>
                            <Text>{text[0]}</Text>
                            <Text>{text[0]}</Text></> :
                            <><Text>{text[0]}</Text></>
                    }
                </View>

            </ScrollView>

            <View>
                <MeterBanner
                    ref={paywallRef}
                    clientId={clientId}
                    contentId={contentId}
                    title={contentId}
                    contentUrl={'https://mock-client-demo-blog-v2-sandbox.netlify.app/business/b1'}
                    authorName={'name'}
                    publicationDate={'2024-07-17T11:57:27.312Z'}
                    categories={['category1', 'category2']}
                    tags={['free', 'premium', 'metered']}
                    sections={['section1', 'section2', 'section3']}
                    apiEnv={mode}
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
            </View>
            <PopUp
                apiEnv={mode}
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

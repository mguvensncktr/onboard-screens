import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Dimensions, Animated, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../assets/colors/colors';


const img1 = require('../assets/images/img1.png');
const img2 = require('../assets/images/img2.png');
const img3 = require('../assets/images/img3.png');

const data = [
    {
        title: "Discover Top Doctors",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia libero ut metus convallis tempor. Vestibulum consequat, tortor mattis consequat",
        img: img1
    },
    {
        title: "Ask a Doctor Online",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia libero ut metus convallis tempor. Vestibulum consequat, tortor mattis consequat",
        img: img2
    },
    {
        title: "Get Expert Advice",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia libero ut metus convallis tempor. Vestibulum consequat, tortor mattis consequat",
        img: img3
    },
]

const Onboarding = () => {

    const [completed, setCompleted] = useState(false);
    const scrollX = new Animated.Value(0);
    const width = Dimensions.get('window').width;

    useEffect(() => {
        scrollX.addListener(({ value }) => {
            if (Math.floor(value / width) === data.length - 1) {
                setCompleted(true)
            }
        })
        return () => scrollX.removeListener();
    }, [])

    function renderContent() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment="center"
                decelerationRate={0}
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } },
                ], { useNativeDriver: false })}
                showsHorizontalScrollIndicator={false}
            >
                {data.map((item, index) => (
                    <View
                        key={index}
                        style={{ width: Dimensions.get('window').width }}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={item.img}
                                resizeMode="contain"
                                style={{
                                    width: '100%',
                                    height: 350
                                }}
                            />
                        </View>
                        <View style={{
                            position: 'absolute',
                            bottom: '5%',
                            left: 40,
                            right: 40
                        }}
                        >
                            <Text style={{
                                fontSize: 28,
                                fontFamily: 'OpenSans-Bold',
                                color: COLORS.gray,
                                textAlign: 'center',
                            }}
                            >
                                {item.title}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'OpenSans-SemiBold',
                                    fontSize: 12,
                                    textAlign: 'center',
                                    marginTop: 5,
                                    color: COLORS.gray
                                }}
                            >
                                {item.description}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: 120,
                                height: 45,
                                paddingLeft: 20,
                                justifyContent: 'center',
                                borderTopLeftRadius: 30,
                                borderBottomLeftRadius: 30,
                                backgroundColor: COLORS.blue,
                            }}
                            onPress={() => console.log("skipped")}
                        >
                            <Text>{completed ? "Start" : "Skip"}</Text>
                        </TouchableOpacity>
                    </View>
                ))
                }
            </Animated.ScrollView >
        )
    }

    function renderDots() {
        const dotPos = Animated.divide(scrollX, width);
        return (
            <View style={styles.dotContainer}>
                {data.map((item, index) => {

                    const opacity = dotPos.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    })
                    const dotSize = dotPos.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [8, 17, 8],
                        extrapolate: "clamp"
                    })

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={[styles.dot, { width: dotSize, height: dotSize }]}
                        >

                        </Animated.View>
                    )
                })}
            </View>
        )
    }

    const [fontsLoaded] = useFonts({
        'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
        'OpenSans-SemiBold': require('../assets/fonts/OpenSans-SemiBold.ttf')
    });
    if (!fontsLoaded) {
        return null;
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>
            <View style={styles.dotsRootContainer}>
                {renderDots()}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    dot: {
        borderRadius: 15,
        backgroundColor: COLORS.blue,
        marginHorizontal: 7
    },
    dotContainer: {
        flexDirection: 'row',
        height: 12,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Onboarding;

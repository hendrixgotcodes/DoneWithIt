import { BlurView } from 'expo-blur'
import React from 'react'
import {StyleSheet, SafeAreaView, Platform, StatusBar} from  'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

//Assets
import Colors from '../../assets/_colors'

export default function DefaultScreen({children, style}){

    return(
        <SafeAreaView style={[styles.safeArea, {...style}]}>
            <BlurView intensity={100} style={styles.statusbarBlurrer} />
            {children}
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        height: "100%",
        width: "100%",
        backgroundColor: Colors.offwhite,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    statusbarBlurrer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: getStatusBarHeight(),
        zIndex: 1
    }
})
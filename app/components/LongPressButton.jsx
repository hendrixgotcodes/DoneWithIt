import React from 'react'
import { View, StyleSheet, Vibration } from 'react-native'
import * as Haptics from 'expo-haptics'
 
import {LongPressGestureHandler, State} from 'react-native-gesture-handler'

export default function LongPressButton({children, onLongPress}) {
    return (
        <LongPressGestureHandler
            onHandlerStateChange={
                ({nativeEvent})=>{
                    if (nativeEvent.state === State.ACTIVE) {
                        try {
                            Haptics.selectionAsync()
                        } catch (error) {
                            
                        }
                        onLongPress()
                    }
                }
            }
            minDurationMs={800}
        >
            {children}
        </LongPressGestureHandler>
    )
}
 
const styles = StyleSheet.create({
    container: {
 
    }
})
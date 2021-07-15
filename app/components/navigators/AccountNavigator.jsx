import React from 'react'
import { View, StyleSheet } from 'react-native'

//Components
import {createStackNavigator} from '@react-navigation/stack'
import ListingsScreen from '../Screens/ListingsScreen'
import MessagesScreen from '../Screens/MessagesScreen'
import MyAccountScreen from '../Screens/MyAccountScreen'

//Fields
const Stack = createStackNavigator()
 
export default function FeedNavigator() {
    return (
        <Stack.Navigator>

            <Stack.Screen 
                component={MyAccountScreen}
                name="My Account" 
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen 
                name="My Listings" 
                component={ListingsScreen} 
            />

            <Stack.Screen 
                name="Messages" 
                component={MessagesScreen} 
            />

        </Stack.Navigator>
    )
}
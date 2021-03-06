import React from 'react'
import { View, StyleSheet } from 'react-native'

//Components
import {createStackNavigator} from '@react-navigation/stack'
import ListingsScreen from '../Screens/ListingsScreen'
import ListingDetailsScreen from '../Screens/ListingDetailsScreen'
// import ListingDetailNavigator from './ListingDetailNavigator'
// import MessageNavigator from './MessageNavigator'

//Fields
const Stack = createStackNavigator()
import routes from './routes'
import SearchScreen from '../Screens/SearchScreen'



 
export default function FeedNavigator() {
    return (
        <Stack.Navigator 
            // mode="modal"
            screenOptions={{
                headerShown: false
            }}
        >

            <Stack.Screen mode="modal" name="Listings" component={ListingsScreen} />

            <Stack.Screen 
                mode="modal"
                name={routes.LISTING_DETAILS} 
                component={ListingDetailsScreen} 
            />

            <Stack.Screen 
                mode="modal"
                name="search" 
                component={SearchScreen} 
            />

            {/* <Stack.Screen 
                mode="card" 
                name="Messages" 
                component={MessageNavigator} 
                // options={({route})=>}
            /> */}

        </Stack.Navigator>
    )
}
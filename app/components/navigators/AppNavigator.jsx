import React, {useState} from 'react'
import { StyleSheet, Platform } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'


//Components
import AccountNavigator from './AccountNavigator'
import FeedNavigator from './FeedNavigator'
import ListingEditScreen from '../Screens/ListingEditScreen'
import NewListingButton from './NewListingButton'


//Assets
import Colors from '../../assets/_colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import useNotifications from '../../hooks/useNotifications'
import FavoritesScreen from '../Screens/FavoritesScreen'
import MessageNavigator from './MessageNavigator'


//Variable
const Tab = createBottomTabNavigator()


const getTabBarVisibility = (route)=>{
    
    const routeName = getFocusedRouteNameFromRoute(route)

    return (routeName === "chat" || routeName === "Listing Details") ? false : true
    

}
 
export default function AppNavigator({routes}) {

    const [tabBarVisible, setTabBarVisbile] = useState(true)
    
    const TabBarVisbilityContext = React.createContext([tabBarVisible, setTabBarVisbile])

    const FeedNavigatorContexted = ()=>{
        <TabBarVisbilityContext.Provider>
            <FeedNavigator />
        </TabBarVisbilityContext.Provider>
    }


    useNotifications()

    return (
        <Tab.Navigator
            tabBarOptions = {{
                labelStyle: {
                    fontSize: 12,
                },
                style:{
                    // height: "9%"
                    justifyContent: "center",
                    alignItems: "center"
                },
                allowFontScaling: true
            }}
        >
            <Tab.Screen 
                component={FeedNavigator}
                name="Feed" 
                options = {({route})=>({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarIcon: ({color, size})=> <MaterialCommunityIcons name="home-outline" color={color} size={size} />,
                    tabBarBadge: true,
                    tabBarBadgeStyle: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        backgroundColor: Colors.secondary
                    },
                    tabBarBadgeSize: 1
                })}

            />

            <Tab.Screen 
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({color, size})=> <MaterialCommunityIcons name="thumb-up-outline" color={color} size={size} />
                }}
            />

            <Tab.Screen 
                name="listingEdit" 
                component={ListingEditScreen}
                options = {({navigation})=>(
                    {
                       tabBarButton: ()=><NewListingButton onPress={()=>navigation.navigate("listingEdit")} />,
                    }
                )}
            />

            <Tab.Screen 
                name="Messages"
                component={MessageNavigator}
                options={({route})=>({
                    tabBarIcon: ({color, size})=> <MaterialCommunityIcons name="email-outline" color={color} size={size} />,
                    tabBarBadge: "99+",
                    tabBarBadgeStyle: {
                        color: Colors.plain,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        backgroundColor: Colors.secondary,
                        paddingTop: Platform.OS === "ios" ? 1.3 : 0
                    },
                    tabBarVisible: getTabBarVisibility(route)
                })}
            />

            <Tab.Screen 
                name="Account" 
                component={AccountNavigator}
                options = {{
                    tabBarIcon: ({color, size})=> <MaterialCommunityIcons name="account-outline" color={color} size={size} />
                }}
            />
            

        </Tab.Navigator>
    )
}
 
const styles = StyleSheet.create({
    container: {
 
    }
})
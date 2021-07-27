import React from 'react'
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, SafeAreaView, StatusBar, View, ScrollView} from 'react-native'
import {Image} from 'react-native-expo-image-cache'
import {useNavigation} from '@react-navigation/native'

//Components
import AppText from '../AppText'
import {AppForm, AppFormField, SubmitButton} from '../forms'
import Card from '../Card'
import ListItem from '../ListItem'
import SafeAreaScreen from './SafeAreaScreen'

//Assets
import Colors from '../../assets/_colors'
import messagesApi from '../../api/messages'
import * as Yup from 'yup'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AppSocialBar from '../AppSocialBar'
import MapView from 'react-native-maps'
import AppUserItem from '../AppUserItem'

//Constants
const validationSchema = Yup.object().shape({
    message: Yup.string().required().label("Message"),
})


export default function ListingDetailScren({route}){

    const listing = route.params

    console.log(listing);

    const navigation = useNavigation()

    const handleSubmit= async ({message}, resetForm)=>{

        Keyboard.dismiss()

        const result = await messagesApi.send(message, listing.id)

        if(!result.ok){
            console.log(result);
            return
        }

        resetForm()

    }

    const handleOnMessage = ()=>{
        navigation.navigate("Messages")
    }


    return(

        // <SafeAreaScreen>

            <KeyboardAvoidingView
                behavior="position"
                keyboardVericalOffset={Platform.OS === "ios" ? 30 : 0 }
            >
                <View style={styles.cardContainer}>
                    {/* <Image style={styles.cardImage} source={{uri: item.images[0].url}} /> */}
                    <Image preview={{uri:listing.item.images[0].thumbnailUrl}} tint="light" style={styles.cardImage} uri={listing.item.images[0].url} />
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View style={styles.captionsWrapper}>
                            <AppText style={styles.header} numberOfLines={2}>{listing.item.title}</AppText>
                            <AppText numberOfLines={1}
                                style={{color: Colors.secondary, fontWeight: "bold"}}
                            >
                                ₵{listing.item.price}
                            </AppText>
                        </View>
                        <View style={styles.limited}>
                            <AppText style={styles.limited_text}>Limited</AppText>
                        </View>
                    </View>

                </View>

                <AppUserItem 
                    title="Leeford Appiah Marfo"
                    subTitle={listing.user.totalListings + ' Listings'}
                    image={listing.user.img}
                    // showChevron
                    style={{marginTop: 1}}
                />
                <View>
                    <AppSocialBar handleOnMessage={handleOnMessage} />
                </View>

                <ScrollView
                    style={{padding: 10}}
                >
                    <AppText style={{color: Colors.medium, fontSize: 16}}>
                        {listing.item.description}
                    </AppText>
                </ScrollView>

                {/* <View style={styles.inputView}>

                    <AppForm
                        initialValues={{message: ""}}
                        onSubmit={(values, resetForm)=>handleSubmit(values, resetForm)}
                        validationSchema={validationSchema}
                    >
                        <AppFormField
                            autoCorrect={true}
                            icon="send"
                            name="message"
                            placeholder="Message..."
                        />
                        <SubmitButton
                            title="contact seller" 
                        />
                    </AppForm>

                </View> */}

            </KeyboardAvoidingView>
            
        // {/* </SafeAreaScreen> */}

    )

}

const styles = StyleSheet.create({

    cardContainer: {
        backgroundColor: Colors.plain,
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden"
    },
    cardImage:{
        width: "100%",
        height: 410,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    captionsWrapper: {
        display: "flex",
        flexDirection: "column",
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    favoriteButon:{
        alignItems: "center",
        position: "absolute",
        right: 15,
        top: 40,
        zIndex: 1,
        width: 30,
        height: 30,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 100,
        justifyContent: "center",
    },
    inputView: {
        marginTop: 30,
        paddingHorizontal: 10
    },
    header:{
        fontWeight: "bold", 
        fontSize: Platform.OS === "android" ? 30 : 30
    },
    limited:{
        alignSelf: "center",
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        marginRight: 10,
        paddingHorizontal: 5,
        height: 24,
    },
    limited_text:{
        color: Colors.primary,
        fontSize: 14,
        margin: 0
    }

})
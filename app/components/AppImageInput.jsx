import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Pressable, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

//Assets
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Colors from '../assets/_colors'

const requestPermission = ()=>{

    ImagePicker.requestMediaLibraryPermissionsAsync()
    .then(({status})=>{
        if(status !== 'granted'){
            alert("Sorry, we need camera roll permissions to make this work!")
        }
    })

}

const openMediaLibrary = (onChangeImage)=>{


    ImagePicker.getMediaLibraryPermissionsAsync()
    .then((result)=>{

        if(result.status === "granted"){

            try {
                ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Image,
                    aspect: [4, 3],
                    quality: 1,
                })
                .then((result)=>{

                    if(!result.cancelled){
                        onChangeImage(result.uri)
                    }

                })
            } catch (error) {
                alert("It appears we can't access your media library at the moment. Please try again")
            }    
            
        }
        else{
            requestPermission()
        }

    })

    
}
 
export default function test({imageUri="", onChangeImage}) {

    const {isPermissonGranted, setPermissionGranted} = useState(false)

    useEffect(()=>{
        requestPermission()
    }, [])


    return (
        <Pressable onPress={()=>(openMediaLibrary(onChangeImage))}>
            <View style={styles.container}>
                <MaterialCommunityIcons size={34} name="camera" color={Colors.medium} />
            </View>
        </Pressable>
    )
}
 
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.plain,
        width: 70,
        height: 70,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    }
})
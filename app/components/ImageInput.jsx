import React, {useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

//Assets
import Colors from '../assets/_colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'


const requestPermission = ()=>{

    ImagePicker.requestMediaLibraryPermissionsAsync()
    .then(({status})=>{
        if(status !== 'granted'){
            alert("Sorry, we need camera roll permissions to make this work!")
        }
    })

}


 
export default function ImageInput({onChangeImage, onAddImage, style}) {

    useEffect(()=>{
        requestPermission()
    }, [])

    const openMediaLibrary = (onAddImage)=>{


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
                            onAddImage(result.uri)
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

    return (
        <TouchableOpacity onPress={()=>(openMediaLibrary(onAddImage))}>
            <View style={[styles.container, {...style}]}>
                <MaterialCommunityIcons size={34} name="camera" color={Colors.medium} />
            </View>
        </TouchableOpacity>
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
    },
})
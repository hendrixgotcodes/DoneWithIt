import React, {useState} from 'react'
import {View, StyleSheet, Image, TextInput} from 'react-native'

//Components
import AppText from '../AppText'
import SafeAreaScreen from './SafeAreaScreen'
import {AppForm, ErrorMessage, AppFormField, SubmitButtonLoading} from '../forms'


//Assets
import AuthContext from '../../auth/context'
import authStorage from '../../auth/storage'
import useAuth from '../../auth/useAuth'
const logo = require("../../assets/logo-red.png")

//Extra
import authApi from '../../api/auth'
import * as Yup from 'yup'

//Variables
const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(5).label("Password")
})



export default function LoginScreen(){

    const [hasLoginFailed, setHasLoginFailed] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false) 

    const {logIn} = useAuth()

    const handleSubmit = async ({email, password})=>{


        setIsLoading(true)

        try {
            const user  =  await authApi.login(email, password)
            logIn(user)
        } catch (error) {
            setHasLoginFailed(true)
            setErrorMessage(error.message)
            // console.log(error);
        }

        setIsLoading(false)

    }

    return(
        <SafeAreaScreen>
        
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />

                {hasLoginFailed === true && <ErrorMessage message={errorMessage} />}
                <AppForm
                    initialValues={{email: "", password: ""}}
                    onSubmit={(res)=>handleSubmit(res)}
                    validationSchema={validationSchema}
                >                    
                    <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="email"
                        keyboardType="email-address"
                        name="email"
                        placeholder="Email"
                        textContentType="emailAddress"
                    />

                    <AppFormField 
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="lock"
                        name="password"
                        placeholder="Password"
                        secureTextEntry={true}
                        textContentType="password"
                    />
                    
                    <SubmitButtonLoading 
                        title="Login"
                        isLoading={isLoading}
                    />

                </AppForm>
            </View>

        </SafeAreaScreen>
    )

}

const styles = StyleSheet.create({

    container:{
        padding: 10
    },
   logo:{
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20
   }
})
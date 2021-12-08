import React, {useEffect, useState} from 'react'
import { Image, Modal, Pressable, StatusBar, StyleSheet, View, } from 'react-native'

//Components
import {AppForm, AppFormField, ErrorMessage, SubmitButton} from '../forms'
import ActivityIndicator from '../ActivityIndicator'
import LottieView from 'lottie-react-native'
import SafeAreaScreen from './SafeAreaScreen'

//Assets
import useAuth from '../../auth/useAuth'
import useAPI from '../../hooks/useAPI'
const logo = require("../../assets/logo.png")

//Extra
import authApi from '../../api/auth'
import user from '../../api/user'
import * as Yup from 'yup'
import AppText from '../AppText'
import Colors from '../../assets/_colors'

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().label("First name"),
    lastName: Yup.string().required().label("Last name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(5).max(10).label("Password")
})

export default function RegisterScreen({}) {

    const [errorMessage, setErrorMessage] = useState("")
    const [hasLoginFailed, setHasLoginFailed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isModalShown, setIsModalShown] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [showRetry, setShowRetry] = useState(false)

    const {logIn} = useAuth()
    // const registerAPI = useAPI(authApi.register)

    useEffect(()=>{

        StatusBar.setBarStyle('dark-content')

    },[])

    const handleRetryOnPress = ()=>{

        setIsModalShown(false)

    }
    

    const handleSubmit = async ({firstName, lastName, email, password})=>{

        setIsLoading(true)

        try {

            await authApi.register(email, password)
            setUserEmail(email)
            setIsModalShown(true)

            const userInfo = await user.addUser(firstName, lastName)
            // logIn(userInfo)

            setTimeout(()=>{
                setShowRetry(true)
            }, 60000)


        } catch (error) {
            setHasLoginFailed(true)
            setErrorMessage(error.message)
            // console.log(error);
        }

        setIsLoading(false)


    }

    return (
        <SafeAreaScreen>
            
            <View style={styles.container}>

                <Image source={logo} style={styles.logo} />
                
                {hasLoginFailed === true && <ErrorMessage message={errorMessage} />}
                <AppForm
                    initialValues={{firstName:"", lastName:"", email: "", password: ""}}
                    onSubmit={(res)=>handleSubmit(res)}
                    validationSchema={validationSchema}
                >

                    <AppFormField
                        autoCapitalize="words"
                        autoCorrect={false}
                        icon="account"
                        keyboardType="default"
                        name="firstName"
                        placeholder="First name"
                    />
                    <AppFormField
                        autoCapitalize="words"
                        autoCorrect={false}
                        icon="account"
                        keyboardType="default"
                        name="lastName"
                        placeholder="Last name"
                    />
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

                    <SubmitButton 
                        title="register"
                    />

                </AppForm>

                <View>
                    <ActivityIndicator visible={isLoading}  />
                </View>



            </View>

            <Modal
                animationType="slide"
                visible={isModalShown}
                // visible={true}
            >

                <SafeAreaScreen style={styles.modal}>

                    <LottieView
                        autoPlay
                        loop
                        source={require("../../assets/animations/new_email.json")}
                        style={styles.modalAnimation}
                    />

                    <View style={styles.modalTextWrapper}>
                        <AppText style={styles.modalText}>
                        A confirmation link has been sent to <AppText style={{color: Colors.secondary}}>{userEmail}</AppText>. Please follow it to activate your account.
                        You will be automatically signed in once you are done.
                        </AppText>
                        
                        {showRetry === true && (
                            <Pressable hitSlop={20} onPress={handleRetryOnPress}>
                                <AppText style={{textAlign: "center", color: Colors.primary, marginTop: 15}}>Retry</AppText>
                            </Pressable>
                        )}

                    </View>

                </SafeAreaScreen>

            </Modal>

            

        </SafeAreaScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    logo:{
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20
   },
   modal:{
       alignItems: "center",
       justifyContent: "center"
   },
   modalAnimation: {
       height: 100,
       width: 100,
   },
   modalText: {
       textAlign: "center"
   },
   modalTextWrapper:{
       marginTop: 20,
       width: "86%"
   }
})

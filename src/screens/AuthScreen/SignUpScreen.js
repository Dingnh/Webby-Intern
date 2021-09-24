import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, View, TouchableOpacity, ScrollView, StyleSheet, ToastAndroid, Platform, Alert, Dimensions, Text, KeyboardAvoidingView } from 'react-native'
import { AuthContext } from "@/auth/Auth"
import { useTheme } from '@react-navigation/native';
import { Checkbox, TextInput } from 'react-native-paper';
import CustomButton from "@/components/CustomButton"
import {Auth} from '@/services/API.js'
import PasswordInput from "@/components/PasswordInput"

const SignupScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [fullname, setFullname] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isFullnameError, setIsFullnameError] = useState(false)
    const [isMobileError, setIsMobileError] = useState(false)
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [checked, setChecked] = useState(true)
    const [loading, setLoading] = useState(false)

    const { signIn } = useContext(AuthContext)

    function notifyMessage(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            Alert.alert(msg);
        }
    }

    async function handleSignUp() {
        let {validEmail, validPw} = [false, false]

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email === "" || (reg.test(email) === false)) {
            setIsEmailError(true)
        } else {
            validEmail = true
        }
        if (password === "" || password.length < 8 || confirmPassword != password) {
            setIsPasswordError(true)
        } else {
            validPw = true
        }

        if(!mobile) setIsMobileError(true)
        if(!fullname) setIsFullnameError(true)
        
        if(validEmail && validPw && mobile && fullname) {
            setLoading(true)
            let res = await Auth.registerAccount({fullname, mobile, email, password})

            if(res.errors) {
                notifyMessage(res.errors[0].message)
            } else {
                let res_login = await Auth.login({mobile, password})
                signIn({ token: res_login.data.login.token });
            }
            setLoading(false)
        }
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.primaryBg }]}>
            <SafeAreaView style={{ height: Dimensions.get('window').height - 30 }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Text style={[{ color: colors.text, fontSize: 16 }]}>
                            Back
                        </Text>
                    </TouchableOpacity>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "position"} keyboardVerticalOffset={-110} style={{ position: 'absolute', width: '100%', bottom: 70 }}>
                    <Text type="bold" family="sarabun" style={[styles.title, { color: colors.text, marginBottom: 10 }]}>
                        Sign up
                    </Text>
                    <TextInput     
                        mode="outlined" 
                        label="Fullname" 
                        keyboardType="default" 
                        onChangeText={text => {setFullname(text); setIsFullnameError(false)}} 
                        error={isFullnameError}
                        style={[styles.textInput, { backgroundColor: colors.primaryBg }]} />
                    <TextInput     
                        mode="outlined" 
                        label="Phone No." 
                        keyboardType="default" 
                        onChangeText={text => {setMobile(text); setIsMobileError(false)}} 
                        error={isMobileError}
                        style={[styles.textInput, { backgroundColor: colors.primaryBg }]} />
                    <TextInput     
                        mode="outlined" 
                        label="Email" 
                        keyboardType="email-address" 
                        onChangeText={text => {setEmail(text); setIsEmailError(false)}} 
                        error={isEmailError} 
                        style={[styles.textInput, { backgroundColor: colors.primaryBg }]} />
                    <PasswordInput 
                        mode="outlined" 
                        label="Password" 
                        keyboardType="default" 
                        onChangeText={text => { setPassword(text); setIsPasswordError(false) }} 
                        error={isPasswordError} 
                        style={[styles.textInput, { backgroundColor: colors.primaryBg }]} />
                    <PasswordInput 
                        mode="outlined" 
                        label="Confirm Password" 
                        keyboardType="default" 
                        onChangeText={text => { setConfirmPassword(text); setIsPasswordError(false) }} 
                        error={isPasswordError} 
                        style={[styles.textInput, { backgroundColor: colors.primaryBg }]} />
                    <Text type="normal" family="sarabun" style={[styles.text, { color: colors.faded }]}>
                        Password must be at least 8 characters.
                    </Text>

                    <TouchableOpacity style={[styles.termsAndCondition]} onPress={() => {
                        setChecked(!checked);
                    }}>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            color={colors.accent}
                            uncheckedColor={colors.secondaryBg}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                        <View style={{ marginLeft: 10, flex: 1 }}>
                            <Text type="bold" family="sarabun" style={[styles.termsAndPrivacy, { color: colors.text }]}>
                                By signing up, you accept the{' '}
                                <Text style={[styles.termsAndPrivacyText, { color: colors.accent }]} onPress={() => { notifyMessage('Terms of Service') }}>
                                    Terms of Service{' '}
                                </Text>
                                <Text>
                                    and{' '}
                                </Text>
                                <Text style={[styles.termsAndPrivacyText, { color: colors.accent }]} onPress={() => { notifyMessage('Privacy Policy') }}>
                                    Privacy Policy
                                </Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginBottom: 15 }}>
                        <CustomButton loading={loading} text={"Sign Up"} onPress={() => handleSignUp()} />
                    </View>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <Text type="bold" family="sarabun" style={[{ color: colors.text }]}>
                                    Already have an account?
                                </Text>
                                <Text type="bold" family="sarabun" style={[styles.signUpText, { color: colors.accent }]}>
                                    Sign in
                                </Text>
                            </View>
                        </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ScrollView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
    icon: {
        height: 100,
        resizeMode: "contain",
    },
    title: {
        fontSize: 24,
    },
    text: {
        fontSize: 14
    },
    loginButton: {
        width: "100%",
        padding: 10,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 10
    },
    loginButtonText: {
        fontSize: 16,
    },
    termsAndCondition: {
        flexDirection: "row",
        marginVertical: 15,
        alignItems: "center",
    },
    textInput: {
        fontSize: 14,
        marginBottom: 5
    },
    signUpText: {
        marginLeft: 5
    },
    horizontalLine: {
        backgroundColor: "#c4c4c4",
        height: 1,
        width: "100%",
        marginTop: 13,
        position: "absolute"
    },
    andText: {
        marginHorizontal: 5,
    },
    termsAndPrivacy: {
        textAlign: 'justify'
    }
})
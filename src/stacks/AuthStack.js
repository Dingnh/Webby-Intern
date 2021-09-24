import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '@/screens/AuthScreen/SignInScreen';
import SignUpScreen from '@/screens/AuthScreen/SignUpScreen';
import { useTheme } from '@react-navigation/native';

const AuthStack = createStackNavigator();

const AuthStackScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <AuthStack.Navigator screenOptions={{
            headerStyle: { backgroundColor: "#eee", height: 70 },
            headerTintColor: colors.text,
            animationTypeForReplace: "pop",
            headerBackTitleVisible: false
        }}>
            <AuthStack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerTransparent: true,
                    title: false,
                }}
            />
            <AuthStack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                    title: "",
                    headerLeft: () => (<></>
                    ),
                    headerBackTitleVisible: false,
                    headerTransparent: true,
                    title: false,
                }}
            />
        </AuthStack.Navigator>
    )
}

export default AuthStackScreen
import * as React from 'react';
import {View, Text} from 'react-native'
import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage'
import { AuthContext } from "@/auth/Auth"
import AuthStackScreen from "@/stacks/AuthStack"
import TabNavigator from '@/stacks/TabNavigator'
import { navigationRef, isReadyRef } from './RootNavigation';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {Auth} from '@/services/API' 

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStorage.getItem('userToken');
        console.log({action: "getting token", userToken})
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        await SecureStorage.setItem('userToken', data.token);
        dispatch({ type: 'SIGN_IN', token: data.token });
      },
      signOut: async () => {
        let token = await SecureStorage.getItem('userToken');
        let res_logout = await Auth.logout({token})
        if(!res_logout.errors) {
          await SecureStorage.removeItem('userToken');
        } else {
          console.log(res_logout.errors[0].message)
        }
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        await SecureStorage.setItem('userToken', data.token);
        dispatch({ type: 'SIGN_IN', token: data.token });
      },
    }),
    []
  );

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: "#111",
      primary: '#5599ff',
      accent: '#0077ff',
      inactive: "#555555",
      faded: "#a4a4a4",
      primaryBg: "#eee",
      secondaryBg: "#474747",
      tertiaryBg: "#595959"
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={MyTheme} ref={navigationRef} onReady={() => { isReadyRef.current = true; }}>
              {state.userToken == null ?
                <AuthStackScreen navigation={navigationRef.current} />
                :
                <TabNavigator />
              }
          </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}
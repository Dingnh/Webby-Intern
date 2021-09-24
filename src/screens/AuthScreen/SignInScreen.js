import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert
} from "react-native";
import { TextInput } from 'react-native-paper';
import { AuthContext } from "@/auth/Auth";
import { Auth } from "@/services/API";
import PasswordInput from "@/components/PasswordInput";

const SignInScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const { signIn } = useContext(AuthContext);
  
  const submit = async () => {
    setLoading(true);
    if (mobile === "") {
      setMobileError(true);
    } else {
      setMobileError(false);
    }
    if (password === "") {
      setPassError(true);
    } else {
      setPassError(false);
    }
    if (!(mobile === "") && !(password === "")) {
      let response = await Auth.login({
        mobile,
        password,
      });

      if (response.errors) {
        Alert.alert(
          "Failed to login",
          "Please check your credentials or try again later.",
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
      } else {
        signIn({ token: response.data.login.token });
     }
    }
    setLoading(false);
  };

  const InputActived = () => {
    setInputActive(true)
  }

  const InputBlurred = () => {
    setInputActive(false)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
          <View style={styles.headerContainer}>
              {!inputActive &&
              <View style={{ alignItems: 'center' }}>
                <Image style={styles.icon} source={require("@/assets/webby-icon.png")} />
              </View>
              }
              <Text style={styles.header}>Internship</Text>
              <Text style={styles.title}>Assessment App</Text>
              <Text style={styles.subHeader}>Webby Sdn Bhd</Text>
          </View>
          <View style={{ paddingHorizontal: 30, width: "100%", bottom: 70 }}>
              <View>
                  <Text style={styles.header}>Phone No.</Text>
                  <TextInput
                      mode='outlined'
                      value={mobile}
                      onChangeText={mobile => {
                          setMobile(mobile)
                          setMobileError(false)
                      }}
                      blurOnSubmit={false}
                      placeholder="phone number"
                      style={{height: 50}}
                      onFocus={InputActived}
                      onBlur={InputBlurred}
                  />
                  {mobileError ?
                      <Text style={{ color: "#ff0000", textAlign: 'center', marginTop: 10 }}>Empty Field!</Text>
                      :
                      <View style={{ marginTop: 15 }} />
                  }
              </View>
              <View>
                  <Text style={styles.header}>Password</Text>
                  <View>
                      <PasswordInput
                          password={password}
                          onChangeText={password => {
                              setPassword(password)
                              setPassError(false)
                          }}
                          placeholder="password"
                          style={{height: 50}}
                          onFocus={InputActived}
                          onBlur={InputBlurred}
                      />
                      {passError ?
                          <Text style={{ color: "#ff0000", textAlign: 'center', marginVertical: 10 }}>Empty Field!</Text>
                          :
                          <View style={{ marginTop: 20 }} />
                      }
                  </View>
              </View>
              <TouchableOpacity style={[styles.button, { backgroundColor: "#5599ff" }]}
                  onPress={submit}>
                  <Text style={{ color: "#ffffff" }}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.forget} onPress={() => navigation.navigate("SignUp")}>
                  <Text>Don't have an account?  <Text style={{textDecorationLine: "underline", color: "#0077ff", fontWeight: "bold"}}>Create one</Text></Text>
              </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: "60%",
  },
  icon: {
      height: 100,
      resizeMode: "contain",
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
  },
  header: {
      fontSize: 16,
      opacity: 0.7
  },
  subHeader: {
      fontSize: 14,
      opacity: 0.7,
      marginBottom: 65
  },
  button: {
      width: '100%',
      height: 50,
      marginBottom: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5
  },
  forget: {
      alignItems: 'center'
  }
});
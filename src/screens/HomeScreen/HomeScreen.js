import React, { useContext } from "react";
import {
  View,
  Text,
} from "react-native";
import {Button} from 'react-native-paper'
import { AuthContext } from "@/auth/Auth";
import { useTheme } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  const {colors} = useTheme()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      <Button onPress={signOut} style={{background: colors.accent}}><Text>Sign Out</Text></Button>
    </View>
  );
};

export default HomeScreen;

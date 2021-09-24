import React from 'react';
import {Text} from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '@/screens/HomeScreen/HomeScreen'
import ProfileScreen from '@/screens/ProfileScreen/ProfileScreen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { useTheme } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: <Text style={{color: "#fff"}}>Home</Text>,
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="home" color={"#fff"} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: <Text style={{color: "#fff"}}>Profile</Text>,
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="person" color={"#fff"} size={20} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default MyTabs
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PasswordInput = props => {

    const [hidden, setHidden] = useState(true)

    return (
        <View>
            <TextInput
                mode='outlined'
                value={props.password}
                onChangeText={password => {
                    props.setPassword(password)
                }}
                blurOnSubmit
                placeholder="Enter"
                secureTextEntry={hidden}
                {...props}
            />
            <TouchableOpacity onPress={() => {
                setHidden(!hidden)
            }} style={{ position: 'absolute', right: 20, top: 23, zIndex: 1 }}>
                <MaterialCommunityIcons name="eye-outline" color={hidden ? 'rgba(172, 172, 172, 0.6)' : "#6a6a6a"} size={20} />
            </TouchableOpacity>
        </View>
    );
};

export default PasswordInput
import React from 'react'
import { TouchableOpacity, View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import { useTheme } from '@react-navigation/native';

const CustomButton = props => {

    const { colors } = useTheme()

    let loading = props.loading
    let disabled = props.disabled
    let text = props.text || "Button"

    return (
        <TouchableOpacity
            disabled={disabled || loading ? true : false}
            style={props.style || [styles.button, { backgroundColor: loading || disabled ? colors.primary : colors.primary }]}
            onPress={props.onPress}>

            {loading ?
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={colors.text} />
                </View>
                :
                <Text style={[styles.buttonText, { color: colors.background }]}>
                    {text}
                </Text>
            }

        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        width: "100%",
        padding: 14,
        height: 50,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontSize: 16,
    },
})
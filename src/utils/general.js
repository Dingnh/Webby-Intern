import SecureStorage from 'react-native-secure-storage'

export const storeString = async (key, value) => {
    try {
        await SecureStorage.setItem(key, value)
    } catch (e) {
        //console.log(e)
    }
}

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await SecureStorage.setItem(key, jsonValue)
    } catch (e) {
        //console.log(e)
    }
}

export const getString = async (key) => {
    try {
        const value = await SecureStorage.getItem(key)
        if (value !== null) {
            return value
        }
    } catch (e) {
        //console.log(e)
    }
}

export const getData = async (key) => {
    try {
        const jsonValue = await SecureStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        //console.log(e)
    }
}

import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const parseJwt = (token) => {

    const token = await AsyncStorage.getItem('user_token-acess-goodEye')

    return jwtDecode(token)
}

export const deslogar = async (props) => {
    await AsyncStorage.removeItem('user_token-acess-goodEye')

    props.navigation.navigate('Login')
}
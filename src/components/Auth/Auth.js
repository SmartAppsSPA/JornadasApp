import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Invited from './Invited';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const changeForm = () => {
        setIsLogin(!isLogin);
    }

    return (
        <View>
            <Image style={styles.logo} source={require('../../../assets/logo_jornadas.png')} />
            {isLogin ?
                (
                    <View>
                        <LoginForm changeForm={changeForm} />
                    </View>
                ) : (
                    <View>
                        <RegisterForm changeForm={changeForm} />
                    </View>
                )
            }
        </View>
    )
}

export default Auth

const styles = StyleSheet.create({
    logo: {
        width: 300,
        height: 100,
        resizeMode: 'center',
        marginTop: 100,
        marginBottom: 50,
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#F5C300',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    text: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
});
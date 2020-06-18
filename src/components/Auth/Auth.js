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
        <View Style={styles.view}>
            <Image style={styles.logo} source={require('../../../assets/logo_jornadas.png')} />

            {isLogin ? (
                <>
                    <LoginForm changeForm={changeForm} />
                    <Invited />
                </>
            )
                :
                (
                    <>
                        <RegisterForm changeForm={changeForm} />
                        <Invited />
                    </>
                )
            }
        </View>
    )
}

export default Auth

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    logo: {
        width: 300,
        height: 100,
        resizeMode: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
});
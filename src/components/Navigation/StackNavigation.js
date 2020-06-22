import React from 'react';
import { Image } from 'react-native';
import { IconButton } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home/Home';
import Alcancia from '../Screens/Alcancia/Alcancia';
import DonacionEmpresas from '../Screens/Alcancia/DonacionEmpresas';
import DonacionUsuario from '../Screens/Alcancia/DonacionUsuario';
import Bono from '../Screens/Bono/Bono';
import Donar from '../Screens/Alcancia/Donar';
import Auth from '../Auth/Auth';
import LoginForm from '../Auth/LoginForm';

const Stack = createStackNavigator();

export default function StackNavigation(props) {

    const buttonLeft = () => {
        return (
            <IconButton
                icon='menu'
                onPress={() => props.navigation.openDrawer()}
            />
        )
    }
    const buttonRight = () => {
        return (
            <Image
                source={require('../../../assets/logo_jornadas.png')}
                style={{
                    width: 220,
                    resizeMode: 'contain',
                    height: 50,
                    marginRight: -20,
                }}
            />
        )
    }

    return (
        <Stack.Navigator >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerLeft: () => buttonLeft(), headerRight: buttonRight }}
            />
            <Stack.Screen
                name="Alcancia"
                component={Alcancia}
                options={{ headerLeft: () => buttonLeft(), headerRight: buttonRight }}
            />
            <Stack.Screen
                name="DonacionEmpresas"
                component={DonacionEmpresas}
                options={{ headerLeft: () => buttonLeft(), headerRight: buttonRight }}
            />
            <Stack.Screen
                name="DonacionPersonas"
                component={DonacionUsuario}
                options={{ headerLeft: () => buttonLeft(), headerRight: buttonRight }}
            />
            <Stack.Screen
                name="Bono"
                component={Bono}
                options={{ headerLeft: () => buttonLeft(), headerRight: buttonRight }}
            />
            <Stack.Screen
                name="Donar"
                component={Donar}
                options={{ headerLeft: () => buttonLeft(), headerRight: buttonRight }}
            />
            <Stack.Screen
                name="Auth"
                component={Auth}
                options={{ headerLeft: () => buttonLeft(), headerRight: buttonRight }}
            />
            <Stack.Screen
                name="LoginForm"
                component={LoginForm}
                options={{ headerLeft: () => buttonLeft(), headerRight: buttonRight }}
            />
        </Stack.Navigator>
    )
}




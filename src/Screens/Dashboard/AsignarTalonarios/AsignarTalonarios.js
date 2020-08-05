import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Talonarios from './Talonarios';
import Asignar from './Asignar';

const Stack = createStackNavigator();

export default function AsignarTalonarios() {
    return (
        <Stack.Navigator headerMode='none' initialRouteName="Talonarios">
            <Stack.Screen name='Talonarios' component={Talonarios} options={{title: 'Talonarios'}} />
            <Stack.Screen name='Asignar' component={Asignar} options={{title: 'Asignar'}} />
        </Stack.Navigator>
    )
}

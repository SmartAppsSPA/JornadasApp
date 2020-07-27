import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Talonarios from './Talonarios';
import Asignar from './Asignar';
import Informacion from './Informacion';

const Stack = createStackNavigator();

export default function AsignarTalonarios() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Talonarios' component={Talonarios} options={{title: 'Talonarios'}} />
            <Stack.Screen name='Asignar' component={Asignar} options={{title: 'Asignar'}} />
            <Stack.Screen name='Informacion' component={Informacion} options={{title: 'Informacion'}} />
        </Stack.Navigator>
    )
}

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Talonarios from './Talonarios';

const Stack = createStackNavigator();

export default function MisTalonarios() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Talonarios' component={Talonarios} options={{title: 'Talonarios'}} />
        </Stack.Navigator>
    )
}

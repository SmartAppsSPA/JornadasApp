import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Talonarios from './Talonarios';
import InformacionTalonario from './InformacionTalonarios';

const Stack = createStackNavigator();

export default function MisTalonarios() {
    return (
        <Stack.Navigator headerMode='none' initialRouteName="Talonarios">
            <Stack.Screen name='Talonarios' component={Talonarios} options={{title: 'Talonarios'}} />
            <Stack.Screen name='InformacionTalonario' component={InformacionTalonario} options={{title: 'Información Talonarios'}}/>
        </Stack.Navigator>
    )
}

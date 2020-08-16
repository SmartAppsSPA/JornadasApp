import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Bonos from './Bonos';
import InfoBonos from './InfoBonos';

const Stack = createStackNavigator();

export default function MisBonosScreen() {
    return (
        <Stack.Navigator headerMode="none" initialRouteName='Bonos'>
            <Stack.Screen name='Bonos' component={Bonos} options={{title: 'Mis Bonos'}}/>
            <Stack.Screen name='InfoBono' component={InfoBonos} options={{title: 'Informacion Bonos'}}/>
        </Stack.Navigator>
    )
}
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Donaciones from './Donaciones';
import InfoDonaciones from './InfoDonaciones'

const Stack = createStackNavigator();

export default function MisBonosScreen() {
    return (
        <Stack.Navigator headerMode="none" initialRouteName='Donaciones'>
            <Stack.Screen name='Donaciones' component={Donaciones} />
            <Stack.Screen name='InfoDonaciones' component={InfoDonaciones} />
        </Stack.Navigator>
    )
}
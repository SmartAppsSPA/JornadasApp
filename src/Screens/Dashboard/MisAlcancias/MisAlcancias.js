import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Alcancias from './Alcancias'

const Stack = createStackNavigator();

export default function MisAlcancias() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Alcancias' component={Alcancias} options={{title: 'Alcancias'}}/>
        </Stack.Navigator>
    )
}

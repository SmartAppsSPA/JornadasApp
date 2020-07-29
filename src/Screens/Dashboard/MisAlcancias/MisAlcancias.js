import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Alcancias from './Alcancias';
import InformacionAlcancia from './InformacionAlcancia';

const Stack = createStackNavigator();

export default function MisAlcancias() {
    return (
        <Stack.Navigator headerMode="none" initialRouteName='Alcancias'>
            <Stack.Screen name='Alcancias' component={Alcancias} options={{title: 'Alcancias'}}/>
            <Stack.Screen name='InformacionAlcancia' component={InformacionAlcancia} options={{title: 'Informacion'}}/>
        </Stack.Navigator>
    )
}

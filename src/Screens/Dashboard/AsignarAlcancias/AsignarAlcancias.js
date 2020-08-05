import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Alcancias from './Alcancias';
import Asignar from './Asignar';

const Stack = createStackNavigator();

export default function AsignarAlcancias() {
    return (
        <Stack.Navigator headerMode="none" initialRouteName="Alcancias">
            <Stack.Screen name='Alcancias' component={Alcancias} options={{title: 'Alcancias'}}/>
            <Stack.Screen name="Asignar" component={Asignar} options={{title: 'Asignmar'}}/>
        </Stack.Navigator>
    )
}

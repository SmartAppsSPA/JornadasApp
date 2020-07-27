import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Alcancias from './Alcancias';
import Asignar from './Asignar';
import Informacion from './Informacion';

const Stack = createStackNavigator();

export default function AsignarAlcancias() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Alcancias' component={Alcancias} options={{title: 'Alcancias'}}/>
            <Stack.Screen name="Asignar" component={Asignar} options={{title: 'Asignmar'}}/>
            <Stack.Screen name='Informacion' component={Informacion} options={{title: 'Informacion'}} />
        </Stack.Navigator>
    )
}

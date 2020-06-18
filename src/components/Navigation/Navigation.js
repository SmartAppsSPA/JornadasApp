import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../Screens/Home/Home';

const Drawer = createDrawerNavigator();

const Navigation = () => {
    return (
        <Drawer.Navigator initialRouteName='Inicio'>
            <Drawer.Screen name='Inicio' component={Home} options={{ title: 'Inicio' }} />
        </Drawer.Navigator>
    )
}

export default Navigation;
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import DrawerContent from './DraweContent';

const Drawer = createDrawerNavigator();

const Navigation = (props) => {

    return (
        <Drawer.Navigator initialRouteName='App' drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name='App' component={StackNavigation} />
        </Drawer.Navigator>
    )
}

export default Navigation;
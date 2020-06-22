import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Switch, TouchableRipple, Text } from 'react-native-paper';

const DrawerContent = (props) => {
    const { navigation } = props;
    const { fbUserData } = props;

    const [active, setActive] = useState("Home");

    const onChangeScreen = (screen) => {
        setActive(screen)
        navigation.navigate(screen);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#03255F" }}>
            <View Style={{ height: 50 }}>
                <Image
                    source={require("../../../assets/logo_jornadas.png")}
                    style={{
                        width: null,
                        resizeMode: "contain",
                        height: 220,
                        marginBottom: -50,
                        marginTop: -30,
                    }}
                />
            </View>
            <DrawerContentScrollView style={{ backgroundColor: 'white' }}>
                <Drawer.Section >
                    <Drawer.Item label='Home' active={active === 'Home'} onPress={() => onChangeScreen('Home')} icon='home' />
                    <Drawer.Item label='Alcancia' active={active === 'Alcancia'} onPress={() => onChangeScreen('Alcancia')} />
                    <Drawer.Item label='Bono' active={active === 'Bono'} onPress={() => onChangeScreen('Bono')} />
                </Drawer.Section>
            </DrawerContentScrollView>
        </SafeAreaView>
    )
}

export default DrawerContent;

const styles = StyleSheet.create({

})
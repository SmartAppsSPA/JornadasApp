import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import {Overlay} from 'react-native-elements';

export default function Loading(props) {
    const {isVisible, text} =  props;
    return (
        <Overlay isVisible={isVisible}
        windowBackgroundColor='rgba(0,0,0,0.5)'
        overlayBackgroundColor='transparent'
        overlayStyle={styles.overlay}>
            <View styles={styles.view}>
                <ActivityIndicator size='large' color='#F5C300'/>
                {text && <Text style={styles.text} >{text}</Text>}
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: '#03255F',
        borderColor: '#03255F',
        borderWidth: 2,
        borderRadius: 10,
    },
    view: {
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    text:{
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase',
        marginTop: 10,
        textAlign: 'center'
    }
})
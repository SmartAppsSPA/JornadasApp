import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'


export default function Dashboard() {
    const navigation = useNavigation();
    
    return (
        <View>
            <Text>Dashboard</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text>volver</Text>
        </TouchableOpacity>
        </View>
        
    )
}

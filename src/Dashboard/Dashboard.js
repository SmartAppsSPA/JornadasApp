import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Dashboard(props) {
    return (
        <View>
            <Text>Dashboard</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
            <Text>volver</Text>
        </TouchableOpacity>
        </View>
        
    )
}

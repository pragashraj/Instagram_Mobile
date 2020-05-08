import React from 'react'
import { View, Text,TextInput,StyleSheet } from 'react-native'

const CustomInput = ({secureTextEntry,placeholder}) => {
    return (
        <View>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.textInput}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    textInput:{
        backgroundColor:'#E9EDF0',
        borderWidth:0.2,
        borderRadius:6,
        fontSize:18
    }
})

export default CustomInput

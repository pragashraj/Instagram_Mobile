import React from 'react'
import { View, Text, StyleSheet , TouchableOpacity } from 'react-native'

const CustomButton = ({btnTitle}) => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
            <Text style={styles.btnText}>{btnTitle}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#2A8EF2',
        width:'100%',
        height:'100%',
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center'

    },

    btnText:{
        color:'white',
        fontSize:18
    }

})

export default CustomButton

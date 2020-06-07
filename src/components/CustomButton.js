import React from 'react'
import { View, Text, StyleSheet , TouchableOpacity ,Image} from 'react-native'

const CustomButton = ({btnTitle,icon,handleRegister}) => {
    return (
        <TouchableOpacity onPress={()=>handleRegister()}>
            <View style={{...styles.container}}>
                {
                    icon ? <Image source={require('../assets/icons/fb.png')}/> :null
                }
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
        alignItems:'center',
        flexDirection:'row'

    },

    btnText:{
        color:'white',
        fontSize:18
    }

})



export default CustomButton

import React from 'react'
import { View, Text, StyleSheet , TouchableOpacity ,Image} from 'react-native'

const CustomButton = ({btnTitle,icon,handleRegister,registerBtn}) => {
    return (
        <TouchableOpacity onPress={()=>handleRegister()}>
            <View style={registerBtn ? {...styles.container,...styles.RegisterBtn} : {...styles.container,...styles.nonRegisterBtn}}>
                {
                    icon ? <Image source={require('../assets/icons/fb.png')}/> :null
                }
                <Text style={registerBtn ? styles.RegisterBtnTxt : styles.nonRegisterBtnTxt}>{btnTitle}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'

    },

    nonRegisterBtn:{
        backgroundColor:'white',
        borderWidth:0.4
    },

    RegisterBtn:{
        backgroundColor:'#2A8EF2',
    },

    RegisterBtnTxt:{
        color:'white',
        fontSize:18
    },

    nonRegisterBtnTxt:{
        fontSize:18
    }

})



export default CustomButton

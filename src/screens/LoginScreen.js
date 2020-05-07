import React, { Component } from 'react'
import { Text, View ,StyleSheet,TouchableOpacity } from 'react-native'

import CustomButton from '../components/CustomButton'

class LoginScreen extends Component {
    render() {
        return (
            <View>
                <View style={styles.TextBlock}>
                    <Text style={styles.instaText}>Instagram</Text>
                </View>

                <View style={styles.btnBlock}>
                    <CustomButton btnTitle="Continue With Facebook"/>
                </View>

                <View style={styles.orBlock}>
                    <Text style={styles.orText}>OR</Text>
                </View> 

                <View style={styles.formBlock}>
                   
                </View>  

                <View style={styles.forgetBlock}>
                   
                </View>

                <View style={styles.signUpLinkBlock}>
                    <Text style={styles.que}>Don't have an account ?</Text>
                    <TouchableOpacity style={styles.Link}>
                        <Text style={styles.Link}>Sign up</Text>
                    </TouchableOpacity>
                </View>   

            </View>
        )
    }
}

const styles=StyleSheet.create({
    TextBlock:{
        width:'90%',
        height:'20%',
        marginLeft:'5%',
        justifyContent:'center',
        alignItems:'center'
    },

    instaText:{
        fontFamily:'Precious',
        fontSize:60,
        marginTop:'5%'
    },

    btnBlock:{
        width:'90%',
        height:'7%',
        marginLeft:'5%',
    },

    orBlock:{
        width:'90%',
        height:'5%',
        marginLeft:'5%',
        justifyContent:'center',
        alignItems:'center'
    },

    orText:{
        fontSize:17,
    },

    formBlock:{
        width:'90%',
        height:'45%',
        marginLeft:'5%',
        backgroundColor:'blue'
    },

    forgetBlock:{
        width:'90%',
        height:'15%',
        marginLeft:'5%',
        backgroundColor:'pink'
    },

    signUpLinkBlock:{
        width:'100%',
        height:'8%',
        backgroundColor:'lightgray',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },

    que:{
        color:'white',
        fontWeight:'bold'
    },

    Link:{
        marginLeft:'1%',
        fontWeight:'bold'
    }
})

export default LoginScreen
import React, { Component } from 'react'
import { Text, View ,StyleSheet,TouchableOpacity } from 'react-native'

import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'

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
                    <View style={styles.formInput}>
                        <CustomInput secureTextEntry={false} placeholder="Phone number , username or email"/>
                    </View>
                    <View style={{marginTop:'3%'}}>
                        <CustomInput secureTextEntry={true} placeholder="password"/>
                    </View>
                    <View style={styles.loginBtn}>
                        <CustomButton btnTitle="Log in"/>
                    </View>
                </View>  

                <View style={styles.forgetBlock}>
                   <TouchableOpacity>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                   </TouchableOpacity>
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
        alignItems:'center',
    },

    orText:{
        fontSize:17,
    },

    formBlock:{
        width:'90%',
        height:'35%',
        marginLeft:'5%',
    },

    formInput:{
        marginTop:'10%'
    },

    loginBtn:{
        width:'100%',
        height:'19%',
        marginTop:'5%',
    },

    forgetBlock:{
        width:'90%',
        height:'25%',
        marginLeft:'5%',
        justifyContent:'center',
        alignItems:'center'
    },

    forgotText:{
        color:'blue',
        fontSize:16
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
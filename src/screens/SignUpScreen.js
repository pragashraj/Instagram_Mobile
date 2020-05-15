import React, { Component } from 'react'
import { Text, View ,StyleSheet } from 'react-native'

import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'

import {auth} from '../config/config'

class SignUpScreen extends Component {

    state={
        email:'',
        fullName:'',
        userName:'',
        password:''
    }

    handleTextInput=(e,placeholder)=>{
        switch(placeholder){
            case "Phone number  or email":this.setState({email:e})
            case "Full Name":this.setState({fullName:e})
            case "UserName":this.setState({userName:e})
            case "password":this.setState({password:e})
            default : return null
        }
    }

    handleRegister=()=>{
        const {email,password}=this.state
        auth.createUserWithEmailAndPassword(email,password).then(
            (user)=>console.warn(user)
        ).catch(
            (err)=>console.warn(err)
        )
    }

    render() {
        return (
            <View>
                <View style={styles.TextBlock}>
                    <Text style={styles.instaText}>Instagram</Text>
                    <Text style={styles.textExtra}> Sign up to see Friend's photos & videos</Text>
                </View>

                <View style={styles.btnBlock}>
                    <CustomButton btnTitle="Log in With Facebook" icon={true}/>
                </View>

                <View style={styles.orBlock}>
                    <Text style={styles.orText}>OR</Text>                  
                </View> 

                <View style={styles.formBlock}>
                        <View style={styles.formInput}>
                            <CustomInput secureTextEntry={false} placeholder="Phone number  or email" handleTextInput={this.handleTextInput}/>
                        </View>

                        <View style={{marginTop:'3%'}}>
                            <CustomInput secureTextEntry={false} placeholder="Full Name" handleTextInput={this.handleTextInput}/>
                        </View>

                        <View style={{marginTop:'3%'}}>
                            <CustomInput secureTextEntry={false} placeholder="UserName" handleTextInput={this.handleTextInput}/>
                        </View>

                        <View style={{marginTop:'3%'}}>
                            <CustomInput secureTextEntry={true} placeholder="password" handleTextInput={this.handleTextInput}/>
                        </View>

                        <View style={styles.loginBtn}>
                            <CustomButton btnTitle="Sign up" icon={false} handleRegister={this.handleRegister}/>
                        </View>
                </View>

                <View style={styles.TermBlock}>
                    <Text style={styles.termText}>By signinig up, you agree to our</Text>
                    <Text style={styles.termText}>terms and privacy policy</Text>  
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
        alignItems:'center',
    },

    instaText:{
        fontFamily:'Precious',
        fontSize:30,
        marginTop:'5%'
    },

    textExtra:{
        fontSize:18,
        marginLeft:'2%',
        opacity:0.4,
        justifyContent:'center',
        alignItems:'center'
    },
    
    btnBlock:{
        width:'90%',
        height:'5%',
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
        height:'50%',
        marginLeft:'5%',
    },

    formInput:{
        marginTop:'10%'
    },

    loginBtn:{
        width:'100%',
        height:'12%',
        marginTop:'5%',
    },

    TermBlock:{
        width:'90%',
        height:'20%',
        marginLeft:'5%',
        justifyContent:'center',
        alignItems:'center'
    },

    termText:{
        fontSize:18,
        opacity:0.4
    }
})

export default SignUpScreen
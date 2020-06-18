import React, { Component } from 'react'
import { Text, View ,StyleSheet,ScrollView } from 'react-native'

import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import Spinner from '../components/Spinner'

import {auth,database} from '../config/config'

import {connect} from 'react-redux'
import {setCurrentAuth} from '../redux/actions/setAuth'

class SignUpScreen extends Component {

    state={
        email:'',
        fullName:'',
        userName:'',
        password:'',
        errorMessage:'',
        loading:false
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
        const {userName}=this.state
        this.setState({loading:true})
        auth.createUserWithEmailAndPassword(email,password).then(
            (user)=>{
                this.setState({errorMessage:'',loading:false})
                this.props.setCurrentAuth(user)
                this.props.navigation.navigate('mainFlow')
                database.ref(`User/${user.user.uid}/uid`).set(user.user.uid)
                database.ref(`Statistics/${user.user.uid}`).set({followers:0,following:0,posts:0})
                database.ref(`AppUsers/${userName}`).set({id:user.user.uid,name:userName})             
            }
        ).catch(
            (err)=>{
                this.setState({errorMessage:err.toString(),loading:false})
            }
        )
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.TextBlock}>
                    <Text style={styles.instaText}>Instagram</Text>
                    <Text style={styles.textExtra}> Sign up to see Friend's photos & videos</Text>
                </View>

                <View style={styles.btnBlock}>
                    <CustomButton 
                        btnTitle="Log in With Facebook" 
                        icon={true} handleRegister={()=>{}}
                        registerBtn={true}
                    />
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
                        {
                            this.state.loading ? <Spinner size="large"/> :
                            <CustomButton 
                                btnTitle="Sign up" 
                                icon={false} 
                                handleRegister={this.handleRegister}
                                registerBtn={true}
                            />
                        }                      
                        </View>
                </View>

                <View style={styles.TermBlock}>
                {
                    this.state.errorMessage ? <Text style={styles.errorMessage}>{this.state.errorMessage}</Text> :null
                }
                    <Text style={styles.termText}>By signinig up, you agree to our</Text>
                    <Text style={styles.termText}>terms and privacy policy</Text>  
                </View>
            </ScrollView>
        )
    }
}


const styles=StyleSheet.create({

    container:{
        alignItems:'center'
    },


    TextBlock:{
        width:'90%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        marginTop:'8%'
    },

    instaText:{
        fontFamily:'Precious',
        fontSize:45,
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
        height:40,
        marginTop:'10%'
    },

    orBlock:{
        width:'90%',
        height:18,
        justifyContent:'center',
        alignItems:'center',
    },

    
    orText:{
        fontSize:17,
    },

    formBlock:{
        width:'90%',
        height:200,
        marginTop:'5%'
    },

    formInput:{
        marginTop:'10%'
    },

    loginBtn:{
        width:'100%',
        height:40,
        marginTop:'5%'
    },


    TermBlock:{
        width:'90%',
        height:50,
        alignItems:'center',
        marginTop:'35%'
    },

    errorMessage:{
        color:'red',
        fontSize:22
    },

    termText:{
        fontSize:18,
        opacity:0.4
    }
})

const mapDispatchToProps=dispatch=>{
    return{
        setCurrentAuth:user=>dispatch(setCurrentAuth(user))
    }
}

export default connect(null,mapDispatchToProps)(SignUpScreen)
import React, { Component } from 'react'
import { Text, View ,StyleSheet,TouchableOpacity } from 'react-native'

import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import Spinner from '../components/Spinner'

import {auth} from '../config/config'

import {connect} from 'react-redux'
import {setCurrentAuth} from '../redux/actions/setAuth'

class LoginScreen extends Component {

    state={
        email:'',
        password:'',
        errorMessage:'',
        loading:false
    }

    handleTextInput=(e,placeholder)=>{
        switch(placeholder){
            case "Phone number , username or email":
                this.setState({email:e}) 
                break
            case "password":
                this.setState({password:e})
                break
            default : return null
        }
    }

    handleRegister=()=>{
        const {email,password}=this.state
        this.setState({loading:true})
        auth.signInWithEmailAndPassword(email,password).then(
            user=>{
                this.setState({errorMessage:'',loading:false})
                this.props.setCurrentAuth(user)
                this.props.navigation.navigate('mainFlow')
            }
        ).catch(
            (err)=>{
                this.setState({errorMessage:err.toString(),loading:false})
            }
        )
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.TextBlock}>
                    <Text style={styles.instaText}>Instagram</Text>
                </View>

                <View style={styles.btnBlock}>
                    <CustomButton btnTitle="Continue With Facebook" icon={true}/>
                </View>

                <View style={styles.orBlock}>
                    <Text style={styles.orText}>OR</Text>
                </View> 

                <View style={styles.formBlock}>
                    <View style={styles.formInput}>
                        <CustomInput secureTextEntry={false} placeholder="Phone number , username or email" handleTextInput={this.handleTextInput}/>
                    </View>
                    <View style={{marginTop:'3%'}}>
                        <CustomInput secureTextEntry={true} placeholder="password" handleTextInput={this.handleTextInput}/>
                    </View>
                    <View style={styles.loginBtn}>
                    {
                        this.state.loading ? <Spinner size="large"/> : <CustomButton btnTitle="Log in" icon={false} handleRegister={this.handleRegister}/>
                    }                      
                    </View>
                </View>  

                <View style={styles.forgetBlock}>
                   {
                       this.state.errorMessage ? <Text style={styles.errorMessage}>{this.state.errorMessage}</Text> :null
                   }
                   <TouchableOpacity>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                   </TouchableOpacity>
                </View>

                <View style={styles.signUpLinkBlock}>
                    <Text style={styles.que}>Don't have an account ?</Text>
                    <TouchableOpacity style={styles.Link} onPress={()=>this.props.navigation.navigate('SignUp')}>
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
        // justifyContent:'center',
        alignItems:'center'
    },

    
    errorMessage:{
        color:'red',
        fontSize:22
    },

    forgotText:{
        color:'blue',
        fontSize:15,
        marginTop:'3%'
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


const mapDispatchToProps=dispatch=>{
    return{
        setCurrentAuth:user=>dispatch(setCurrentAuth(user))
    }
}
export default connect(null,mapDispatchToProps)(LoginScreen)
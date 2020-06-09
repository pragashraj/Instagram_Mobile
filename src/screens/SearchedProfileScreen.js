import React, { Component } from 'react'
import { Text, View , StyleSheet , Image , TouchableOpacity} from 'react-native'

import CustomButton from '../components/CustomButton'

class SearchedProfileScreen extends Component {
    state={
        profileDetails:{
            Username:'Unknown'
        },
        profilePicUrl:"",
        Statistics:{
            posts:10,
            followers:22,
            following:25
        }
    }

    handleFollowBtn=()=>{

    }

    handleMessageBtn=()=>{
        
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.usernmeBlock}>
                        <Text style={styles.username}>{this.state.profileDetails.Username}</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.settings}>
                            <Image source={require('../assets/icons/settingimage.png')} style={styles.settingImage}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.headerMain}>
                    <View style={styles.profileImageBlock}>
                        {
                            this.state.profilePicUrl===''? <Image source={require('../assets/icons/user.png')} style={styles.profileImage}/>
                            :<Image source={{uri:this.state.profilePicUrl}} style={styles.profileImage}/>
                        }
                    </View>
                    <View style={styles.counterBlock}>
                        <Text style={styles.counter}>{this.state.Statistics.posts}</Text>
                        <Text style={styles.counterText}>Posts</Text>
                    </View>

                    <View style={styles.counterBlock}>
                        <Text style={styles.counter}>{this.state.Statistics.followers}</Text>
                        <Text style={styles.counterText}>Followers</Text>
                    </View>

                    <View style={styles.counterBlock}>
                        <Text style={styles.counter}>{this.state.Statistics.following}</Text>
                        <Text style={styles.counterText}>Following</Text>
                    </View>
                </View>

                <View style={styles.BtnBlock}>
                    
                    <View style={styles.btn}>
                        <CustomButton 
                            btnTitle="Follow" 
                            icon={false} 
                            handleRegister={this.handleFollowBtn} 
                            registerBtn={false}    
                        />
                    </View>

                    <View style={styles.btn}>        
                        <CustomButton 
                            btnTitle="Message" 
                            icon={false} 
                            handleRegister={this.handleMessageBtn} 
                            registerBtn={false}    
                        />
                    </View>

                </View>
                <View style={styles.contentsBlock}>
                    <View style={styles.contents}>
                        <Image source={require('../assets/icons/locked.png')} style={styles.lockedImg}/>
                    </View>
                </View>
            </View>
        )
    }
}


const styles=StyleSheet.create({

    container:{
        backgroundColor:'white'
    },

    header:{
        width:'100%',
        height:'9%',
        flexDirection:'row',
        borderBottomWidth:0.3,
        elevation:3
    },

    usernmeBlock:{
        width:'80%',
        height:'100%',
        justifyContent:'center',
    },

    username:{
        marginLeft:'12%',
        fontSize:25
    },

    settings:{
        width:'20%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },

    settingImage:{
        width: '50%',
        height: '50%',
    },

    headerMain:{
        width:'100%',
        height:'25%',
        flexDirection:'row',
    },

    BtnBlock:{
        width:'100%',
        height:'6%',
        flexDirection:'row'
    },

    btn:{
        width:'45%',
        marginLeft:'4%',
        height:'90%',
    },


    profileImageBlock:{
        width:'31%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },

    profileImage:{
        width:110,
        height:110,
        borderRadius:55,
        overflow: "hidden",
    },

    counterBlock:{
        width:'22%',
        height:'100%',
        marginRight:'1%',
        justifyContent:'center',
        alignItems:'center',
    },

    counter:{
        fontSize:30
    },

    counterText:{
        fontSize:18
    },

    contentsBlock:{
        width:'100%',
        height:'60%',
        borderTopWidth:0.5,
    },

    contents:{
        width:'98%',
        marginLeft:'1%',
        height:'98%',
        marginTop:'1%',
        elevation:6,
        borderWidth:0.1,
        alignItems:'center',
        justifyContent:'center'
    },

    lockedImg:{
        alignSelf:'center',
    },

})

export default SearchedProfileScreen
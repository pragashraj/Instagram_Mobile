import React, { Component } from 'react'
import { Text, View , StyleSheet , Image , TouchableOpacity } from 'react-native'

import CustomButton from '../components/CustomButton'
import {database,fbase} from '../config/config'

class SearchedProfileScreen extends Component {
    state={
        profileDetails:{
            Username:'Unknown'
        },
        profilePicUrl:"",
        Statistics:{
            posts:0,
            followers:0,
            following:0
        },

        mystatistics:{
            posts:0,
            followers:0,
            following:0
        },
        followedByMyself:false,
        data:{},
    }


    fetchData=()=>{
        const myId=fbase.auth().currentUser.uid
        const uid=this.props.route.params.id

        var url=''
        var details={
            Bio:"",
            Name:"user_name",
            Username:'user_name',
            Website:''
        }
        var statistics={
            posts:0,
            followers:0,
            following:0
        }
        database.ref('ProfilePics').child(uid).child('Pic').on('value',function(snapshot){
            const exist=(snapshot.val()!==null)
            if(exist) url=snapshot.val()
        })

        database.ref('ProfileDetails').child(uid).on('value',function(snapshot){
            const exist=(snapshot.val()!==null)
            if(exist) details=snapshot.val()

        })

        database.ref('Statistics').child(uid).on('value',function(snapshot){
            const exist=(snapshot.val()!==null)
            if(exist) statistics=snapshot.val()
        })

        var mystatistics={
            posts:0,
            followers:0,
            following:0
        }
        database.ref('Statistics').child(myId).on('value',function(snapshot){
            const exist=(snapshot.val()!==null)
            if(exist) mystatistics=snapshot.val()
        })

        var followedByMyself=false
        database.ref('User').child(myId).child('following').once('value',function(snapshot){
            snapshot.forEach(item => {
                if(item.val().id===uid)  followedByMyself=true
            });
        })

        this.setState({
            profilePicUrl:url,
            profileDetails:details,
            Statistics:statistics,
            mystatistics:mystatistics,
            followedByMyself:followedByMyself
        })

    }

    componentDidMount(){
       this.fetchData()
    }

    handleFollowBtn=()=>{
        const myId=fbase.auth().currentUser.uid
        const uid=this.props.route.params.id

        
            if(!this.state.followedByMyself){
                database.ref('User').child(myId).child('following').child(uid).set({id:uid})
                database.ref('User').child(uid).child('followers').child(myId).set({id:myId})

                var counts=this.state.Statistics.followers
                database.ref('Statistics').child(uid).update({followers:counts+1})
                var myCounts=this.state.mystatistics.following
                database.ref('Statistics').child(myId).update({following:myCounts+1})

                this.fetchData()
                this.setState({
                    followedByMyself:true
                })
            }else{
                database.ref('User').child(myId).child('following').child(uid).remove()
                database.ref('User').child(uid).child('followers').child(myId).remove()

                var counts=this.state.Statistics.followers
                database.ref('Statistics').child(uid).update({followers:counts-1})
                var myCounts=this.state.mystatistics.following
                database.ref('Statistics').child(myId).update({following:myCounts-1})
                this.fetchData()

                this.setState({
                    followedByMyself:false
                })
                
            }
        
    }

    handleMessageBtn=()=>{
        const uid=this.props.route.params.id
        this.props.navigation.navigate('Chats',{uid})
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
                            btnTitle={this.state.followedByMyself ? "UnFollow": "Follow"} 
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
        marginLeft:'8%',
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
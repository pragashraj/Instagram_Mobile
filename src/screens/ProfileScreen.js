import React,{Component} from 'react'
import { View, Text ,StyleSheet , Image , TouchableOpacity} from 'react-native'

import settingimage from '../../src/assets/icons/settingimage.png'
import CustomButton from '../components/CustomButton'
import {connect} from 'react-redux'
import {database,fbase} from '../config/config'

import OwnPosts from '../components/OwnPosts'
import SavedPost from '../components/SavedPost'

class ProfileScreen extends Component{

    state={
        profilePicUrl:"",
        profileDetails:{},
        gridView:true,
        calView:false,
        Statistics:{}
    }

    componentDidMount(){
        const uid=fbase.auth().currentUser.uid
        var url=''
        var details={
            Bio:"",
            Name:"user_name",
            Username:'user_name',
            Website:''
        }
        var statistics={
            posts:1,
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


        this.setState({
            profilePicUrl:url,
            profileDetails:details,
            Statistics:statistics
        })
    }

    EditProfile=()=>{
        this.props.navigation.navigate('Edit_Profile')
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.usernmeBlock}>
                        <Text style={styles.username}>{this.state.profileDetails.Username}</Text>
                    </View>
                    
                <TouchableOpacity style={styles.settings} onPress={()=>{this.props.navigation.navigate('SearchedProfile')}}>
                        <Image source={settingimage} style={styles.settingImage}/>
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

                <View style={styles.editProfileBlock}>
                    <CustomButton 
                        btnTitle="Edit Profile" 
                        icon={false} 
                        handleRegister={this.EditProfile} 
                        registerBtn={false}    
                    />
                </View>

                <View style={styles.highlightsBlock}>
                    <Text style={styles.highlightText01}>Story Highlights</Text>
                    <Text style={styles.highlightText02}>Keep your favourite stories here</Text>

                    <TouchableOpacity style={styles.addBlock}>
                        <Image source={require('../assets/icons/add.png')} style={styles.add}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.LinkBlock}>
                    <TouchableOpacity style={true ? styles.gridBlock :styles.gridBlock02} onPress={()=>this.setState({gridView:true,calView:false})}>
                        <View>
                            <Image source={require('../assets/icons/grid.png')} style={ this.state.gridView ? null:styles.grid} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={false ? styles.gridBlock :styles.gridBlock02} onPress={()=>this.setState({gridView:false,calView:true})}>
                        <View>
                            <Image source={require('../assets/icons/cal.png')} style={ this.state.calView ? null:styles.grid} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentsBlock}>
                    {this.state.gridView ? <OwnPosts/> : <SavedPost/>}
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
        height:'22%',
        flexDirection:'row'
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

    editProfileBlock:{
        width:'96%',
        height:'5%',
        marginLeft:'2%',
    },

    highlightsBlock:{
        width:'100%',
        height:'22%',
        borderBottomWidth:0.5,
    },

    highlightText01:{
        fontWeight:'bold',
        fontSize:20,
        marginTop:'2%',
        marginLeft:'3%'
    },

    highlightText02:{
        fontSize:17,
        marginTop:'1%',
        marginLeft:'3%',
        opacity:0.5
    },

    addBlock:{
        width:'60%',
        height:'60%'
    },

    add:{
        marginLeft:'1%'
    },

    LinkBlock:{
        width:'100%',
        height:'7%',
        flexDirection:'row'
    },

    gridBlock:{
        width:'50%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:0.4,
        elevation:2
    },

    gridBlock02:{
        width:'50%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:0.4,
        elevation:2
    },

    grid:{
        opacity:0.4,
    },

    contentsBlock:{
        width:'96%',
        height:'35%',
        marginLeft:'2%',
    },

})

const mapStateToProps=({profileInfo:{proDetails}})=>{
    return{
        proDetails
    }
}

export default connect(mapStateToProps)(ProfileScreen)

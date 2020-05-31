import React,{Component} from 'react'
import { View, Text ,StyleSheet , Image , TouchableOpacity} from 'react-native'

import settingimage from '../../src/assets/icons/settingimage.png'
import CustomButton from '../components/CustomButton'
import {connect} from 'react-redux'
import {database,fbase} from '../config/config'

class ProfileScreen extends Component{

    state={
        profilePicUrl:""
    }

    componentDidMount(){
        const uid=fbase.auth().currentUser.uid
        var url=''
        database.ref('ProfilePics').child(uid).child('Pic').on('value',function(snapshot){
            const exist=(snapshot.val()!==null)
            if(exist) url=snapshot.val()
        })

        this.setState({
            profilePicUrl:url
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
                        <Text style={styles.username}>user_name</Text>
                    </View>
                    
                <TouchableOpacity style={styles.settings}>
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
                        <Text style={styles.counter}>10</Text>
                        <Text style={styles.counterText}>Posts</Text>
                    </View>

                    <View style={styles.counterBlock}>
                        <Text style={styles.counter}>22</Text>
                        <Text style={styles.counterText}>Followers</Text>
                    </View>

                    <View style={styles.counterBlock}>
                        <Text style={styles.counter}>51</Text>
                        <Text style={styles.counterText}>Following</Text>
                    </View>

                </View>

                <View style={styles.editProfileBlock}>
                    <CustomButton btnTitle="Edit Profile" icon={false} handleRegister={this.EditProfile} />
                </View>

                <View style={styles.highlightsBlock}>
                    <Text style={styles.highlightText01}>Story Highlights</Text>
                    <Text style={styles.highlightText02}>Keep your favourite stories here</Text>

                    <TouchableOpacity style={styles.addBlock}>
                        <Image source={require('../assets/icons/add.png')} style={styles.add}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.LinkBlock}>
                    <TouchableOpacity style={true ? styles.gridBlock :styles.gridBlock02}>
                        <View>
                            <Image source={require('../assets/icons/grid.png')} style={ true ? null:styles.grid} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={false ? styles.gridBlock :styles.gridBlock02}>
                        <View>
                            <Image source={require('../assets/icons/cal.png')} style={ false ? null:styles.grid} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentsBlock}>
                    <Text style={styles.contentTitle}>Profile</Text>
                    <Text style={styles.message}>When you share photos & videos they'll be here</Text>
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
        flexDirection:'row'
    },

    usernmeBlock:{
        width:'80%',
        height:'100%',
        justifyContent:'center',
    },

    username:{
        marginLeft:'5%',
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
        borderBottomWidth:1,
    },

    gridBlock02:{
        width:'50%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },

    grid:{
        opacity:0.6
    },

    contentsBlock:{
        width:'96%',
        height:'35%',
        marginLeft:'2%',
    },

    contentTitle:{
        fontSize:35,
        alignSelf:'center',
        marginTop:'1%'
    },

    message:{
        alignSelf:'center',
        opacity:0.5
    },
})

const mapStateToProps=({profileInfo:{proDetails}})=>{
    return{
        proDetails
    }
}

export default connect(mapStateToProps)(ProfileScreen)

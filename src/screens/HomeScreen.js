import React,{Component} from 'react'
import { View, Text , StyleSheet , Image , TouchableOpacity,ScrollView,FlatList} from 'react-native'

import Post from '../components/Post'
import StoryComponent from '../components/StoryComponent'

import {database,fbase} from '../config/config'
import {connect} from 'react-redux'

import {setProDetails} from '../redux/actions/setProfileDetails'
import {launchCamera} from '../components/LaunchCamera'

class HomeScreen extends Component{
    state={
        posts:[],
        profilePicUrl:'',
        Imagefile:{
            filePath:null,
            fileData:null,
            fileUri:null
        },
        source:null
    }

    launchCameraComponent= ()=>{
        launchCamera()
    }

    componentDidMount(){
        const uid=fbase.auth().currentUser.uid
        var data=[]
        database.ref('Posts').child(uid).on('value',function(snapshot){
            snapshot.forEach(item => {
                var temp = { posts: item.val() };
                data.push(temp);
                return false;
            });
        })

        var url=''
        database.ref('ProfilePics').child(uid).child('Pic').on('value',function(snapshot){
            const exist=(snapshot.val()!==null)
            if(exist) url=snapshot.val()
        })

        this.setState({
            posts:data,
            profilePicUrl:url
        })

        this.props.setProDetails(url)
       
    }

    render(){
        return (
            <View>
                <View style={styles.header}>
                    <View style={styles.camera}>
                        <TouchableOpacity onPress={this.launchCameraComponent}>
                            <Image source={require('../assets/icons/camera.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleBlock}>
                        <Text style={styles.title}>Instagram</Text>
                    </View>

                    <View style={styles.message}>
                        <TouchableOpacity>
                            <Image source={require('../assets/icons/message.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.stories}>
                    <View style={styles.story}>
                        <StoryComponent pic={this.state.profilePicUrl}/>
                    </View>
                </View>

                <View style={styles.posts}>
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item=>item.posts.posted}
                        renderItem={({item})=>{
                          return <Post author={item.posts.author} url={item.posts.url}/>
                        }}
                    />    
                </View>
            </View>
        )
    }
}


const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:'10%',
        flexDirection:'row',
        borderBottomWidth:0.2,
        backgroundColor:'white'
    },

    camera:{
        width:'15%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },

    titleBlock:{
        width:'70%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },

    title:{
        fontFamily:'Precious',
        fontSize:35,
    },

    message:{
        width:'15%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },


    stories:{
        width:'100%',
        height:'15%',
        justifyContent:'center',
        backgroundColor:'white'
    },
    story:{
        width:'20%',
        height:'80%',
    },

    posts:{
        width:'100%',
        height:'75%',
    }
})

const mapDispatchToProps=dispatch=>{
    return{
        setProDetails:proDetails=>dispatch(setProDetails(proDetails))
    }
}

export default connect(null,mapDispatchToProps) (HomeScreen)

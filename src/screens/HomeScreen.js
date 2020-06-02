import React,{Component} from 'react'
import { View, Text , StyleSheet , Image , TouchableOpacity,ScrollView,FlatList} from 'react-native'

import Post from '../components/Post'
import StoryComponent from '../components/StoryComponent'

import {database,fbase} from '../config/config'
import {connect} from 'react-redux'

import {setProDetails} from '../redux/actions/setProfileDetails'
import ImagePicker from 'react-native-image-picker'

class HomeScreen extends Component{
    state={
        posts:[],
        profilePicUrl:'',
        source:''
    }

     options={
        storageOptions:{
            skipBackup:true,
            path:'images'
        }
    }

    launchCameraComponent= ()=>{
        ImagePicker.launchCamera(this.options,(response)=>{
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            }else{
                const source={uri:response.uri}
                this.setState({
                    source:source
                })
            } 
        })
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
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Direct')}>
                            <Image source={require('../assets/icons/message.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.stories}>
                    <View style={styles.story}>
                        {
                            this.state.source.uri !=='' ? <StoryComponent pic={this.state.source.uri}/> :                
                            this.state.profilePicUrl !=='' ? <StoryComponent pic={this.state.profilePicUrl}/> :
                            <StoryComponent pic=''/>
                        }
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

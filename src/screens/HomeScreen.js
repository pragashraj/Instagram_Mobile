import React,{Component} from 'react'
import { View, Text , StyleSheet , Image , TouchableOpacity,FlatList,RefreshControl} from 'react-native'

import Post from '../components/Post'
import StoryComponent from '../components/StoryComponent'

import {database,fbase} from '../config/config'
import {connect} from 'react-redux'

import {setProDetails} from '../redux/actions/setProfileDetails'
import ImagePicker from 'react-native-image-picker'
import Spinner from '../components/Spinner'

class HomeScreen extends Component{
    state={
        posts:[],
        profilePicUrl:'',
        source:{
            uri:''
        },
        refreshing:false,
        loading:true
    }

     options={
        storageOptions:{
            skipBackup:true,
            path:'images'
        }
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.fetchData()
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
                const date=new Date()
                const created={
                    Hour:date.getHours(),
                    Minutes:date.getMinutes(),
                    Date:date.getDate(),
                    Month:date.getMonth(),
                    Year:date.getFullYear()
                }
                const source={
                    uri:response.uri,
                    created
                }
                this.setState({
                    source:source
                })
            } 
        })
    }

    fetchData=()=>{
        const uid=fbase.auth().currentUser.uid
        var data=[]
        var url=''

        database.ref('User').child(uid).child('following').on('value',function(snapshot){
            snapshot.forEach(item => {
                database.ref('Posts').child(item.val().id).on('value',function(snapshot){
                    const exist=(snapshot.val()!==null)
                    if(exist){
                        snapshot.forEach(item => {
                            var temp = { posts: item.val() };
                            data.push(temp);
                        });
                    }                
                })
            });
        })

        database.ref('Posts').child(uid).on('value',function(snapshot){
            snapshot.forEach(item => {
                var temp = { posts: item.val() };
                data.push(temp);
            });
        })

        
        database.ref('ProfilePics').child(uid).child('Pic').on('value',function(snapshot){
            const exist=(snapshot.val()!==null)
            if(exist) url=snapshot.val()
        })

        this.setState({
            posts:data,
            profilePicUrl:url,
            refreshing: false,
            loading:false
        })

        this.props.setProDetails(url)
    }

    componentDidMount(){
        this.fetchData()
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
                    {
                        this.state.loading ? <Spinner size="large"/> :
                        <FlatList
                        data={this.state.posts}
                        keyExtractor={item=>item.posts.posted}
                        renderItem={({item})=>{
                        return <Post 
                                    navigation={this.props.navigation}
                                    post={item.posts}
                                />
                        }}

                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                    />  }
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

import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet,FlatList,TextInput,TouchableOpacity} from 'react-native'

import {database,fbase} from '../config/config'

class PostComments extends Component {

    state={
        ownComment:'',
        comments:null,
        likes:''
    }

    handleFetch=()=>{
        const id=this.props.route.params.post.id
        var commentsTmp=[]
        var likesTmp=0
        database.ref('PostStatistics').child(id).once('value').then(snapshot=>{
            snapshot.child('comments').forEach(item => {
                var temp = item.val()
                commentsTmp.push(temp);
            })
            this.setState({
                comments:commentsTmp
            })
        })

        database.ref('PostStatistics').child(id).once('value').then(snapshot=>{
            const exist=(snapshot.val()!==null)
            if(exist) likesTmp=snapshot.child('likes').child('count').val()
            this.setState({
                likes:likesTmp
            }) 
        })

    }


    handleInput=(e)=>{
        this.setState({
            ownComment:e
        })
    }

    sendComment=()=>{
        const id=this.props.route.params.post.id
        const uid=fbase.auth().currentUser.uid
        const ownCom=this.state.ownComment
        const commentId=Math.floor(Math.random()*1000)
        var details

        if(ownCom.length>0){
            database.ref('ProfileDetails').child(uid).on('value',function(snapshot){
                const exist=(snapshot.val()!==null)
                if(exist) details=snapshot.val()
            })
    
            const newComment={comment:this.state.ownComment,commentor:details.Username,commentId}
            database.ref('PostStatistics').child(id).child('comments').child(details.Username).set(newComment)
        }

        this.setState({
            ownComment:''
        })
        this.handleFetch()
    }

    componentDidMount(){
        this.handleFetch()
    }

    render() {
        return (
            <View>
                <View style={styles.postBlock}>
                    <View style={styles.head}>

                    </View>

                    <View style={styles.Image}>
                        <Image source={{uri:this.props.route.params.post.url}} style={styles.image} />
                    </View>

                    <View style={styles.likes}>
                        <Text style={styles.likesTxt}>Liked By {this.state.likes}</Text>
                        <Text >Comments.....</Text>
                    </View>

                    <View style={styles.comments}>
                        <FlatList
                                data={this.state.comments}
                                keyExtractor={item=>item.commentor}
                                renderItem={({item})=>{
                                    return <View style={styles.eachBlock}>
                                        <Text style={styles.commentor}>{item.commentor} : </Text>
                                        <Text style={styles.comTxt}> {item.comment}</Text>
                                    </View>
                                }}
                        />
                    </View>

                    <View style={styles.chatInputBlock}>
                        <TextInput
                            style={styles.chatInputField}
                            onChangeText={(e)=>this.handleInput(e)}
                            placeholder="Your comment Here"
                        />
                        <TouchableOpacity style={styles.sendImgBlock} onPress={this.sendComment}>
                            <Image 
                                source={require('../assets/icons/sendChat.png')} 
                                style={styles.sendImg}
                            />
                        </TouchableOpacity>
               </View>

                        
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({

    postBlock:{
        width:'96%',
        backgroundColor:'white',
        height:'96%',
        marginVertical:'2%',
        marginHorizontal:'2%',
        elevation:4
    },

    head:{
        width:'100%',
        height:10,
        backgroundColor:'silver'
    },

    Image:{
        width:'100%',
        height:280
    },

    image:{
        width:'100%',
        height:'100%',
    },

    likes:{
        width:'100%',
        height:50,
        backgroundColor:'lightgray',
        justifyContent:'center',
        paddingHorizontal:'3%',
    },

    likesTxt:{
        fontSize:15,
        fontWeight:'bold'
    },

    comments:{
        height:300,
        width:'100%',
        padding:'2%'
    },

    eachBlock:{
        marginBottom:'3%',
        flexDirection:'row',
    },

    commentor:{
        fontWeight:'bold'
    },

    comTxt:{
        fontSize:15
    },

    chatInputBlock:{
        width:'90%',
        height:50,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute', 
        bottom: '2%',
        borderWidth:0.3,
        borderRadius:20,
        marginHorizontal:'5%',
        backgroundColor:'white',
        elevation:3
    },

    chatInputField:{
        marginLeft:'5%',
        width:'80%',
        fontSize:18,
    },

    sendImgBlock:{
        width:'15%',
    },


    sendImg:{
        width:'100%',
        height:'80%'
    }


})

export default PostComments
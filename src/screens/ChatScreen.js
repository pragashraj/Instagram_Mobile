import React, { Component } from 'react'
import { Image, View,StyleSheet ,TextInput,TouchableOpacity,FlatList ,Alert } from 'react-native'

import Chat from '../components/Chat'
import {database,fbase} from '../config/config'
import Spinner from '../components/Spinner'

class ChatScreen extends Component {
    state={
        chatInput:'',
        chat:[],
        data:{},
        lastMsgId:0,
        loading:true       
    }

    renderChats=()=>{
        const myId=fbase.auth().currentUser.uid
        const uid=this.props.route.params.uid
        var messages=[]
        var dataContents={}
        var messagerId=uid
        var temp
        var lastMsgId

        database.ref('chats').child(myId).child(uid).once('value').then(snapshot=>{
            snapshot.forEach(item => {
                temp=item.val()
                const message=temp.message
                const type =temp.type
                lastMsgId=temp.id
                messages.push({message,type})
            })
            dataContents={messagerId,messages}
            
        }).then(()=>{
            const chatMsg=dataContents.messages
            const len=chatMsg.length
            var chatList=[]
            for(var i=0;i<len;i++){
                const chatData={key:(i+1).toString(),txt:chatMsg[i].message,styleType:chatMsg[i].type}
                chatList.push(chatData)
            }
    
            this.setState({
                chat:chatList,
                lastMsgId:lastMsgId,
                loading:false
            })
        }) 
    }

    componentDidMount(){
        this.renderChats()
    }

    handleInput=(e)=>{
        this.setState({
            chatInput:e
        })
    }

    renderAlert=(key,type)=>{
        const myId=fbase.auth().currentUser.uid
        const authorId=this.props.route.params.uid
        Alert.alert(
            "Alert",
            "Are You Sure To Delete this Message?",
            [
                {
                text: "cancel",onPress: () => console.log("Cancel Pressed")
                },
                { 
                    text: "oK", 
                    onPress: () =>{
                        if(type==="own"){
                            database.ref('chats').child(myId).child(authorId).child(key).remove()
                            database.ref('chats').child(authorId).child(myId).child(key).remove()
                            this.renderChats()
                        }
                    }
                }
            ],
            { cancelable: true }
        )
    }

    sendChatMessage=()=>{
        const message=this.state.chatInput
        const myId=fbase.auth().currentUser.uid
        const authorId=this.props.route.params.uid
        const id=this.state.lastMsgId + 1 ;

        const data1={authorId,id,message,type:"own"}
        const data2={authorId,id,message,type:"opo"}

        if(message.length > 0){     
             database.ref('chats').child(myId).child(authorId).child(id).set(data1)
             database.ref('chats').child(authorId).child(myId).child(id).set(data2)
             this.renderChats()
             this.setState({
                chatInput:''
             })
        }
    }

    render() {
        return (
            <View style={styles.container}>
               {
                this.state.loading ? <Spinner size="large"/>:   
                <FlatList
                    data={this.state.chat}
                    keyExtractor={item=>item.key}
                    renderItem={({item})=>{
                        return(
                            <View style={styles.chatContainer}>
                                <TouchableOpacity onLongPress={()=>this.renderAlert(item.key,item.styleType)}>
                                    <Chat txt={item.txt} styleType={item.styleType}/>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
               />
}
               <View style={styles.chatInputBlock}>
                    <TextInput
                        style={styles.chatInputField}
                        onChangeText={(e)=>this.handleInput(e)}
                        placeholder="Your Text Here"
                        defaultValue={this.state.chatInput}
                    />
                    <TouchableOpacity style={styles.sendImgBlock} onPress={this.sendChatMessage}>
                        <Image 
                            source={require('../assets/icons/sendChat.png')} 
                            style={styles.sendImg}
                        />
                    </TouchableOpacity>
               </View>

            </View>
        )
    }
}

const styles=StyleSheet.create({

    container:{
        backgroundColor:'white',
        flex:1
    },

    chatContainer:{
        width:'90%',
        marginHorizontal:'5%',
        marginTop:'5%'
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

export default ChatScreen
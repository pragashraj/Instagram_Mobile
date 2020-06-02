import React, { Component } from 'react'
import { Image, View,StyleSheet ,TextInput,TouchableOpacity,FlatList} from 'react-native'

import Chat from '../components/Chat'

class ChatScreen extends Component {
    state={
        chatInput:'',
        dummyChat:[
             { key:'0',txt:"Hi",styleType:"own"},
             { key:'1',txt:"Hi",styleType:"opo"},
             {key:'2',txt:"How are You?",styleType:"own"},
             { key:'3',txt:"Iam Fine How about You?",styleType:"opo"}]
    }

    handleInput=(e)=>{
        this.setState({
            chatInput:e
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    console.log(this.props.route.params.name)
                }
               <FlatList
                    data={this.state.dummyChat}
                    keyExtractor={item=>item.key}
                    renderItem={({item})=>{
                        return(
                            <View style={styles.chatContainer}>
                                <Chat txt={item.txt} styleType={item.styleType}/>
                            </View>
                        )
                    }}
               />

               <View style={styles.chatInputBlock}>
                    <TextInput
                        style={styles.chatInputField}
                        onChangeText={(e)=>this.handleInput(e)}
                        placeholder="Your Text Here"
                    />
                    <TouchableOpacity style={styles.sendImgBlock}>
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
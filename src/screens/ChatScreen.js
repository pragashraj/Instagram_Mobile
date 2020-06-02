import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'

import Chat from '../components/Chat'

class ChatScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                {
                    console.log(this.props.route.params.name)
                }
               <View style={styles.chatContainer}>
                    <Chat txt="Hi" styleType="own"/>
               </View>

               <View style={styles.chatContainer}>
                    <Chat txt="Hi" styleType="opo"/>
               </View>

               <View style={styles.chatContainer}>
                    <Chat txt="How are You?" styleType="own"/>
               </View>

               <View style={styles.chatContainer}>
                    <Chat txt="Iam Fine How about You?" styleType="opo"/>
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
})

export default ChatScreen
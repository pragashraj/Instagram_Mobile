import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

const Chat = ({txt,styleType}) => {
    return (
        <View style={styleType==="own" ? styles.conatiner01 :styles.conatiner02}>
            <View style={styles.chatBox}>
                <Text style={styleType==="own" ?styles.txtOwn : styles.txtOpponent}>{txt}</Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({

    conatiner01:{
        alignSelf:'flex-end',
    },

    conatiner02:{
        alignSelf:'flex-start'
    },


    chatBox:{
        borderWidth:0.4,
        borderRadius:10,
        padding:'4%',
        width:'50%',
        justifyContent:'center',
        alignItems:'center'
    },

    txtOwn:{
        fontSize:18
    },

    txtOpponent:{
        fontSize:18
    },

})

export default Chat

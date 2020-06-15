import React from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity } from 'react-native'

const MessageBox = ({navigation,newIndicator,item}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{
                const uid=item.messagerId
                navigation.navigate('Chats',{uid})}
            }>
                <View style={styles.block}>
                    <View style={styles.imageBlock}>
                        <Image source={require('../assets/icons/nonStory.png')} style={styles.image}/>
                    </View>
                
                    <View style={styles.nameBlock}>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                    
                    <View style={styles.newBlock}>
                        {
                           // newIndicator ? <Image source={require('../assets/icons/newMess.png')} style={styles.new}/> :null
                        }
                    </View>              
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({

    container:{
        marginBottom:'3%'
    },

    block:{
        backgroundColor:'white',
        width:'100%',
        height:60,
        flexDirection:'row',
        alignItems:'center',
        elevation:4
    },

    imageBlock:{
        width:'22%',
        height:60,
    },

    image:{
        width:'80%',
        height:'95%',
        marginLeft:'2%',
    },

    nameBlock:{
        width:'62%'
    },

    name:{
        marginLeft:'3%',
        fontSize:18
    },

    newBlock:{
        width:'10%',
        alignItems:'center',
        justifyContent:'center'
    },

    new:{
        width:20,
        height:20,
    },
})

export default MessageBox

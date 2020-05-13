import React from 'react'
import { View, Text , StyleSheet , Image , TouchableOpacity} from 'react-native'

import Post from '../components/Post'

const HomeScreen = () => {
    return (
        <View>
            <View style={styles.header}>
                <View style={styles.camera}>
                    <TouchableOpacity>
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
                <TouchableOpacity style={styles.addBlock}>
                    <Image source={require('../assets/icons/add.png')} style={styles.add}/>
                </TouchableOpacity>
            </View>
            <View style={styles.posts}>
                <Post/>
            </View>
        </View>
    )
}


const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:'10%',
        flexDirection:'row',
        borderBottomWidth:0.2,
        backgroundColor:'lightgray'
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
        height:'17%',
        justifyContent:'center'
    },
    posts:{
        width:'100%',
        height:'73%',
    }
})

export default HomeScreen

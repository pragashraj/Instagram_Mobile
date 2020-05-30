import React,{Component} from 'react'
import { View, Text , StyleSheet , Image , TouchableOpacity,ScrollView} from 'react-native'

import Post from '../components/Post'
import StoryComponent from '../components/StoryComponent'

import {database,fbase} from '../config/config'

class HomeScreen extends Component{
    state={
        posts:[]
    }

    componentDidMount(){
        const uid=fbase.auth().currentUser.uid
        let data
        database.ref('Posts').child(uid).on('value',function(snapshot){
            const exist=(snapshot.val()!==null)
            if(exist) data=snapshot.val()
        })

        this.setState({
            posts:data
        })
       
    }

    render(){
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
                    <View style={styles.story}>
                        <StoryComponent/>
                    </View>
                </View>

                <ScrollView style={styles.posts}>
                    {
                        this.state.posts.length > 0 ? <Post/> : console.warn(this.state.posts)
                    }
                </ScrollView>
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

export default HomeScreen

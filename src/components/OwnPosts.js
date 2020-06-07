import React, { Component } from 'react'
import { Text, View ,StyleSheet ,FlatList , Image} from 'react-native'

import {database,fbase} from '../config/config'

class OwnPosts extends Component {
    state={
        emptiness:false,
        posts:[]
    }

    componentDidMount(){
        this.fetchPosts()
    }


    fetchPosts=()=>{
        const uid=fbase.auth().currentUser.uid
        var data=[]

        database.ref('Posts').child(uid).on('value',function(snapshot){
            snapshot.forEach(item => {
                var temp = { posts: item.val() };
                data.push(temp);
                return false;
            });
        })

        this.setState({
            posts:data
        })

        console.warn(this.state.posts)

    }

    renderMessage=()=>{
        return(
            <View>
                <Text style={styles.contentTitle}>Profile</Text>
                <Text style={styles.message}>When you share photos & videos they'll be here</Text>
            </View>
        )
    }

    renderPosts=()=>{
        return(
            <View style={styles.PostsBlock}>
                    <FlatList
                        data={[1,2,3,4,5,6,7,8,9]}
                        keyExtractor={item=>item}
                        renderItem={({item})=>{
                            return (
                                <View style={styles.posts}>
                                    <Image source={require('../assets/icons/post.jpg')} style={styles.postContent}/>
                                </View>
                            )
                        }}
                        numColumns={3}
                    />
            </View>
        )
    }

    render() {
        return (
            <View>
                <View>
                    {
                        this.state.emptiness ? this.renderMessage(): this.renderPosts()
                    }
                </View>
            </View>
        )
    }
}



const styles=StyleSheet.create({

    
    contentTitle:{
        fontSize:35,
        alignSelf:'center',
        marginTop:'1%'
    },

    message:{
        alignSelf:'center',
        opacity:0.5
    },

    PostsBlock:{
        width:'100%',
    },

    posts:{ 
        flex: 1, 
        flexDirection: 'column', 
        borderWidth:0.2,
        margin:1
    },


    postContent:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 130,
        width:'100%',
        margin:1
    }

})

export default OwnPosts

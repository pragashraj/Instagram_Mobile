import React, { Component } from 'react'
import { Text, View ,StyleSheet , FlatList , TouchableOpacity ,RefreshControl ,Image} from 'react-native'

import {database,fbase} from '../config/config'
import Spinner from './Spinner'

class SavedPost extends Component {

    state={
        emptiness:true,
        posts:[],
        loading:false
    }



    fetchPosts=()=>{
        const myId=fbase.auth().currentUser.uid
        var posts=[]
        database.ref('SavedPosts').child(myId).once('value').then(snapshot=>{
            snapshot.forEach(item => {
                var temp = item.val()
                posts.push(temp);
            })

        if(posts.length>0){
            this.setState({
                posts:posts,
                emptiness:false
            })
        }

        })
    }

    componentDidMount(){
        this.fetchPosts()
    }



    renderMessage=()=>{
        return(
            <View>
                <Text style={styles.contentTitle}>Saved Posts</Text>
                <Text style={styles.message}>When you saved photos & videos , they'll be here</Text>
            </View>
        )
    }

    renderPosts=()=>{
        return(
            <View style={styles.PostsBlock}>
                {
                    this.state.loading ? <Spinner size="large"/>
                    : 
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item=>item.id}
                        renderItem={({item})=>{
                            return (
                                <View style={styles.posts}>
                                    <TouchableOpacity onPress={()=>{
                                        const post=item
                                        this.props.navigation.navigate('Comments',{post})
                                    }}>
                                        <Image source={{uri:item.url}} style={styles.postContent}/>
                                    </TouchableOpacity>
                                </View>
                                
                            )
                        }}
                        numColumns={3}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                    />
                }
            </View>
        )
    }

    render() {
        return (
            <View>
                <View>
                    {
                        this.state.emptiness ? this.renderMessage() : this.renderPosts()
                    }
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    
    contentTitle:{
        fontSize:30,
        alignSelf:'center',
        marginTop:'1%'
    },

    message:{
        alignSelf:'center',
        opacity:0.5
    },

    PostsBlock:{
        width:'100%',
        marginTop:'1%',
    },

    posts:{ 
        flex: 1, 
        flexDirection: 'column', 
        borderWidth:0.2,
        margin:1,
    },

    postContent:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 130,
        width:'100%',
        margin:1
    }



})

export default SavedPost
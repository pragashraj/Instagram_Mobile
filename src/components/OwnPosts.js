import React, { Component } from 'react'
import { Text, View ,StyleSheet ,FlatList , Image , RefreshControl,TouchableOpacity} from 'react-native'

import {database,fbase} from '../config/config'
import Spinner from './Spinner'

class OwnPosts extends Component {
    state={
        emptiness:true,
        posts:[],
        loading:false,
        refreshing:false,
    }

    componentDidMount(){
        this.fetchPosts()
    }


    fetchPosts=()=>{
        this.setState({
            loading:true
        })
        
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
            posts:data,
            emptiness:false,
            loading:false,
            refreshing: false
        })

    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.fetchPosts()
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

                {
                    this.state.loading ? <Spinner size="large"/>
                    : 
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item=>item}
                        renderItem={({item})=>{
                            return (
                                <View style={styles.posts}>
                                    <TouchableOpacity onPress={()=>{
                                        const post=item.posts
                                        this.props.navigation.navigate('Comments',{post})
                                    }}>
                                        <Image source={{uri:item.posts.url}} style={styles.postContent}/>
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
        marginTop:'1%'
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

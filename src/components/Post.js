import React, {Component } from 'react'
import { Text, View , StyleSheet , Image , TouchableOpacity , Alert} from 'react-native'
import {database,fbase} from '../config/config'

import {connect} from 'react-redux'

import {setPostStatistics} from '../redux/actions/firebaseActions'
import {setTodayActivities,setMonthActivities,clearTodayActivities} from '../redux/actions/AddActivity'

class Post extends Component {

    state={
        liked:false,
        likes:1,
        comments:null,
        stat:[],
        profilePicUrl:'',
        authorLiked:false
    }

    handleFetch=()=>{
        const id=this.props.post.id
        const myId=fbase.auth().currentUser.uid
        var commentsTmp=[]
        var likesTmp=0
        var authorLiked=false
        database.ref('PostStatistics').child(id).once('value').then(snapshot=>{
            snapshot.child('comments').forEach(item => {
                var temp = item.val()
                commentsTmp.push(temp);
            })
            this.setState({
                comments:commentsTmp
            })
        })

        database.ref('PostStatistics').child(id).once('value').then(snapshot=>{
            const exist=(snapshot.val()!==null)
            if(exist) likesTmp=snapshot.child('likes').child('count').val()
            if(exist) authorLiked=snapshot.child('likes').child(myId).val()
            this.setState({
                likes:likesTmp,
                authorLiked:authorLiked
            }) 
        })

    }

    fetchProfilePic=()=>{
        const authorId=this.props.post.authorId
        var url=''
        database.ref('ProfilePics').child(authorId).child('Pic').on('value',function(snapshot){
            const exist=(snapshot.val()!==null)
            if(exist) url=snapshot.val()
        })

        this.setState({
            profilePicUrl:url
        })
    }


    componentDidMount(){
        this.handleFetch()
        this.fetchProfilePic()
    }

    setTodayActivity=()=>{
        const date=new Date()
        this.props.setTodayActivities({
            id:date.toString(),
            date:{
                date:date.getDate(),
                hrs:date.getHours(),
                min:date.getMinutes()
            },
            act:"You have Liked a post on "+date.toString()
        })
    }

    setReducerState=()=>{
        const date=new Date()
        const data=this.props.todayActivities
        const len=data.length
        if( len > 0){
            if(date.getDate()-data[len-1].date.date>=1){
                this.props.setMonthActivities(data)
                this.props.clearTodayActivities()
                this.setTodayActivity()
            }else{
                this.setTodayActivity()
            }
        }else{
            this.setTodayActivity()
        }
    }


    handleLike=()=>{
        this.setState({
            liked:!this.state.liked
        })
        const id=this.props.post.id
        const myId=fbase.auth().currentUser.uid
        var counts
        if(!this.state.authorLiked){
            counts=this.state.likes + 1 ;
            database.ref('PostStatistics').child(id).child('likes').update({count:counts})
            database.ref('PostStatistics').child(id).child('likes').child(myId).set({liked:true})
            this.handleFetch()
            this.setReducerState()
        }else{
            counts=this.state.likes - 1;
            database.ref('PostStatistics').child(id).child('likes').update({count:counts})
            database.ref('PostStatistics').child(id).child('likes').child(myId).remove()
            this.handleFetch()
        }
    }


    savePost=(post,myId)=>{
        const postId=post.id
        database.ref('SavedPosts').child(myId).child(postId).set(post)
    }

    deletePost=(post,myId)=>{
        const postId=post.id
        var mystatistics={
            posts:0,
            followers:0,
            following:0
        }

        database.ref('Posts').child(myId).child(postId).remove()
        database.ref('PostStatistics').child(postId).remove()

        database.ref('Statistics').child(myId).on('value',function(snapshot){
            const exist=(snapshot.val()!==null)
            if(exist) mystatistics=snapshot.val()
        })            
        database.ref('Statistics').child(myId).update({posts:mystatistics.posts-1})
    }

    renderAlert=(title,msg,post,myId,func)=>{
        Alert.alert(
            title,
            msg,
            [
                {
                text: "cancel",onPress: () => console.log("Cancel Pressed")
                },
                { 
                    text: "oK", 
                    onPress: () =>{
                        func==="save" ?  this.savePost(post,myId) : 
                            func==="delete" ? this.deletePost(post,myId) : null
                    }
                }
            ],
            { cancelable: false }
        )
    }

    handleMoreBtn=()=>{
        const authorId=this.props.post.authorId
        const postId=this.props.post.id
        const myId=fbase.auth().currentUser.uid
        const post=this.props.post

        if(authorId!==myId){
            this.renderAlert("Alert!","Do You Want To Save this Post ? " ,post , myId,"save")
        }
        else
        {
            this.renderAlert("Alert!","Do You Like To Delete this Post ? " , post, myId,"delete")
        }
    }

    render(){
        return (
            <View>
                <View style={styles.postHeader}>
                    <View style={styles.proImageBlock}>
                        <Image 
                            source={this.state.profilePicUrl === '' ? require('../assets/icons/proImage.png')
                            :{uri:this.state.profilePicUrl}} 
                            style={styles.proImage}
                        />
                    </View>

                    <View style={styles.postHolderBlock}>
                        <Text style={styles.postHolder}>{this.props.post.author}</Text>
                    </View>

                    <View style={styles.moreBlock}>
                        <TouchableOpacity onPress={this.handleMoreBtn}>
                            <Image source={require('../assets/icons/more.png')} style={styles.moreImage}/>
                        </TouchableOpacity>
                    </View>
                       
                </View>

                <View style={styles.post}>
                    <Image source={{uri:this.props.post.url}} style={styles.postContent}/>
                </View>

                <View style={styles.userAction}>
                    <TouchableOpacity onPress={this.handleLike}>
                        <Image 
                            source={!this.state.authorLiked ? require('../assets/icons/like.png'):  require('../assets/icons/afterLiked.png')} 
                            style={styles.actions}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                        const post=this.props.post
                        const postLikes=this.state.likes
                        const postComments=this.state.comments
                        this.props.navigation.navigate('Comments',{post})
                    }}>
                        <Image source={require('../assets/icons/comments.png')} style={styles.actions}/>
                    </TouchableOpacity>

                </View>

                <View style={styles.likesCountBlock}>
                    <Text style={styles.likesCount}>Liked by  {this.state.likes} </Text>
                </View>

              

            </View>
        )
    }
}

const styles=StyleSheet.create({

    postHeader:{
        width:'100%',
        height:50,
        flexDirection:'row',
        alignItems:'center',
        borderTopWidth:0.2,
        backgroundColor:'white',
    },

    proImageBlock:{
        width:'15%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },

    proImage:{
        width:40,
        height:40,
        borderRadius:20
    },

    postHolderBlock:{
        width:'65%',
        height:'100%',
        justifyContent:'center',
    },

    postHolder:{
        fontSize:17,
    },

    moreBlock:{
        width:'20%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },

    post:{
        width:'100%',
        height:300,
    },

    postContent:{
        width:'100%',
        height:'100%',
    },

    userAction:{
        width:'100%',
        height:50,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:'2%'
    },

    actions:{
        marginLeft:'5%'
    },

    likesCountBlock:{
        width:'100%',
        height:30,
        justifyContent:'center',
        backgroundColor:'white'
    },

    likesCount:{
        marginLeft:'4%',
        fontSize:16,
    },
})

const mapStateToProps=({postStat:postsStat,activity:{todayActivities,monthActivities}})=>{
    return{
        postsStat,
        todayActivities,
        monthActivities
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        setPostStatistics:postData=>dispatch(setPostStatistics(postData)),
        setTodayActivities:ActivityData=>dispatch(setTodayActivities(ActivityData)),
        setMonthActivities:ActivityData=>dispatch(setMonthActivities(ActivityData)),
        clearTodayActivities:()=>dispatch(clearTodayActivities())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)
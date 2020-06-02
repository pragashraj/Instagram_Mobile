import React,{Component} from 'react'
import { View , StyleSheet , FlatList , Image} from 'react-native'

import CustomSearchBox from '../components/CustomSearchBox'

class SearchScreen extends Component {
    state={
        searchInput:''
    }
    
    handleSearchInput=(e)=>{
        this.setState({
            searchInput:e
        })
    }

    render(){
    return (
        <View style={styles.container}>
            <View style={styles.searchBlock}>
                <View style={styles.searchBox}>
                    <CustomSearchBox handleSearchInput={this.handleSearchInput}/>
                </View>
            </View>

            <View style={styles.postsBlock}>
                <FlatList
                    data={[1,2,3,4,5,6,7,8,9,10,11,12]}
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
            
        </View>
    )
}

}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white'
    },

    searchBlock:{
        width:'100%',
        height:80,
        justifyContent:'center',
        alignItems:'center',
    },

    searchBox:{
        width:'90%',
        height:'55%',
    },


    postsBlock:{
        width:'100%',
        height:'88%',
    },

    posts:{ 
        flex: 1, 
        flexDirection: 'column', 
        backgroundColor:'white',
        borderWidth:0.5,
        margin:1
    },

    postContent:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width:150,
        margin:1
    }
})

export default SearchScreen

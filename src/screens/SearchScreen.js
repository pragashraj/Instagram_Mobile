import React,{Component} from 'react'
import { View , StyleSheet , FlatList , Image ,Text} from 'react-native'

import CustomSearchBox from '../components/CustomSearchBox'
import {database,fbase} from '../config/config'

class SearchScreen extends Component {
    state={
        searchInput:'',
        data:[],
        searchedData:null
    }
    
    componentDidMount(){
        var data=[]
        database.ref('AppUsers').on('value',function(snapshot){
            snapshot.forEach(item => {
                var temp = item.val() 
                data.push(temp);
                return false;
            });
        })
        this.setState({
            data:data
        })
    }


    handleSearchInput=(e)=>{
        this.setState({
            searchInput:e
        })
    }

    renderPosts=()=>{
        return(
            <View style={styles.contentBlock}>
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
        )
    }

    fetchAppUsers=(searchInput)=>{

        const newData = this.state.data.filter(item => {     
             const itemData = `${item.name}`;    
             const textData = searchInput
             return itemData.indexOf(textData) > -1;    
          });

        console.warn(newData)
        // this.setState({
        //     searchedData:newData.name
        // })
    }

    renderSearchView=()=>{
        return(
            <View style={styles.contentBlock}>
                {
                    this.fetchAppUsers(this.state.searchInput)
                }
                {
                    // this.state.searchedData ? (
                    //     <Text>{this.state.searchedData.name}</Text>
                    // ) : null
                }
            </View>
        )
    }

    render(){
    return (
        <View style={styles.container}>
            <View style={styles.searchBlock}>
                <View style={styles.searchBox}>
                    <CustomSearchBox handleSearchInput={this.handleSearchInput}/>
                </View>
            </View>

            {
                this.state.searchInput.length > 0 ? this.renderSearchView() : this.renderPosts()
            }
            
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


    contentBlock:{
        width:'100%',
        height:'88%',
    },

    posts:{ 
        flex: 1, 
        flexDirection: 'column', 
        backgroundColor:'white',
        borderWidth:0.5,
        margin:1,
        width:'100%'
    },

    postContent:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width:'99%',
        margin:1
    }
})

export default SearchScreen

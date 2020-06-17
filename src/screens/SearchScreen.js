import React,{Component} from 'react'
import { View , StyleSheet , FlatList , Image ,Text ,TouchableOpacity,RefreshControl} from 'react-native'

import CustomSearchBox from '../components/CustomSearchBox'
import {database,fbase} from '../config/config'

class SearchScreen extends Component {
    state={
        searchInput:'',
        data:[],
        searchedData:null,
        noData:false,
        refreshing:false
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.fetchAppUsers()
    }

    fetchAppUsers=()=>{
        var data=[]
        database.ref('AppUsers').on('value',function(snapshot){
            snapshot.forEach(item => {
                var temp = item.val() 
                data.push(temp);
                return false;
            });
        })
        this.setState({
            data:data,
            refreshing: false
        })
    }
    
    componentDidMount(){
        this.fetchAppUsers()
    }


    handleSearchInput=(e)=>{
        this.setState({
            searchInput:e
        })
        const newData = this.state.data.filter(function(item) {
            const itemData = item.name;
            const textData = e.toLowerCase();
            return itemData.indexOf(textData) > -1;
          });
          this.setState({
            searchedData:newData
          });

    }

    handleNavigationToScreen=(id)=>{
        this.setState({
            searchInput:''
        });

        this.props.navigation.navigate('SearchedProfile',{id:id})
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
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                />
            </View>
            
        )
    }

  
    renderSearchView=()=>{
        return(
            <View style={styles.contentBlock}>
                {
                    this.state.searchedData !== null ? 
                    (
                        <FlatList
                            data={this.state.searchedData}
                            key={Math.floor(Math.random*1000)}
                            renderItem={({item})=>{
                                if(item.id === fbase.auth().currentUser.uid) return null
                                return(
                                   <TouchableOpacity onPress={()=>this.handleNavigationToScreen(item.id)}>
                                        <View style={styles.searchedItem}>
                                            <Image source={require('../assets/icons/proImage.png')} style={styles.searchedItemImage}/>
                                            <Text style={styles.searchedItemName}>{item.name}</Text>
                                        </View>
                                   </TouchableOpacity>
                                )
                            }}
                        />
                    ) : null
                }
            </View>
        )
    }

    render(){
    return (
        <View style={styles.container}>
            <View style={styles.searchBlock}>
                <View style={styles.searchBox}>
                    <CustomSearchBox handleSearchInput={this.handleSearchInput} values={this.state.searchInput}/>
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
    },

    searchedItem:{
        width:'96%',
        marginLeft:'2%',
        height:50,
        marginTop:'2%',
        elevation:4,
        borderWidth:0.2,
        flexDirection:'row',
        alignItems:'center'
    },

    searchedItemImage:{
        width:50,
        height:50,
        marginLeft:'5%'
    },

    searchedItemName:{
        fontSize:19,
        paddingLeft:'4%'
    },

})

export default SearchScreen

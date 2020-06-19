import React ,{Component} from 'react'
import { View, Text ,StyleSheet ,FlatList} from 'react-native'

import {connect} from 'react-redux'

class ActivityScreen extends Component {
    state={
        today:[],
        month:[]
    }

    componentDidMount(){
        this.setState({
            today:this.props.todayActivities,
            month:this.props.monthActivities
        })
    }

    render(){
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Activity</Text>
                </View>

                <View style={styles.newActivity}>
                    <Text style={styles.Text}>Today</Text>
                    {
                        this.state.today.length > 0  ? (
                            <FlatList
                                data={this.props.todayActivities}
                                keyExtractor={item=>item.id}
                                renderItem={({item})=>{
                                    return <View style={styles.todayList}>
                                        <Text style={styles.listDataText}>{item.act}</Text>
                                    </View>
                                }}
                            />
                        ):null
                    }
                </View>

                <View style={styles.oldActivity}>
                    <Text style={styles.Text}>This Month</Text>
                    {
                        this.state.today.length > 0  ? (
                            <FlatList
                                data={this.props.monthActivities}
                                keyExtractor={item=>item.id}
                                renderItem={({item})=>{
                                    return <View style={styles.todayList}>
                                        <Text style={styles.listDataText}>{item.act}</Text>
                                    </View>
                                }}
                            />
                        ):null
                    }
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:'10%',
        justifyContent:'center',
    },

    headerText:{
        fontSize:24,
        marginLeft:'3%'
    },

    newActivity:{
        width:'98%',
        height:'50%',
        marginLeft:'1%',
        backgroundColor:'white',
        elevation:6
    },

    Text:{
        fontSize:20,
        marginLeft:'3%',
        marginTop:'2%',
    },

    oldActivity:{
        width:'98%',
        height:'38%',
        marginTop:'2%',
        marginLeft:'1%',
        backgroundColor:'white',
        elevation:6
    },

    todayList:{
        padding:'2%',
        marginTop:'1%',
        backgroundColor:'lightgray',
        marginBottom:'1%',
        width:'98%',
        marginLeft:"1%",
        elevation:1,
        borderRadius:10
    },

    listDataText:{
        fontSize:13,
        color:'white',
        fontWeight:'bold'
    },

})

const mapStateToProps=({activity:{todayActivities,monthActivities}})=>{
    return{
        todayActivities,
        monthActivities
    }
}

export default connect(mapStateToProps) (ActivityScreen)

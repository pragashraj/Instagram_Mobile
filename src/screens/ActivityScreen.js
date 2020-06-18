import React ,{Component} from 'react'
import { View, Text ,StyleSheet ,FlatList} from 'react-native'

import {connect} from 'react-redux'

class ActivityScreen extends Component {
    state={
        today:[]
    }

    componentDidMount(){
        this.setState({
            today:this.props.todayActivities
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
                                data={this.state.today}
                                // keyExtractor={}
                                renderItem={({item})=>{
                                    return <View>
                                        {console.warn(item)}
                                    </View>
                                }}
                            />
                        ):console.warn(this.state.today.length)
                    }
                </View>

                <View style={styles.oldActivity}>
                    <Text style={styles.Text}>This Month</Text>
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
        marginTop:'2%'
    },

    oldActivity:{
        width:'98%',
        height:'38%',
        marginTop:'2%',
        marginLeft:'1%',
        backgroundColor:'white',
        elevation:6
    },

})

const mapStateToProps=({activity:{todayActivities}})=>{
    return{
        todayActivities
    }
}

export default connect(mapStateToProps) (ActivityScreen)

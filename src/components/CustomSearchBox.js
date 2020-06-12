import React, { Component } from 'react'
import { Text, View , TextInput , StyleSheet } from 'react-native'

class CustomSearchBox extends Component {
    state={
        inputValue:''
    }

    handleTextChange=(e)=>{
        this.setState({
            inputValue:e
        })
    }

    render() {
        return (
            <View style={{flex:1}}>
                <TextInput 
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInput}
                    placeholder="search"
                    onChangeText={(e)=>this.props.handleSearchInput(e)}
                    defaultValue={this.props.values}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    textInput:{
        backgroundColor:'lightgray',
        borderRadius:10,
        fontSize:18,
    }
})

export default CustomSearchBox
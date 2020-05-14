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
            <View>
                <TextInput 
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInput}
                    placeholder="search"
                    onChangeText={this.handleTextChange}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    textInput:{
        backgroundColor:'lightgray',
        width:'100%',
        height:'100%',
        borderRadius:10,
        fontSize:18,
        padding:'2%'
    }
})

export default CustomSearchBox
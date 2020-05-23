import React, { Component } from 'react'
import { Text, View ,StyleSheet,Image,ScrollView ,TouchableOpacity,TextInput,FlatList,Modal,TouchableHighlight} from 'react-native'

class EditProfile extends Component {
    state={
        Name:'',
        Username:'',
        Website:'',
        Bio:'',
        modalVisible:false
    }

    handleTextChange=(value,item)=>{
        this.setState({
            [item]:value
        })
    }

    renderInputField=()=>{
        const fields=["Name","Username","Website","Bio"]
        return(
            <FlatList
                data={fields}
                keyExtractor={item=>item}
                renderItem={({item})=>{
                    return(
                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder={item}
                            style={styles.inputField}
                            onChangeText={(e)=>this.handleTextChange(e,item)}
                        />
                    )
                }}
            />
        )
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Choose here</Text>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    this.setState({modalVisible:!this.state.modalVisible})
                                }}
                            >
                            <Text style={styles.textStyle}>camera</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <View style={styles.ImageSelector}>
                    <Image source={require('../assets/icons/user.png')} style={styles.image}/>
                    <TouchableOpacity onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}>
                        <Text style={styles.textLink}>Change Profile Photo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.editBlock}>
                    {
                        this.renderInputField()
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
    },

    ImageSelector:{
        width:'100%',
        height:170,
        alignItems:'center'
    },

    image:{
        width:'31%',
        height:'75%',
        marginTop:'2%'
    },

    textLink:{
        color:'blue',
        fontSize:20
    },

    editBlock:{
        width:'100%',
        height:430,
        padding:'4%',
        justifyContent:'space-between'
    },

    inputField:{
        borderBottomWidth:0.5,
        marginBottom:'8%'
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})

export default EditProfile
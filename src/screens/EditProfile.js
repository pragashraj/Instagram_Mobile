import React, { Component } from 'react'
import { Text, View ,StyleSheet,Image,ScrollView ,TouchableOpacity,TextInput,FlatList,Modal,TouchableHighlight} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import {connect} from 'react-redux'

import {database,storage,fbase} from '../config/config'
import {setProDetails} from '../redux/actions/setProfileDetails'


class EditProfile extends Component {
    state={
        Name:'',
        Username:'',
        Website:'',
        Bio:'',
        modalVisible:false,
        ImageFile:{
            filePath: null,
            fileData: null,
            fileUri: null
        }
    }

    options={
        storageOptions:{
            skipBackup:true,
            path:'images'
        }
    }

    saveImage=async()=>{
        const proDetails=this.state
        this.props.setProDetails(proDetails)
        const uid=fbase.auth().currentUser.uid
        const res=await fetch(this.state.ImageFile.fileUri)
        const blob=await res.blob()
        const filePath=uid+Math.floor(Math.random()*100)
        const ref=storage.ref('user/'+uid+'/profileImg').child(filePath.toString())
        var snapshot=ref.put(blob).on('state_changed',snapshot=>{
            console.log(snapshot.totalBytes)
        })
    }

    saveData= async()=>{
        const {Name,Username,Website,Bio}=this.state
        const details={Name,Username,Website,Bio}
        const uid=fbase.auth().currentUser.uid
        await database.ref(`User/${uid}/uid`).set(details)
    }

    launchCamera=()=>{
        ImagePicker.launchCamera(this.options,(response)=>{
            if (response.didCancel) {
                console.warn('User cancelled image picker');
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }else{
                const source={uri:response.uri}
                this.setState({
                    ImageFile:{
                        filePath: response,
                        fileData: response.data,
                        fileUri: response.uri
                    }
                })
            } 
        })
    }

    launchImageGallery=()=>{
        ImagePicker.launchImageLibrary(this.options,(response)=>{
            if (response.didCancel) {
                console.warn('User cancelled image picker');
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            }else{
                this.setState({
                    ImageFile: {
                        filePath: response,
                        fileData: response.data,
                        fileUri: response.uri
                    }
                })
            } 
        })
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
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    this.setState({modalVisible:!this.state.modalVisible})
                                    this.launchCamera()
                                }}
                            >
                            <Text style={styles.textStyle}>camera</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3",marginLeft:'2%'}}
                                onPress={() => {
                                    this.setState({modalVisible:!this.state.modalVisible})
                                    this.launchImageGallery()
                                }}
                            >
                            <Text style={styles.textStyle}>Gallery</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <View style={styles.ImageSelector}>
                    {
                        !this.props.proDetails.ImageFile.fileUri ? <Image source={require('../assets/icons/user.png')} style={styles.image}/>
                         :<Image source={{uri:this.props.proDetails.ImageFile.fileUri}} style={styles.image}/>
                    }
                    <TouchableOpacity onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}>
                        <Text style={styles.textLink}>Change Profile Photo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.editBlock}>
                    {
                        this.renderInputField()
                    }
                    <View style={styles.saveTextBlock}>
                        <TouchableOpacity onPress={()=>this.saveData()}>
                            <Text style={styles.saveText}>Save Info</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.saveImage()}>
                            <Text style={{...styles.saveText,paddingVertical:'2%'}}>Save Image</Text>
                        </TouchableOpacity>
                    </View>
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
        width:130,
        height:'75%',
        marginTop:'2%',
        borderRadius:65
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

    saveTextBlock:{
        justifyContent: "center",
        alignItems: "center",
    },

    saveText:{
        color:'blue',
        fontSize:20
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
        elevation: 5,
        flexDirection:'row'
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

const mapStateToProps=({auth:{user},profileInfo:{proDetails}})=>{
    return{
        user,
        proDetails
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        setProDetails:proDetails=>dispatch(setProDetails(proDetails))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditProfile)
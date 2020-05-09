import React from 'react'
import { View, Text ,StyleSheet , Image} from 'react-native'

import settingimage from '../../src/assets/icons/settingimage.png'
import CustomButton from '../components/CustomButton'

const ProfileScreen = () => {
    return (
        <View>
            <View style={styles.header}>
                <View style={styles.usernmeBlock}>
                    <Text style={styles.username}>user_name</Text>
                </View>
                <View style={styles.settings}>
                    <Image source={settingimage} style={styles.settingImage}/>
                </View>
            </View>

            <View style={styles.headerMain}>
                <View style={styles.profileImageBlock}>
                    <Image source ={require('../assets/icons/user.png')} style={styles.profileImage}/>
                </View>
                <View style={styles.counterBlock}>
                    <Text style={styles.counter}>10</Text>
                    <Text style={styles.counterText}>Posts</Text>
                </View>

                <View style={styles.counterBlock}>
                    <Text style={styles.counter}>22</Text>
                    <Text style={styles.counterText}>Followers</Text>
                </View>

                <View style={styles.counterBlock}>
                    <Text style={styles.counter}>51</Text>
                    <Text style={styles.counterText}>Following</Text>
                </View>

            </View>

            <View style={styles.editProfileBlock}>
                <CustomButton btnTitle="Edit Profile" />
            </View>

            <View style={styles.highlightsBlock}>
            </View>

            <View style={styles.LinkBlock}>
            </View>

            <View style={styles.contentsBlock}>
            </View>
        </View>
    )
}





const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:'9%',
        flexDirection:'row'
    },

    usernmeBlock:{
        width:'80%',
        height:'100%',
        justifyContent:'center',
    },

    username:{
        marginLeft:'5%',
        fontSize:25
    },

    settings:{
        width:'20%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },

    settingImage:{
        width: '50%',
        height: '50%',
    },

    headerMain:{
        width:'100%',
        height:'22%',
        flexDirection:'row'
    },

    profileImageBlock:{
        width:'31%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },

    profileImage:{
        width:110,
        height:110,
        borderRadius:55,
        overflow: "hidden",
    },

    counterBlock:{
        width:'22%',
        height:'100%',
        marginRight:'1%',
        justifyContent:'center',
        alignItems:'center',
    },

    counter:{
        fontSize:30
    },

    counterText:{
        fontSize:18
    },

    editProfileBlock:{
        width:'96%',
        height:'5%',
        marginLeft:'2%',
    },

    highlightsBlock:{
        width:'100%',
        height:'20%',
        backgroundColor:'blue'
    },

    LinkBlock:{
        width:'100%',
        height:'9%',
        backgroundColor:'silver'
    },

    contentsBlock:{
        width:'96%',
        height:'35%',
        marginLeft:'2%',
        backgroundColor:'violet'
    }
})


export default ProfileScreen

import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView,  StyleSheet, Image, Alert } from 'react-native';

import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TextInput, Button, } from 'react-native-paper';
import axios from "axios"

import AuthGlobal from "../../Context/store/AuthGlobal"
import { logoutUser } from "../../Context/actions/Auth.actions"
// import { useEffect } from 'react/cjs/react.development';
const baseURL = "https://blood-app-react-native.herokuapp.com/api/users/"
const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
   


    useEffect(() => {
       if (
            context.stateUser.isAuthenticated === false || 
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("new")
        }

        AsyncStorage.getItem("jwt")
            .then((res) => {
              axios.get(`${baseURL}/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${res}`
                },      
            })      
            .then((response) => {
              // console.log('response',response.data)
              setUserProfile(response.data)
      
            })
            .catch((error) => {
              Alert.alert("Logout Success")
      
            })
                    
            })
            .catch((error) => console.log(error))
            return () => {
            setUserProfile();
           }
    }, [context.stateUser.isAuthenticated])

    return (
       
           <ScrollView style={{backgroundColor: '#fff'}}>
              <View style={styles.card}>
                   <View >
                      <Image
                       resizeMode="contain"
                       style={{ height: 200, width: 200, marginLeft: 55, borderRadius: 100}} 
                       source={{ uri:userProfile ? userProfile.picture : "" }}
                      />
                    </View>
                    <Text style={{ fontSize: 30, fontWeight: "bold", color: "#000", marginLeft: 50 }}>
                        {userProfile ? userProfile.name : "" }
                    </Text>
                    
                    <View style={{ marginTop: 20 }}>
                            
                            <Text style={{ margin: 10,  fontSize: 20, fontWeight: "bold", color: "#000" }}>
                                Email: {userProfile ? userProfile.email : ""}
                            </Text>
                            <Text style={{ margin: 10, fontSize: 20, fontWeight: "bold", color: "#000" }}>
                                Phone: {userProfile ? userProfile.phone : ""}
                            </Text>
                            <Text style={{ margin: 10, fontSize: 20, fontWeight: "bold", color: "#000" }}>
                                Address: {userProfile ? userProfile.address : ""}
                            </Text>
                            <Text style={{ margin: 10, fontSize: 20, fontWeight: "bold", color: "#000" }}>
                                Blood: {userProfile ? userProfile.blood : ""}
                            </Text>
                            
                            
                    </View>
                    
               
               
                    <View>
                                    <Button  mode="contained" onPress={() => [
                                        AsyncStorage.removeItem("jwt"),
                                        logoutUser(context.dispatch)
                                    ]}>Sign Out</Button>
                    </View>
            </View>  
        </ScrollView>
       
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 70,
        marginHorizontal: 30,
        backgroundColor: "#fff",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.75,
        shadowRadius: 6.84,
  
        elevation: 5,
       
    },
   
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
})

export default UserProfile;


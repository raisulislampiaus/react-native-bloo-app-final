import React, { useState, useEffect } from "react"
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform
} from "react-native"
import { Item, Picker } from "native-base"
import FormContainer from "../../Shared/Form/FormContainer"
import Input from "../../Shared/Form/Input"
import EasyButton from "../../Shared/StyledComponents/EasyButton"
import Error from "../../Shared/Error"
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-community/async-storage"
import baseURL from "../../assets/common/baseUrl"
import axios from "axios"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from "expo-image-picker"
import mime from "mime";
import {  Button, } from 'react-native-paper';

const options ={
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      
    },
  }



const ProductForm = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [picture, setPicture] = useState("");
    const [blood, setBlood] = useState("");
    const [address, setAddress] = useState("");
    const [modal,setModal] = useState(false)
    const [loader, setLoader] = useState(false)
    const [mainImage, setMainImage] = useState();

    const pickImage = async () => {
        let result = await launchImageLibrary(options);

        if (!result.cancelled) {
            setMainImage(result.uri);
            setImage(result.uri);
        }
    };

    const submitData = ()=>{

        let formData = new FormData();

        const newImageUri = "file:///" + image.split("file:/").join("");

        formData.append("picture", {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        });
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("blood", blood);
        
    
        fetch("https://blood-app-react-native.herokuapp.com/api/users",{
            formData,
            method:"post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              
                name,
                email,
                password,
                phone,
                picture,
                blood,
                address
            }),
            
            
        })
        .then(setLoader(true))
        .then(res=>res.json())
        .then(data=>{
            
            Alert.alert(`${data.name} is saved successfuly`)
            props.navigation.navigate("Login");
            
        })
        .catch(err=>{
          Alert.alert("someting went wrong")
      })
    }

    return (
        <ScrollView style={styles.mainOne}>
        {/* <Image 
           source={{uri: imagebg}}
           style={StyleSheet.absoluteFillObject}
        /> */}
          <View style={styles.imageContainer}>
               <Image style={styles.image} source={{uri: mainImage}}/>
               <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
         </View>
        <View style={styles.main}>
           <Text style={styles.textOne}>Welcome To</Text>
           <Text  style={styles.textTwo}>SignUp</Text>
           <Text  style={styles.textThree}>Create Account</Text>
        </View>
       <KeyboardAwareScrollView
       viewIsInsideTabBar={true}
       extraHeight={200}
       enableOnAndroid={true}
      >
         <SafeAreaView style={styles.container}>
           <TextInput
             placeholder={"Enter Name"}
             style={styles.input}
             onChangeText={(text) => setName(text)}
             value={name}
           />
           <TextInput
             placeholder={"Enter Email"}
             style={styles.input}
             onChangeText={(text) => setEmail(text)}
             value={email}
           />
           <TextInput
             style={styles.input}
             secureTextEntry={true} 
             onChangeText={(text) => setPassword(text)}
             value={password}
             placeholder={"Enter Password"}
             
           />
           <TextInput
             style={styles.input}
             onChangeText={(text) => setPhone(text)}
             value={phone}
             placeholder={"Enter Phone Number"}
             
           />
           <TextInput
             style={styles.input}
             onChangeText={(text) => setBlood(text)}
             value={blood}
             placeholder={"Enter Blood Group"}
             
           />
           <TextInput
             style={styles.input}
             onChangeText={(text) => setAddress(text)}
             value={address}
             placeholder={"Enter You'r Current Address"}
           
           
           />
           <View style={styles.upload}>
             <Text style={{ marginLeft: 70, fontSize: 15, fontWeight: '700', color: "red", margin: 5}}>
               {picture==""?"":"Upload Complete"}
             </Text>
             
             <Button
               mode="contained"
               icon={picture==""?"upload":"check"}
               onPress={ openGallery }
               onChangeText={(text) => setPicture(text)}
               value={picture}
             >
               upload You'r picture
             </Button>
           </View>
           <View style={styles.submit}>
           <Button mode="contained"  onPress={() => submitData() && handleSubmit()}>Submit</Button>
           </View>
           
         </SafeAreaView>
       </KeyboardAwareScrollView>
         <View style={styles.login}>
           <Text style={styles.TextFive}>Already have a Account ?</Text>
           <Button mode="contained" onPress={() => props.navigation.navigate("Login")} >Login</Button>
         </View>
         {loader ? <Loader /> : null}
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white"
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    }
})

export default ProductForm;
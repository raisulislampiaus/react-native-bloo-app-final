import React from 'react'
import { View, StyleSheet,Dimensions, Image, Text, TouchableOpacity } from 'react-native';
// import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';
var { width } = Dimensions.get("window");

import { useNavigation } from '@react-navigation/native';

const SearchedUsers = (props) => {
    const { productsFiltered } = props;
    const navigation = useNavigation();
    return (
        <View style={{ width: width }}>
          { productsFiltered.length > 0 ? (
               productsFiltered.map((item) => (
                <TouchableOpacity
                  onPress={() => 
                    navigation.navigate("Details", { item: item})
                  }
                  key={item._id}
                  avatar
                >
                        <View style={styles.main}>
                          <View>
                            <Image  style={styles.image}
                              resizeMode="contain"
                              source={{ uri: item.picture ? 
                              item.picture : 'https://github.com/raisulislampiaus/raisulislampiaus/blob/main/Avatar-PNG-Free-Download.png?raw=true' 
                                      }}
                            />
                          </View >
                          <View >
                              <Text style={styles.name}>Name: 
                                {item.name.length > 15 ? item.name.substring(0, 15 - 3)
                                    + '...' : item.name
                                }
                              </Text>
                              <View style={styles.textContainer}>
                                <Text style={styles.text}>Blood:{item.blood}</Text>
                                <Text style={styles.text}>phone:{item.phone}</Text>
                                
                            </View>
                          </View>
                        </View>
                  </TouchableOpacity>
               ))
          ) : (
              <View style={styles.center}>
                <Text style={{ alignSelf: 'center' }}>
                  No Blood Match
                </Text>
              </View>
          )}
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    main: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      marginHorizontal: 10,
      marginBottom: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset:{
        width: 0,
        height: 10,
      },
      shadowOpacity: .3,
      shadowRadius: 20,
      padding: 5
  
    },
    image:{
      width:100,
      height: 100,
      borderRadius: 50
    },
    name: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#000",
      marginLeft: 10,
      marginTop: 5
    },
    textContainer: {
      marginLeft: 10,
      marginTop: 5,
      
    },
    text: {
      fontSize: 15,
      color: "#000",
      fontWeight: "700",
    }
})

export default SearchedUsers

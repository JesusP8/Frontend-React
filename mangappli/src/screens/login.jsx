import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, Text, Image, TextInput } from "react-native";
import { globalStyles } from "../styles/global";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [password, setPass] = useState("");
  const [key, setKey] = useState("");
  const [value, onChangeValue] = useState("");
  const [userState, setUserState] = useState("");

  const skip = async () => {
    navigation.navigate("HomeTabs");
    await AsyncStorage.setItem("user", "Guest User");
  };

  const login = async () => {
    if (user == "" || password == "") {
      return alert("Missing fields");
    }
    axios
      .post("https://backendcomic-aj.herokuapp.com/login", {
        username: user.toLowerCase(),
        password: password,
      })
      .then(async (response) => {
        console.log(response.data);
        //await save("user", user);
        await AsyncStorage.setItem("user", user.toLowerCase());
        await AsyncStorage.setItem("token", response.data.token);
        //const value = await AsyncStorage.getItem("token");
        //console.log(value);
        return navigation.navigate("HomeTabs");
      })
      .catch((error) => {
        console.log(error);
        return alert("User not found");
      });
  };

  const register = async () => {
    //console.log(gg);
    navigation.navigate("Register");
  };
  //dispatch(setUser("derick"));

  return (
    <View
      style={
        (style = {
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        })
      }
    >
      <Image
        source={require("../../assets/mangaLogo.png")}
        style={(style = { width: 200, height: 200, marginTop: 70 })}
      ></Image>
      <View
        style={(style = { alignItems: "center", width: "100%", marginTop: 30 })}
      >
        <TextInput
          style={globalStyles.input}
          onChangeText={(newText) => setUser(newText)}
          placeholder={"Username"}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          style={globalStyles.input}
          onChangeText={(newText) => setPass(newText)}
          placeholder={"Password"}
        ></TextInput>
        <View
          style={
            (style = {
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "100%",
              width: "70%",
            })
          }
        >
          <View style={globalStyles.btnView}>
            <Button color="crimson" title="Login" onPress={login} />
          </View>
          <View style={globalStyles.btnView}>
            <Button color="crimson" title="Skip" onPress={skip} />
          </View>
        </View>
      </View>
      <Text
        style={(style = { color: "blue", marginTop: 15 })}
        onPress={register}
      >
        {" "}
        Don't have an account?
      </Text>
      <Image
        source={require("../../assets/pagoda.png")}
        style={
          (style = {
            width: "100%",
            height: 300,
          })
        }
      ></Image>
    </View>
  );
}

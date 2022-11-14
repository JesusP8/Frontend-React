import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, Text, Image, TextInput } from "react-native";
import { globalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function RegisterScreen({ navigation }) {
  const [username, setUser] = useState("");
  const [clave, setPass] = useState("");
  const [nombre, setName] = useState("");
  const [correo, setCorreo] = useState("");
  const [status, setStatus] = useState("");

  const skip = async () => {
    navigation.navigate("HomeTabs");
    await AsyncStorage.setItem("user", "Guest User");
  };

  const register = async () => {
    try {
      if (username == "" || clave == "" || nombre == ""|| correo == "") {
        return alert("Missing fields");
      }
      var res = await axios.post(
        "https://backendcomic-aj.herokuapp.com/register",
        {
          nombre: nombre,
          username: username.toLowerCase(),
          clave: clave,
          correo: correo,
        }
      );

      if (res) {
        console.log("User registered");
        console.log(res.data);
        console.log(res.status);
        return navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
      alert("User already exists");
    }
  };

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
        style={(style = { width: 200, height: 200, marginTop: 100 })}
      ></Image>
      <View
        style={(style = { alignItems: "center", width: "100%", marginTop: 25 })}
      >
        <TextInput
          style={globalStyles.input}
          onChangeText={(newText) => setName(newText)}
          placeholder={"Name"}
        ></TextInput>
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

<TextInput
          secureTextEntry={true}
          style={globalStyles.input}
          onChangeText={(newText) => setCorreo(newText)}
          placeholder={"Correo"}
        ></TextInput>
      </View>
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
          <Button color="crimson" title="Register" onPress={register} />
        </View>
        <View style={globalStyles.btnView}>
          <Button color="crimson" title="Skip" onPress={skip} />
        </View>
      </View>
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

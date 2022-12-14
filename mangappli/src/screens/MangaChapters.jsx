import {
  SafeAreaView,
  Image,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { globalStyles } from "../styles/global";

import { useNavigation } from "@react-navigation/native";
import CardManga from "../components/CardManga";

const MangaChapters = ({ route }) => {
  const navigation = useNavigation();

  const id = route.params.paramKey;
  const cover = route.params.pic;
  const title = route.params.heading;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [chapters, setChapters] = useState(null);

  const getMangasChapters = async () => {
    try {
      const res = await axios.get(
        "" + id
      );
      //console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const followManga = async () => {
    try {
      var followed = await axios.post(
        ``,
        {
          id: id,
        }
      );
      console.log(followed.data);
      alert("Manga Followed");
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowManga = async () => {
    try {
      console.log(id);
      var unfollowed = await axios.delete(
        ``,
        {
          data: { id: id },
        }
      );
      console.log(unfollowed.data);
      alert("Manga Unfollowed");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const stored = await AsyncStorage.getItem("user");
        const storedToken = await AsyncStorage.getItem("token");
        setToken(storedToken);
        setUser(stored);
      } catch (error) {
        console.log(error);
      }
    };
    checkUser().catch(console.error);
  }, []);

  useEffect(() => {
    let isMounted = true;
    getMangasChapters().then((response) => {
      if (isMounted) {
        if (response == "No Chapters found") {
          setChapters(null);
        } else {
          setChapters(response);
        }
        console.log(chapters);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const _renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={
            (style = {
              padding: 5,
              margin: 5,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "gray",
              width: "70%",
              alignSelf: "center",
            })
          }
          onPress={() =>
            navigation.navigate("ChapterPages", {
              mangaId: item._id,
              chapter: item.number,
              title: title,
              user: user,
              token: token,
            })
          }
        >
          <Text style={styles.chapterNumber}>{item.number}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
        padding: 5,
      }}
    >
      <Text
        style={
          (style = {
            alignSelf: "center",
            fontSize: 16,
            fontWeight: "bold",
            margin: 15,
          })
        }
      >
        {title.toUpperCase()}
      </Text>
      <Image
        source={{
          uri: cover,
          alignSelf: "center",
          resizeMode: "contain",
          width: 390,
          height: 300,
        }}
      />
      <Text
        style={
          (style = {
            alignSelf: "center",
            fontSize: 16,
            fontWeight: "bold",
            margin: 15,
          })
        }
      >
        Chapters
      </Text>

      <View style={(style = { flex: 1, width: "100%" })}>
        {chapters ? (
          <FlatList
            horizontal={false}
            data={chapters}
            renderItem={_renderItem}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <Text style={(style = { alignSelf: "center", marginTop: 20 })}>
            No Chapters Added Yet. Sorry!
          </Text>
        )}
      </View>

      <View
        style={
          (style = {
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "center",
          })
        }
      >
        <View
          style={(style = { marginTop: 5, marginRight: 10, marginLeft: 20 })}
        >
          <Button color="crimson" title="Follow" onPress={followManga} />
        </View>
        <View style={globalStyles.btnView}>
          <Button color="crimson" title="Unfollow" onPress={unfollowManga} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chapterNumber: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default MangaChapters;

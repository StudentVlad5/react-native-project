import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button, Text } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/config";

export const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    const allPosts = await getDocs(collection(db, "posts"));
    const arrowAllPost = [];
    allPosts.forEach((doc) => {
      arrowAllPost.push({ ...doc.data(), id: doc.id });
      setPosts(arrowAllPost);
    });
  };

  useEffect(() => {
    if (route.params) {
      setTimeout(()=>{getAllPost()},100);
      route.params = null
    }
  }, [route.params]);

  useEffect(() => {
   getAllPost()}, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
            />
            <View>
              <Text>{item.comment}</Text>
            </View>
            <View style={styles.container_btn}>
              <Button
                style={styles.btn}
                title="перейти до карти"
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              />
              <Button
                style={styles.btn}
                title="перейти до коментарів"
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  container_btn: {
    padding: 5,
  },
  btn: {
    margin: 5,
  },
});

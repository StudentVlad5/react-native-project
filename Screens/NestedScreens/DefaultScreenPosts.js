import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button } from "react-native";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../Firebase/config";

export const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    const allPosts = await getDocs(collection(db, "posts"));
    console.log("allPosts", allPosts);
    const arrowAllPost = [];
    allPosts.forEach((doc) => {
      arrowAllPost.push({ ...doc.data(), id: doc.id });
      setPosts(arrowAllPost);
    });
  };

  useEffect(() => {
    getAllPost();
  }, []);

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
          </View>
        )}
      />
      <Button
        title="перейти до карти"
        onPress={() => navigation.navigate("Map")}
      />
      <Button
        title="перейти до коментарів"
        onPress={() => navigation.navigate("Comments")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});

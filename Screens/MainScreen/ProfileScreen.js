import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../Firebase/config";
import { collection, getDocs, where, query } from "firebase/firestore";

export const ProfileScreen = ({ route, navigation }) => {

  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      getUserPosts();
    }, 100);
  }, []);

  useEffect(() => {
    if (route.params) {
      setTimeout(()=>{getUserPosts()},100);
      route.params = null
    }
  }, [route.params]);

  const getUserPosts = async () => {
 
    const userProfilePosts = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(userProfilePosts);
   
    const arrowProfilePosts = [];
    querySnapshot.forEach((doc) => {
      arrowProfilePosts.push({ ...doc.data(), id: doc.id });
    });
      setUserPosts(arrowProfilePosts);

  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userPosts}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

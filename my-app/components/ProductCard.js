import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import React from "react";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard({ product }) {
  const navigation = useNavigation();
  function goToDetailProduct(id) {
    navigation.navigate("Product", { id });
  }
  return (
    <View>
      <TouchableHighlight onPress={() => goToDetailProduct(product.id)}>
        <Card.Image style={styles.image} source={{ uri: product.image }} />
      </TouchableHighlight>
      <Text style={styles.text}>{product.title}</Text>
      <Text style={styles.text}>Price: $.{product.price}</Text>
      <Text style={styles.text}>Rating: {product.rating.rate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F2C67",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 40,
  },
  text: {
    fontSize: 15,
    color: "black",
    marginBottom: 3,
    marginLeft: 25,
    paddingTop: 4,
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    width: 100,
  },
  image: {
    height: 150,
    width: 100,
    marginTop: 25,
    marginLeft: 20,
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

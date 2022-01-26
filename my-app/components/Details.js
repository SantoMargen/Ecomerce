import { Text, View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Card, Button } from "react-native-elements";
import { useQuery } from "react-query";

export default function DetailProduct({ route }) {
  const { id } = route.params;
  const { isLoading, isError, data } = useQuery(["product", id], () =>
    fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json())
  );
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Text>Error...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Card>
        <Card.Title style={styles.heading}>{data.title}</Card.Title>
        <Card.Divider />

        <Card.Image
          style={styles.image}
          source={{ uri: data.image }}
        ></Card.Image>
        <Text style={styles.text}>Price: $.{data.price}</Text>
        <Text style={styles.text}>Category: {data.category}</Text>
        <Text style={styles.text}>Description: {data.description}</Text>
        <Text style={styles.text}>
          Rating: {data.rating.rate} / {data.rating.count}
        </Text>
      </Card>
      <View
        style={{ width: 200, height: 50, marginLeft: "45%", marginTop: "5%" }}
      >
        <Button title="Tambahkan ke keranjang"></Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  heading: {
    fontSize: 40,
    marginBottom: 0,
    color: "#142F43",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  image: {
    height: 300,
    width: 200,
    marginBottom: 20,
    marginLeft: "18%",
  },
  text: {
    fontSize: 15,
    display: "flex",
    flexDirection: "column",
    marginBottom: 5,
  },
  bigText: {
    fontSize: 20,
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    color: "#161616",
  },
  imageSmall: {
    height: 70,
    width: 70,
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 3,
  },
  boxImage: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
  },
  cart: {
    fontSize: 20,
  },
});

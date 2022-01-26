import { View, StyleSheet, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Card } from "react-native-elements";
import { useQuery } from "react-query";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const fetchProducts = async () => {
  const URL = "https://fakestoreapi.com/products";
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error("fatching data Fail");
  }
  return await response.json();
};

export default function Home() {
  const { isLoading, isError, data, isSuccess, isFetching } = useQuery(
    "product",
    fetchProducts
  );
  if (isLoading) {
    return (
      <View>
        <Text>Loading ...</Text>
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
      <View style={styles.container}>
        {data.map((product) => {
          return <ProductCard product={product} key={product.id}></ProductCard>;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9AD0EC",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 40,
  },
});

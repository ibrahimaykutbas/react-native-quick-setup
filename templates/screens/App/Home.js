module.exports = `
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

`

import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';

export const Loading = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size={50} color="grey" />
      <Text>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

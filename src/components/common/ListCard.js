import React from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ListCard({
  left,
  children,
  right,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {left}

      <View style={styles.content}>
        {children}
      </View>

      {right}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  content: {
    flex: 1,
    marginLeft: 15,
  },
});
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { IconButton }
  from 'react-native-paper';

export default function ListHeader({
  title,
  total,
}) {
  return (
    <>
      <View style={styles.headerButtons}>
        <IconButton
          icon="cog-outline"
          size={26}
        />

        <IconButton
          icon="magnify"
          size={26}
        />
      </View>

      <View style={styles.titleArea}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {total} resultados
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  titleArea: {
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 14,
    color: '#888',
  },
});
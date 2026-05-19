import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function CustomerCard({
  customer,
  onPress,
}) {
  const firstLetter = customer?.nome?.charAt(0)?.toUpperCase() || '?';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {firstLetter}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>
          {customer.nome}
        </Text>

        <Text style={styles.phone}>
          {customer.telefone}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 16,
    marginBottom: 16,

    borderRadius: 18,

    backgroundColor: '#FFF',
  },

  avatar: {
    width: 55,
    height: 55,

    borderRadius: 28,

    backgroundColor: '#FFE5EE',

    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF0054',
  },

  content: {
    marginLeft: 16,
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },

  phone: {
    marginTop: 4,

    fontSize: 13,
    color: '#777',
  },
});
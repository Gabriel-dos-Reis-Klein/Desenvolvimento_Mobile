import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import OrderIcon from './OrderIcon';
import OrderStatusBadge
  from './OrderStatusBadge';

export default function OrderCard({
  order,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <OrderIcon
            type={order.tipoServico}
          />
        </View>

        <OrderStatusBadge
          status={order.status}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text
          numberOfLines={2}
          style={styles.title}
        >
          {order.descricaoPeca}
        </Text>

        <Text style={styles.subtitle}>
          {`${order.tipoServico} • ${order.status}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  iconContainer: {
    position: 'relative',
  },

  iconCircle: {
    width: 55,
    height: 55,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    flex: 1,
    marginLeft: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },

  subtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 3,
  },
});
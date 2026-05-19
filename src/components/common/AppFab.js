import React from 'react';

import { FAB }
  from 'react-native-paper';

export default function AppFab({
  icon = 'plus',
  onPress,
}) {
  return (
    <FAB
      icon={icon}
      color="white"
      style={{
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#FF3366',
      }}
      onPress={onPress}
    />
  );
}
import React from 'react';

import { ActivityIndicator }
  from 'react-native';

export default function Loading() {
  return (
    <ActivityIndicator
      size="large"
      color="#FF0050"
      style={{
        marginTop: 50,
      }}
    />
  );
}
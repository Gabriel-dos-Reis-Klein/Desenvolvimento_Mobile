import { View, Animated, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { SPACING } from '../../theme';

export default function CustomerSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <View style={styles.container}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Animated.View
          key={i}
          style={[styles.card, { opacity }]}
        >
          <View style={styles.avatar} />
          <View style={styles.content}>
            <View style={styles.lineShort} />
            <View style={styles.lineLong} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D1D5DB',
    marginRight: SPACING.md,
  },

  content: {
    flex: 1,
    gap: 6,
  },

  lineShort: {
    width: '40%',
    height: 10,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
  },

  lineLong: {
    width: '70%',
    height: 10,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
  },
});
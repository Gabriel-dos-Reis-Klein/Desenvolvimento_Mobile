import { StyleSheet, View, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { SPACING, RADIUS } from '../../theme';

export default function OrderSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 600,
          useNativeDriver: true,
          isInteraction: false,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
          isInteraction: false,
        }),
      ])
    ).start();
  }, [opacity]);

  const skeletonItems = Array.from({ length: 5 });

  return (
    <View style={styles.container}>
      {skeletonItems.map((_, index) => (
        <Animated.View key={index} style={[styles.card, { opacity }]}>
          <View style={styles.mainRow}>
            <View style={styles.iconCirclePlaceholder} />

            <View style={styles.contentContainer}>
              <View style={styles.titlePlaceholder} />
              
              <View style={styles.footerRow}>
                <View style={styles.clientPlaceholder} />
                <View style={styles.badgesGroup}>
                  <View style={styles.badgePlaceholder} />
                  <View style={styles.badgePlaceholder} />
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg || 16,
  },
  card: {
    paddingVertical: SPACING.md || 12,
    marginBottom: SPACING.xs || 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCirclePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md || 12,
    backgroundColor: '#e9ecef',
  },
  contentContainer: {
    flex: 1,
    marginLeft: SPACING.md || 12,
    gap: 8,
  },
  titlePlaceholder: {
    width: '65%',
    height: 16,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clientPlaceholder: {
    width: '35%',
    height: 12,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
  },
  badgesGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  badgePlaceholder: {
    width: 45,
    height: 16,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
  },
});
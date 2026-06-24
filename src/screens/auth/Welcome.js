import { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';

import { COLORS, SPACING } from '../../theme';
import Button from '../../components/common/Button';

export default function Welcome({ navigation }) {
  const confettiRef = useRef(null);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStart = () => {
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: -10, y: 0 }}
        fallSpeed={3000}
        fadeOut={true}
        autoStart={true}
      />

      <Animated.View 
        style={[
          styles.content, 
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
        ]}
      >
        <Text style={styles.title}>Bem-vindo(a)! 🎉</Text>
        <Text style={styles.subtitle}>Seu cadastro foi realizado com sucesso.</Text>

        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/welcome-image.png')} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <Button 
          title="Vamos Começar" 
          onPress={handleStart} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary || '#000',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  imageContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: SPACING.xl,
  },
});
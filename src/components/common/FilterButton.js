import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export default function FilterButton({
  icon,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color="#333"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 55,
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
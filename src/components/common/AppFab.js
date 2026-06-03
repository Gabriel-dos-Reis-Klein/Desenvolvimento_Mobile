import { FAB as PaperFAB}
  from 'react-native-paper';

export default function AppFab({
  icon = 'plus',
  onPress,
  style,
  ...props
}) {
  return (
    <PaperFAB
      icon={icon}
      color="white"
      style={[
        {
          position: 'absolute',
          right: 20,
          bottom: 20,
          backgroundColor: '#FF3366',
        },
        style
      ]}
      onPress={onPress}
      {...props}
    />
  );
}
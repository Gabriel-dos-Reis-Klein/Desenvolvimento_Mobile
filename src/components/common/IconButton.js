import {
  IconButton as PaperIconButton,
} from 'react-native-paper';

import {
  COLORS,
} from '../../theme';

export default function IconButton({
  icon,
  iconColor = COLORS.black80,
  size = 26,
  style,
  ...props
}) {
  return (
    <PaperIconButton
      icon={icon}
      iconColor={iconColor}
      size={size}
      style={style}
      {...props}
    />
  );
}
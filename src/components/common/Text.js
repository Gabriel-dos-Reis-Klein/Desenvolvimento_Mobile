import { Text as NativeText } from 'react-native';

import {
  TYPOGRAPHY,
  COLORS,
} from '../../themes';

export default function Text({
  children,
  variant = 'body',
  color = COLORS.text,
  style,
  ...props
}) {
  return (
    <NativeText
      style={[
        TYPOGRAPHY[variant],
        { color },
        style,
      ]}
      {...props}
    >
      {children}
    </NativeText>
  );
}
import {
  FontAwesome6
} from '@expo/vector-icons';

import {
  ORDER_TYPE_ICONS,
} from '../../constants';

import {
  COLORS,
} from '../../theme';

export default function OrderIcon({
  type,
  size = 24,
  color = COLORS.black70,
  style,
  ...props
}) {
  const icon =
    ORDER_TYPE_ICONS[
      type
    ] || 'dots-horizontal';

  return (
    <FontAwesome6
      name={icon}
      size={size}
      color={color}
      style={style}
      {...props}
    />
  );
}
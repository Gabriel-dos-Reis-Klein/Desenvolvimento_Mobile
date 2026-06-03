import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
  ORDER_TYPE_ICONS,
} from '../../constants';

import {
  COLORS,
} from '../../themes';

export default function OrderIcon({
  type,
  size = 24,
  color = COLORS.black70,
  style,
  ...props
}) {
  const icon =
    ORDER_TYPE_ICONS[
      type?.toLowerCase()
    ] || 'dots-horizontal';

  return (
    <MaterialCommunityIcons
      name={icon}
      size={size}
      color={color}
      style={style}
      {...props}
    />
  );
}
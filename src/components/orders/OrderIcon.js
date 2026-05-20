import { MaterialCommunityIcons }
  from '@expo/vector-icons';

import {
  ORDER_TYPE_ICONS,
} from '../../constants/order-types';

export default function OrderIcon({
  type,
}) {
  const icon =
    ORDER_TYPE_ICONS[type?.toLowerCase()] ||
    'dots-horizontal';

  return (
    <MaterialCommunityIcons
      name={icon}
      size={24}
      color="#333"
    />
  );
}
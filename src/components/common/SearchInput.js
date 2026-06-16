import { Searchbar } from 'react-native-paper';

import {
  COLORS,
  SPACING,
} from '../../theme';

export default function SearchInput(props) {
  return (
    <Searchbar
      placeholder="Buscar cliente por nome ou telefone"
      icon="magnify"
      inputStyle={{
        minHeight: 0,
      }}
      style={{
        marginHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
        backgroundColor: COLORS.surfaceSecondary,
        borderWidth: 1,
        borderColor: COLORS.border,
      }}
      {...props}
    />
  );
}
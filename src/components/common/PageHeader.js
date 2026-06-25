import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper'; 

import {
  COLORS,
  FONT_FAMILY,
  SPACING,
} from '../../theme';

export default function PageHeader({
  title,
  onBack,
  rightComponent, 
}) {
  return (
    <Appbar.Header style={styles.header}>
      {onBack && (
        <Appbar.BackAction 
          color={COLORS.text} 
          onPress={onBack}
          style={styles.backAction}
        />
      )}
      
      <Appbar.Content 
        title={title} 
        titleStyle={styles.title}
        style={styles.contentContainer}
      />

      {rightComponent ? (
        <Appbar.Action icon={() => rightComponent} style={styles.rightAction} />
      ) : (
        onBack && <StyleSpacer />
      )}
    </Appbar.Header>
  );
}

const StyleSpacer = () => <Appbar.Action icon={() => null} disabled style={styles.spacer} />;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.background || 'transparent',
    paddingHorizontal: SPACING.md,
    marginTop: 0,
    marginBottom: SPACING.md,
    elevation: 0, 
    shadowOpacity: 0,
    justifyContent: 'center',
    height: 56,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: FONT_FAMILY.robotoBold,
    color: COLORS.text,
    textAlign: 'center', 
  },
  backAction: {
    marginLeft: -8,
  },
  rightAction: {
    marginRight: -8,
  },
  spacer: {
    width: 48,
    marginRight: -8,
  }
});
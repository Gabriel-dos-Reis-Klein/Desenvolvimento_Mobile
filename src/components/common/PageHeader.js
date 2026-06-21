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

      {/* Renderiza o componente da direita ou o espaçador para manter o título centralizado */}
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
    /* 🌟 PADRONIZAÇÃO AQUI: O Header agora assume o papel do seu antigo headerContainer */
    paddingHorizontal: SPACING.md,
    marginTop: 0,
    marginBottom: SPACING.md, // Reduzido um pouco para não distanciar demais do primeiro input
    elevation: 0, 
    shadowOpacity: 0,
    justifyContent: 'center',
    height: 56, // Altura padrão estável para Appbar
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
    marginLeft: -8, // 🌟 Compensa o padding interno do botão para alinhar o ícone perfeitamente à esquerda
  },
  rightAction: {
    marginRight: -8, // 🌟 Compensa o padding interno para alinhar as ações perfeitamente à direita
  },
  spacer: {
    width: 48,
    marginRight: -8,
  }
});
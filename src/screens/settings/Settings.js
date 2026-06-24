import { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { COLORS, SPACING } from '../../theme';
import PageHeader from '../../components/common/PageHeader';
import Text from '../../components/common/Text';

import { AuthContext } from '../../contexts/AuthContext';
import { userService } from '../../services';

export default function Settings({ navigation }) {
  const { user, signOut, refreshUser } = useContext(AuthContext);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if (user?.id || user?.sub) {
        try {
          const userId = user.id || user.sub;
          
          // Alterado de getProfile para getById, acompanhando a padronização do BaseService
          const freshData = await userService.getById(userId);
          
          if (freshData) {
            refreshUser(freshData);
          }
        } catch (error) {
          console.error("Falha ao sincronizar dados em background:", error);
        }
      }
    });

    return unsubscribe;
  }, [navigation, user, refreshUser]);

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja encerrar sua sessão atual? Você precisará fazer login novamente para acessar seus dados.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: signOut,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.headerContainer}>
        <PageHeader title="Minha Conta" onBack={() => navigation.goBack()} />
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bloco de Informações Detalhadas */}
        <Text style={styles.sectionTitle}>Seus Dados</Text>
        <View style={styles.infoGroup}>
          <View style={styles.infoRow}>
            <Text variant="caption" color={COLORS.textSecondary}>Nome completo</Text>
            <Text variant="body" style={styles.infoValue}>{user?.nome ?? '—'}</Text>
          </View>
          <View style={styles.infoRowDivider} />
          <View style={styles.infoRow}>
            <Text variant="caption" color={COLORS.textSecondary}>Endereço de e-mail</Text>
            <Text variant="body" style={styles.infoValue}>{user?.email ?? '—'}</Text>
          </View>
        </View>

        {/* Bloco de Ações e Gerenciamento */}
        <Text style={styles.sectionTitle}>Gerenciamento</Text>
        <View style={styles.actionGroup}>
          {/* Opção 1: Dados Cadastrais */}
          <TouchableOpacity 
            style={styles.actionItem} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <View style={styles.actionItemLeft}>
              <View style={[styles.iconWrapper, { backgroundColor: COLORS.primary10 }]}>
                <FontAwesome6 name="user-gear" size={14} color={COLORS.primary} solid />
              </View>
              <Text variant="body" style={styles.actionLabel}>Atualizar dados cadastrais</Text>
            </View>
            <FontAwesome6 name="chevron-right" size={12} color={COLORS.textMuted} />
          </TouchableOpacity>
          
          <View style={styles.infoRowDivider} />

          {/* Opção 2: Alterar Senha */}
          <TouchableOpacity 
            style={styles.actionItem} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <View style={styles.actionItemLeft}>
              <View style={[styles.iconWrapper, { backgroundColor: COLORS.primary10 }]}>
                <FontAwesome6 name="lock" size={14} color={COLORS.primary} solid />
              </View>
              <Text variant="body" style={styles.actionLabel}>Alterar senha de acesso</Text>
            </View>
            <FontAwesome6 name="chevron-right" size={12} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Botão Destrutivo de Logout com Feedback Premium */}
        <Pressable 
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutButtonPressed
          ]} 
          onPress={handleLogout}
        >
          <View style={[styles.iconWrapper, { backgroundColor: '#ffeef0' }]}>
            <FontAwesome6 name="arrow-right-from-bracket" size={14} color="#ff3b30" />
          </View>
          <Text variant="body" style={styles.logoutText}>Desconectar desta conta</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    ...Platform.select({
      web: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        height: '100%', width: '100%',
      },
    }),
  },
  headerContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xs,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
    paddingLeft: 4,
  },
  infoGroup: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  infoRow: {
    paddingVertical: SPACING.md,
    gap: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
  },
  infoRowDivider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  actionGroup: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: SPACING.xl,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  actionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ffccd1',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
    transform: [{ scale: 1 }],
  },
  logoutButtonPressed: {
    opacity: 0.55,
    backgroundColor: '#fff5f5',
    transform: [{ scale: 0.98 }],
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ff3b30',
  },
});
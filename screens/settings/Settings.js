import { useContext } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { COLORS, SPACING } from '../../theme';
import PageHeader from '../../components/common/PageHeader';
import Text from '../../components/common/Text';
import Button from '../../components/common/Button';

import { AuthContext } from '../../contexts/AuthContext';

export default function Settings({ navigation }) {
  const { user, isAdmin, signOut } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: signOut,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <PageHeader title="Configurações" />
      </View>

      <View style={styles.body}>
        {/* Avatar / Info do usuário */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <FontAwesome6
              name="user"
              size={32}
              color={COLORS.primary}
              solid
            />
          </View>
          <View style={styles.profileInfo}>
            <Text variant="heading" style={styles.userName}>
              {user?.nome ?? '—'}
            </Text>
            <Text variant="caption" color={COLORS.textSecondary}>
              {user?.email ?? '—'}
            </Text>
            <View style={styles.badge}>
              <Text variant="caption" style={styles.badgeText}>
                {user?.permissao === 'ADMIN' ? 'Administrador' : 'Funcionário'}
              </Text>
            </View>
          </View>
        </View>

        {/* Opções */}
        <View style={styles.section}>
          <SettingsItem
            icon="user-pen"
            label="Editar perfil"
            onPress={() => navigation.navigate('EditProfile')}
          />

          {isAdmin && (
            <SettingsItem
              icon="user-plus"
              label="Cadastrar novo usuário"
              onPress={() => navigation.navigate('CreateUser')}
            />
          )}
        </View>
      </View>

      {/* Logout */}
      <View style={styles.footer}>
        <Button
          title="Sair da conta"
          variant="secondary"
          onPress={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
}

function SettingsItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.itemLeft}>
        <View style={styles.itemIcon}>
          <FontAwesome6 name={icon} size={16} color={COLORS.primary} solid />
        </View>
        <Text variant="body" style={styles.itemLabel}>
          {label}
        </Text>
      </View>
      <FontAwesome6 name="chevron-right" size={14} color={COLORS.textMuted} />
    </TouchableOpacity>
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
  header: {
    paddingHorizontal: SPACING.md,
  },
  body: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    gap: SPACING.xs,
  },
  userName: {
    fontSize: 18,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary10,
    borderRadius: 999,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    marginTop: SPACING.xs,
  },
  badgeText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: 0.5,
  },

  section: {
    borderRadius: 16,
    backgroundColor: COLORS.surfaceSecondary,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primary10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    fontSize: 15,
  },

  footer: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 0 : SPACING.xl,
    backgroundColor: COLORS.background,
  },
});

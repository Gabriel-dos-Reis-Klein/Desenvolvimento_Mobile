import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { COLORS, SPACING } from '../../theme';
import { passwordConfirmSchema } from '../../validations/auth.validation';
import Text from './Text';
import Button from './Button';
import Input from './Input'; 

export default function PasswordConfirmModal({
  visible,
  onClose,
  onConfirm,
  loading,
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const handleConfirm = () => {
        try {
            const { passwordRegex } = require('../../validations/auth.validation');
            
            if (!password.trim()) {
              setError('Este campo é obrigatório');
              return;
            }

            if (!passwordRegex.test(password)) {
              setError('A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial');
              return;
            }

            setError('');
            onConfirm(password);
            setPassword('');
        } catch (e) {
            setError('Erro ao validar os dados.');
        }
    };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            disabled={loading}
          >
            <FontAwesome6
              name="xmark"
              size={20}
              color={COLORS.textSecondary || '#6C757D'}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Confirmar Exclusão</Text>
          <Text style={styles.subtitle}>
            Digite sua senha para confirmar a exclusão do pedido:
          </Text>

          <Input
            label="Senha"
            type="password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (error) setError('');
            }}
            error={error}
            editable={!loading}
            autoFocus={true}
          />

          <Button
            title="Excluir"
            onPress={handleConfirm}
            disabled={!password || loading}
            loading={loading}
            style={styles.actionButton}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  content: {
    width: '100%',
    backgroundColor: COLORS.surface || '#FFFFFF',
    borderRadius: 16,
    padding: SPACING.xl,
    gap: SPACING.md,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    padding: SPACING.xs,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    paddingRight: SPACING.xl,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary || '#6C757D',
    marginBottom: SPACING.xs,
  },
  actionButton: {
    backgroundColor: COLORS.error || '#ff3b30',
    marginTop: SPACING.xs,
  },
});
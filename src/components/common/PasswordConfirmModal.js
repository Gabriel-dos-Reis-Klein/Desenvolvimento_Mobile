import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, SPACING } from '../../theme';
import Input from './Input';
import Button from './Button';

export default function PasswordConfirmModal({
  visible,
  onClose,
  onConfirm,
  loading,
  title = "Confirmar Senha",
  description = "Por favor, insira sua senha atual para confirmar esta operação.",
  buttonTitle = "Confirmar"
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (!password.trim()) {
      setError('A senha é obrigatória');
      return;
    }
    setError('');
    onConfirm(password);
    setPassword('');
  };

  const handleClose = () => {
    setError('');
    setPassword('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={handleClose}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={22} color={COLORS.textSecondary || '#6C757D'} />
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{description}</Text>

          <Input
            type="password"
            label="Senha Atual"
            placeholder="Digite sua senha de acesso"
            value={password}
            onChangeText={(text) => {
              if (error) setError('');
              setPassword(text);
            }}
            error={error}
          />

          <Button
            title={buttonTitle}
            loading={loading}
            disabled={loading}
            onPress={handleConfirm}
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
    borderWidth: 1,
    borderColor: COLORS.border,
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
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: COLORS.primary, 
    marginTop: SPACING.xs,
  },
});
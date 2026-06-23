import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS, SPACING, FONT_FAMILY } from '../../theme';

export default function ItemTabs({ activeTab, setActiveTab, attachmentsCount }) {
  return (
    <View style={styles.tabContainer}>
      <Pressable 
        style={[styles.tabButton, activeTab === 'DADOS' && styles.tabButtonActive]} 
        onPress={() => setActiveTab('DADOS')}
      >
        <Text style={[styles.tabText, activeTab === 'DADOS' && styles.tabTextActive]}>Dados Gerais</Text>
      </Pressable>
      <Pressable 
        style={[styles.tabButton, activeTab === 'ANEXOS' && styles.tabButtonActive]} 
        onPress={() => setActiveTab('ANEXOS')}
      >
        <Text style={[styles.tabText, activeTab === 'ANEXOS' && styles.tabTextActive]}>
          Anexos ({attachmentsCount})
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    borderBottomWidth: 1,
    borderColor: COLORS.border || '#E9ECEF',
    backgroundColor: COLORS.background,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY?.poppinsMedium || 'System',
    color: COLORS.textSecondary || '#6C757D',
  },
  tabTextActive: {
    color: COLORS.primary,
    fontFamily: FONT_FAMILY?.poppinsSemiBold || 'System',
  },
});
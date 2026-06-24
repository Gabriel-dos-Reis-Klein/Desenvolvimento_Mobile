import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS, SPACING, FONT_FAMILY } from '../../theme';

export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <Pressable 
            key={tab.id}
            style={[styles.tabButton, isActive && styles.tabButtonActive]} 
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab.label} {tab.count !== undefined ? `(${tab.count})` : ''}
            </Text>
          </Pressable>
        );
      })}
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
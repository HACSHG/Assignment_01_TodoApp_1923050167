import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FilterStatus } from '../types';
import { THEME, SPACING } from '../constants/student';

interface TodoFilterProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  counts: { all: number; active: number; completed: number };
}

const FILTERS: { key: FilterStatus; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'active', label: 'Đang làm' },
  { key: 'completed', label: 'Đã xong' },
];

export const TodoFilter: React.FC<TodoFilterProps> = ({
  searchQuery,
  onSearchChange,
  currentFilter,
  onFilterChange,
  counts,
}) => {
  return (
    <View style={styles.container}>
      {/* Search Input Box */}
      <View style={styles.searchRow}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm công việc..."
          placeholderTextColor={THEME.textMuted}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <Text style={styles.clearSearch}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs using Flexbox */}
      <View style={styles.tabsRow}>
        {FILTERS.map((f) => {
          const isActive = currentFilter === f.key;
          const count = counts[f.key];
          return (
            <TouchableOpacity
              key={f.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => onFilterChange(f.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {f.label}
              </Text>
              <View style={[styles.countBadge, isActive && styles.countBadgeActive]}>
                <Text style={[styles.countText, isActive && styles.countTextActive]}>
                  {count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.gap,
    gap: 8,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(19, 29, 49, 0.9)',
    borderRadius: SPACING.inputRadius,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  searchIcon: {
    fontSize: 13,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: THEME.text,
    fontSize: 13,
    padding: 0,
  },
  clearSearch: {
    color: THEME.textMuted,
    fontSize: 13,
    paddingHorizontal: 6,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: SPACING.badgeRadius,
    backgroundColor: 'rgba(19, 29, 49, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: THEME.primaryGlow,
    borderColor: THEME.primary,
  },
  tabText: {
    fontSize: 12,
    color: THEME.textMuted,
    fontWeight: '500',
  },
  tabTextActive: {
    color: THEME.primary,
    fontWeight: '700',
  },
  countBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  countBadgeActive: {
    backgroundColor: THEME.primary,
  },
  countText: {
    fontSize: 10,
    color: THEME.textMuted,
    fontWeight: '700',
  },
  countTextActive: {
    color: '#ffffff',
  },
});

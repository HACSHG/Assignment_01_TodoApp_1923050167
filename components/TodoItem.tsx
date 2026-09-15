import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Todo } from '../types';
import { THEME, SPACING, STUDENT_ID } from '../constants/student';

interface TodoItemProps {
  item: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const PRIORITY_META = {
  high: { label: 'Cao', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
  medium: { label: 'Vừa', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
  low: { label: 'Thấp', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
};

export const TodoItem: React.FC<TodoItemProps> = ({ item, onToggleComplete, onDelete }) => {
  const priorityInfo = PRIORITY_META[item.priority] || PRIORITY_META.medium;

  return (
    <View
      style={[
        styles.card,
        item.completed && styles.cardCompleted,
      ]}
    >
      {/* Flex row with checkbox + content */}
      <View style={styles.contentRow}>
        {/* Checkbox toggle */}
        <TouchableOpacity
          style={[
            styles.checkbox,
            item.completed && styles.checkboxChecked,
          ]}
          onPress={() => onToggleComplete(item.id)}
          activeOpacity={0.7}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>

        {/* Text and meta container */}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.todoText,
              item.completed && styles.todoTextCompleted,
            ]}
            numberOfLines={2}
          >
            {item.text}
          </Text>

          {/* Badges row: Priority + Category */}
          <View style={styles.badgeRow}>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: priorityInfo.bg, borderColor: priorityInfo.color },
              ]}
            >
              <Text style={[styles.priorityText, { color: priorityInfo.color }]}>
                {priorityInfo.label}
              </Text>
            </View>

            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>

            <Text style={styles.timestamp}>
              {new Date(item.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        </View>

        {/* Delete action button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteIcon}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: SPACING.borderRadius,
    padding: SPACING.cardPadding,
    marginBottom: SPACING.gap,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  cardCompleted: {
    backgroundColor: THEME.completedBg,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.75,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: THEME.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: THEME.primary,
    borderColor: THEME.primary,
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 14,
  },
  textContainer: {
    flex: 1,
    gap: 6,
  },
  todoText: {
    fontSize: 15,
    fontWeight: '500',
    color: THEME.text,
    lineHeight: 20,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: THEME.completedText,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: SPACING.badgeRadius,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  categoryBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: SPACING.badgeRadius,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  categoryText: {
    fontSize: 10,
    color: THEME.textMuted,
  },
  timestamp: {
    fontSize: 10,
    color: 'rgba(148, 163, 184, 0.6)',
    marginLeft: 'auto',
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(244, 63, 94, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
  },
  deleteIcon: {
    color: THEME.danger,
    fontSize: 13,
    fontWeight: '700',
  },
});

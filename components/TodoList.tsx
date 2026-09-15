import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';
import { THEME, SPACING } from '../constants/student';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  activeFilter: string;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onDelete,
  activeFilter,
}) => {
  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  if (todos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📝</Text>
        <Text style={styles.emptyTitle}>Chưa có công việc nào</Text>
        <Text style={styles.emptySubtitle}>
          {activeFilter !== 'all'
            ? 'Không có công việc nào trong mục này'
            : 'Hãy nhập công việc mới ở phía trên để bắt đầu'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Active Tasks Section */}
      {activeTodos.length > 0 && (
        <View style={styles.section}>
          {activeFilter === 'all' && (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                CẦN LÀM ({activeTodos.length})
              </Text>
            </View>
          )}
          {activeTodos.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </View>
      )}

      {/* Done / Completed Section */}
      {completedTodos.length > 0 && (
        <View style={styles.section}>
          {activeFilter === 'all' && (
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: THEME.success }]}>
                ĐÃ HOÀN THÀNH ({completedTodos.length})
              </Text>
            </View>
          )}
          {completedTodos.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    marginBottom: SPACING.gap,
  },
  sectionHeader: {
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.textMuted,
    letterSpacing: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.text,
  },
  emptySubtitle: {
    fontSize: 12,
    color: THEME.textMuted,
    textAlign: 'center',
    maxWidth: 240,
  },
});

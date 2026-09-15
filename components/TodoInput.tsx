import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { Category, Priority } from '../types';
import { THEME, SPACING, STUDENT_ID } from '../constants/student';

interface TodoInputProps {
  onAddTodo: (text: string, priority: Priority, category: Category) => void;
}

const PRIORITIES: { label: string; value: Priority; color: string }[] = [
  { label: 'Thấp', value: 'low', color: '#10b981' },
  { label: 'Vừa', value: 'medium', color: '#f59e0b' },
  { label: 'Cao', value: 'high', color: '#ef4444' },
];

const CATEGORIES: Category[] = ['Assignment', 'Study', 'Work', 'Personal'];

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [inputText, setInputText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority>('medium');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Assignment');

  const handleAdd = () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      if (Platform.OS === 'web') {
        alert('Vui lòng nhập nội dung công việc!');
      } else {
        Alert.alert('Thông báo', 'Vui lòng nhập nội dung công việc!');
      }
      return;
    }

    // Call parent handler
    onAddTodo(trimmed, selectedPriority, selectedCategory);

    // Requirement: Clear input after adding
    setInputText('');
  };

  return (
    <View style={styles.inputCard}>
      {/* Input box row with Flexbox */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          placeholder="Thêm công việc mới cần làm..."
          placeholderTextColor={THEME.textMuted}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAdd}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* Priority selection row */}
      <View style={styles.selectorSection}>
        <View style={styles.selectorGroup}>
          <Text style={styles.selectorLabel}>Mức ưu tiên:</Text>
          <View style={styles.optionsRow}>
            {PRIORITIES.map((p) => {
              const isSelected = selectedPriority === p.value;
              return (
                <TouchableOpacity
                  key={p.value}
                  onPress={() => setSelectedPriority(p.value)}
                  style={[
                    styles.priorityChip,
                    isSelected && {
                      backgroundColor: `${p.color}22`,
                      borderColor: p.color,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.priorityDot,
                      { backgroundColor: p.color },
                    ]}
                  />
                  <Text
                    style={[
                      styles.chipText,
                      isSelected && { color: p.color, fontWeight: '700' },
                    ]}
                  >
                    {p.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Category selection row */}
        <View style={styles.selectorGroup}>
          <Text style={styles.selectorLabel}>Danh mục:</Text>
          <View style={styles.optionsRow}>
            {CATEGORIES.map((c) => {
              const isSelected = selectedCategory === c;
              return (
                <TouchableOpacity
                  key={c}
                  onPress={() => setSelectedCategory(c)}
                  style={[
                    styles.categoryChip,
                    isSelected && {
                      backgroundColor: THEME.primaryGlow,
                      borderColor: THEME.primary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isSelected && { color: THEME.primary, fontWeight: '700' },
                    ]}
                  >
                    {c}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: SPACING.borderRadius,
    padding: SPACING.cardPadding,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
    marginBottom: SPACING.gap + 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(10, 15, 29, 0.7)',
    color: THEME.text,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: SPACING.inputRadius,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: THEME.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: SPACING.inputRadius,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  selectorSection: {
    marginTop: 12,
    gap: 8,
  },
  selectorGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  selectorLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    width: 80,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    flex: 1,
  },
  priorityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SPACING.badgeRadius,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 4,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  categoryChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SPACING.badgeRadius,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  chipText: {
    fontSize: 11,
    color: THEME.textMuted,
  },
});

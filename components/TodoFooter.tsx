import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  STUDENT_ID,
  STUDENT_NAME,
  THEME,
  SPACING,
  ASSIGNMENT_TITLE,
} from '../constants/student';

interface TodoFooterProps {
  activeCount: number;
}

export const TodoFooter: React.FC<TodoFooterProps> = ({ activeCount }) => {
  return (
    <View style={styles.footerContainer}>
      {/* Reference to STUDENT_ID displayed explicitly in footer */}
      <View style={styles.infoRow}>
        <Text style={styles.footerText}>
          {STUDENT_NAME} • MSSV: <Text style={styles.highlightId}>{STUDENT_ID}</Text>
        </Text>
        <Text style={styles.statusBadge}>
          {activeCount > 0 ? `${activeCount} việc còn lại` : 'Hoàn thành tất cả 🎉'}
        </Text>
      </View>
      <Text style={styles.assignmentMeta}>
        {ASSIGNMENT_TITLE} • React Native & Flexbox
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(10, 15, 29, 0.95)',
    gap: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: THEME.textMuted,
  },
  highlightId: {
    color: THEME.primary,
    fontWeight: '700',
  },
  statusBadge: {
    fontSize: 11,
    color: THEME.accent,
    fontWeight: '600',
  },
  assignmentMeta: {
    fontSize: 10,
    color: 'rgba(148, 163, 184, 0.5)',
    textAlign: 'center',
    marginTop: 2,
  },
});

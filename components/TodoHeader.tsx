import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STUDENT_ID, STUDENT_NAME, THEME, SPACING, formatStudentBadge } from '../constants/student';

interface TodoHeaderProps {
  totalCount: number;
  completedCount: number;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({ totalCount, completedCount }) => {
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <View style={styles.headerCard}>
      {/* Top row: Student profile and Student ID badge using Flexbox */}
      <View style={styles.topRow}>
        <View style={styles.studentInfo}>
          <Text style={styles.appTitle}>TODO MASTER</Text>
          <Text style={styles.studentName}>{STUDENT_NAME}</Text>
          {/* Reference to STUDENT_ID displayed explicitly in header */}
          <Text style={styles.studentIdText}>MSSV: {STUDENT_ID}</Text>
        </View>

        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{formatStudentBadge(STUDENT_ID)}</Text>
          </View>
          <Text style={styles.badgeSub}>Assignment 01</Text>
        </View>
      </View>

      {/* Progress & Stat counter row */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Tổng việc</Text>
          <Text style={styles.statValue}>{totalCount}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Đã xong</Text>
          <Text style={[styles.statValue, { color: THEME.success }]}>{completedCount}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Tiến độ</Text>
          <Text style={[styles.statValue, { color: THEME.primary }]}>{completionPercentage}%</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarTrack}>
        <View style={[styles.progressBarFill, { width: `${completionPercentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: SPACING.borderRadius,
    padding: SPACING.cardPadding + 2,
    borderWidth: 1,
    borderColor: THEME.cardBorder,
    marginBottom: SPACING.gap + 2,
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.accent,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  studentName: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.text,
    marginTop: 2,
  },
  studentIdText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.primary,
    marginTop: 1,
  },
  badgeContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: THEME.primaryGlow,
    borderColor: THEME.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SPACING.badgeRadius,
  },
  badgeText: {
    color: THEME.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  badgeSub: {
    color: THEME.textMuted,
    fontSize: 10,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 15, 29, 0.6)',
    borderRadius: SPACING.borderRadius - 4,
    paddingVertical: 8,
    marginVertical: 6,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.text,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  progressBarTrack: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: THEME.primary,
    borderRadius: 3,
  },
});

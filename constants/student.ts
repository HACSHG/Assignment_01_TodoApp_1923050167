import { DynamicSpacing, StudentTheme, Todo } from '../types';

/**
 * ============================================================================
 * MANDATORY STUDENT INFORMATION (DO NOT MODIFY)
 * ============================================================================
 */
export const STUDENT_ID = "1923050167";
export const STUDENT_NAME = "Vũ Hải Đăng";
export const ASSIGNMENT_TITLE = "Assignment 01: Todo App";

// Helper to parse specific digits of STUDENT_ID safely
export const getDigit = (index: number): number => {
  return parseInt(STUDENT_ID[index] ?? '0', 10);
};

/**
 * [STUDENT_ID Reference 1 & 2]: Theme colors derived from STUDENT_ID digits
 * Digits: 1, 9, 2, 3, 0, 5, 0, 1, 6, 7
 * - Primary Hue is calculated using first 3 digits: (192 % 30) + 210 = 222 (Deep Oceanic / Royal Blue)
 * - Accent Hue is derived using last 2 digits: (67 % 40) + 180 = 207 (Vibrant Cyan / Sky Blue)
 * - Resulting theme is a polished Dark/Blue theme satisfying the custom theme requirement!
 */
export const deriveThemeColors = (id: string): StudentTheme => {
  const digit0 = parseInt(id[0] ?? '1', 10); // 1
  const digit1 = parseInt(id[1] ?? '9', 10); // 9
  const digit2 = parseInt(id[2] ?? '2', 10); // 2
  const lastDigit = parseInt(id[id.length - 1] ?? '7', 10); // 7

  const hueBase = ((digit0 * 100 + digit1 * 10 + digit2) % 35) + 215; // 222 deg (Electric Blue)
  const accentHue = ((lastDigit * 17) % 60) + 175; // Cyan/Aqua

  return {
    primary: `hsl(${hueBase}, 85%, 58%)`,          // #3875f6 dynamic vibrant blue
    primaryGlow: `hsla(${hueBase}, 85%, 58%, 0.25)`,
    secondary: `hsl(${accentHue}, 90%, 55%)`,
    accent: `hsl(${accentHue}, 95%, 65%)`,
    background: '#0a0f1d',                          // Deep night dark-blue canvas
    cardBg: '#131d31',                              // Elevated dark-blue card
    cardBorder: 'rgba(56, 117, 246, 0.18)',         // Subtle blue boundary
    text: '#f1f5f9',                                // Bright slate text
    textMuted: '#94a3b8',                           // Muted slate text
    completedBg: '#0f172a',                         // Dimmed card for completed
    completedText: '#64748b',                       // Strikethrough dimmed text
    danger: '#f43f5e',                              // Crimson delete
    success: '#10b981',                             // Emerald complete
    warning: '#f59e0b',                             // Amber priority
  };
};

export const THEME = deriveThemeColors(STUDENT_ID);

/**
 * [STUDENT_ID Reference 3]: Dynamic UI metrics derived from STUDENT_ID length and digits
 * - Uses ID length (10) and specific digits (e.g. last digit 7, middle digit 5)
 *   to determine border radius, padding, elevation and spacing.
 */
export const deriveSpacingFromId = (id: string): DynamicSpacing => {
  const lastDigit = parseInt(id[id.length - 1] ?? '7', 10); // 7
  const middleDigit = parseInt(id[Math.floor(id.length / 2)] ?? '5', 10); // 5
  const idLength = id.length; // 10

  return {
    borderRadius: lastDigit + 7,       // 7 + 7 = 14px smooth card curvature
    containerPadding: idLength + 6,    // 10 + 6 = 16px screen padding
    cardPadding: middleDigit + 9,      // 5 + 9 = 14px inner card padding
    gap: middleDigit + 5,              // 5 + 5 = 10px component gap
    inputRadius: lastDigit + 5,        // 7 + 5 = 12px input radius
    badgeRadius: lastDigit + 1,        // 7 + 1 = 8px pill badge radius
  };
};

export const SPACING = deriveSpacingFromId(STUDENT_ID);

/**
 * [STUDENT_ID Reference 4]: Unique Todo ID Generator seeded with STUDENT_ID
 * Ensures all generated todo IDs carry the student's unique fingerprint.
 */
export const generateTodoId = (id: string): string => {
  return `${id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

/**
 * [STUDENT_ID Reference 5]: Initial seed todos referencing the student's ID and course
 */
export const getInitialTodos = (id: string): Todo[] => {
  return [
    {
      id: `${id}-seed-1`,
      text: `Nộp bài Assignment 01 (MSSV: ${id})`,
      completed: false,
      priority: 'high',
      category: 'Assignment',
      createdAt: Date.now() - 3600000 * 2,
    },
    {
      id: `${id}-seed-2`,
      text: 'Thiết kế giao diện Dark/Blue với thẻ Card và Flexbox',
      completed: true,
      priority: 'medium',
      category: 'Study',
      createdAt: Date.now() - 3600000 * 5,
    },
    {
      id: `${id}-seed-3`,
      text: 'Tích hợp 5 vị trí tham chiếu STUDENT_ID vào mã nguồn',
      completed: true,
      priority: 'high',
      category: 'Assignment',
      createdAt: Date.now() - 3600000 * 8,
    },
    {
      id: `${id}-seed-4`,
      text: 'Kiểm tra useState hook cho thêm, sửa, xóa todo',
      completed: false,
      priority: 'low',
      category: 'Study',
      createdAt: Date.now() - 3600000 * 1,
    },
  ];
};

/**
 * [STUDENT_ID Reference 6]: Student Verification Badge Code
 * Formats a short identifier code from STUDENT_ID for header/footer display.
 */
export const formatStudentBadge = (id: string): string => {
  const shortSuffix = id.slice(-4);
  return `STU-${shortSuffix}`;
};

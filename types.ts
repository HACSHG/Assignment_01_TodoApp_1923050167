export type Priority = 'low' | 'medium' | 'high';

export type Category = 'Study' | 'Work' | 'Personal' | 'Assignment';

export type FilterStatus = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  createdAt: number;
}

export interface StudentTheme {
  primary: string;
  primaryGlow: string;
  secondary: string;
  accent: string;
  background: string;
  cardBg: string;
  cardBorder: string;
  text: string;
  textMuted: string;
  completedBg: string;
  completedText: string;
  danger: string;
  success: string;
  warning: string;
}

export interface DynamicSpacing {
  borderRadius: number;
  containerPadding: number;
  cardPadding: number;
  gap: number;
  inputRadius: number;
  badgeRadius: number;
}

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Category, FilterStatus, Priority, Todo } from './types';
import {
  STUDENT_ID,
  STUDENT_NAME,
  THEME,
  SPACING,
  getInitialTodos,
  generateTodoId,
} from './constants/student';
import { TodoHeader } from './components/TodoHeader';
import { TodoInput } from './components/TodoInput';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

/**
 * ============================================================================
 * [MANDATORY REQUIREMENT]
 * At the top of your code, define: const STUDENT_ID = "1923050167";
 * [STUDENT_ID Reference 1]: Primary constant definition
 * ============================================================================
 */
const APP_STUDENT_ID = STUDENT_ID; // "1923050167"

export default function App() {
  /**
   * ==========================================================================
   * [REQUIREMENT: useState hook to manage todo state]
   * [STUDENT_ID Reference 2]: Initial state seeded using STUDENT_ID
   * ==========================================================================
   */
  const [todos, setTodos] = useState<Todo[]>(() => getInitialTodos(APP_STUDENT_ID));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentFilter, setCurrentFilter] = useState<FilterStatus>('all');

  /**
   * [REQUIREMENT 1: Add todo with text input + button; clear input after adding]
   * [STUDENT_ID Reference 3]: New todo ID is uniquely generated with STUDENT_ID
   */
  const handleAddTodo = (text: string, priority: Priority, category: Category) => {
    const newTodo: Todo = {
      id: generateTodoId(APP_STUDENT_ID),
      text,
      completed: false,
      priority,
      category,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  /**
   * [REQUIREMENT 3: Mark complete (visual change: strikethrough, color, checkbox)]
   */
  const handleToggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * [REQUIREMENT 4: Delete todo from list]
   */
  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Filter and search logic
  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      currentFilter === 'all'
        ? true
        : currentFilter === 'active'
        ? !todo.completed
        : todo.completed;

    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          todo.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={THEME.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        {/* Main Flexbox container */}
        <View style={styles.mainContainer}>
          {/* 
            [STUDENT_ID Reference 4]:
            Header displays Student Name and STUDENT_ID prominently
          */}
          <TodoHeader
            totalCount={counts.all}
            completedCount={counts.completed}
          />

          {/* Core Feature: Input Section */}
          <TodoInput onAddTodo={handleAddTodo} />

          {/* Custom Feature: Search & Filter Tabs */}
          <TodoFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            counts={counts}
          />

          {/* 
            Core Feature: Todo list inside ScrollView
            [STUDENT_ID Reference 5]: Styled with SPACING derived from STUDENT_ID digits
          */}
          <TodoList
            todos={filteredTodos}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTodo}
            activeFilter={currentFilter}
          />

          {/* 
            [STUDENT_ID Reference 6]:
            Footer displays STUDENT_ID and student verification details
          */}
          <TodoFooter activeCount={counts.active} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/**
 * ============================================================================
 * [REQUIREMENT: Flexbox layout]
 * Organized with flexDirection, justifyContent, alignItems, and flex
 * Colors and dimensions derived from STUDENT_ID
 * ============================================================================
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column', // Flexbox direction
    justifyContent: 'space-between', // Flexbox alignment
    paddingHorizontal: SPACING.containerPadding, // Derived from STUDENT_ID
    paddingTop: Platform.OS === 'android' ? 12 : 6,
  },
});

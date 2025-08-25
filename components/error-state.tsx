import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MESSAGES } from '@/constants/messages';
import { colors } from '@/styles';

/**
 * An ErrorState component that displays the error message and an optional retry button.
 * The retry button is only displayed if the onRetry function is provided.
 *
 * @param {string} message the  error message to display to the user
 * @param {() => void} onRetry an optional function to call when the retry button is pressed
 * @returns {JSX.Element} the ErrorState component
 */
export const ErrorState = ({ message, onRetry }: { message: string; onRetry?: () => void }) => {
  return (
    <View accessible={true} style={styles.container} accessibilityLabel="error state">
      <Text style={styles.title}>{MESSAGES.ERRORS.TITLE}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Try again"
          accessibilityHint="Press Try Again button to retry loading the menu"
          onPress={onRetry}
          style={styles.retryButton}>
          <Ionicons
            name="refresh-outline"
            size={24}
            color={colors.buttonIcon}
            accessible={true}
            accessibilityLabel="Refresh icon"
          />
          <Text style={styles.retryText}>{MESSAGES.ERRORS.TRY_AGAIN}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.background,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
    marginTop: 8,
  },
  retryText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
});

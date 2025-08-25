import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MESSAGES } from '@/constants/messages';
import { colors } from '@/styles';

export const ErrorState = ({ message, onRetry }: { message: string; onRetry?: () => void }) => {
  return (
    <View accessibilityLabel="error" style={styles.container}>
      <Text style={styles.title}>{MESSAGES.ERRORS.TITLE}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Pressable accessibilityRole="button" onPress={onRetry} style={styles.retryButton}>
          <Ionicons name="refresh-outline" size={24} color={colors.buttonIcon} />
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

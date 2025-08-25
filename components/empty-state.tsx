import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/styles';

/**
 * An ErrorState component that displays a message when there is no data to display.
 *
 * @param {string} message - the message to display to the user when there is no data
 * @returns {JSX.Element} the EmptyState component
 */
export const EmptyState = ({ message }: { message: string }) => {
  return (
    <View style={styles.container} accessible={true}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

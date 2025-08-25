import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/styles';
export const LoadingIndicator = ({ text }: { text?: string }) => {
  return (
    <View style={styles.container} accessible={true}>
      <ActivityIndicator size={'large'} accessibilityLabel="Loading spinner" />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 14,
    marginTop: 8,
  },
});

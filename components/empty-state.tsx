import { StyleSheet, Text, View } from 'react-native';

export const EmptyState = ({ text }: { text?: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

import { ActivityIndicator, Text, View } from 'react-native';

export const LoadingIndicator = ({ text }: { text?: string }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
      <ActivityIndicator size={'large'} />
      <Text style={{ fontSize: 14, marginTop: 8 }}>{text}</Text>
    </View>
  );
};

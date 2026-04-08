import React from 'react';
import { View, StyleSheet, Alert, TextInput } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { AppButton } from '../../../components/atoms/AppButton';
import ScreenLayout from '../../components/Common/ScreenLayout';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import { useResponsive } from '../../../core/utils/useResponsive';
import { useNavigation } from '@react-navigation/native';

const RefillScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isPhone } = useResponsive();

  const handleRequest = () => {
    Alert.alert('Success', 'Refill requested successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScreenLayout title="Request Refill">
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <AppText
            variant="sm"
            weight="medium"
            color={Colors.text.secondary}
            style={{ marginBottom: Spacing.xs }}
          >
            Add Note
          </AppText>
          <TextInput
            style={styles.textArea}
            placeholder="Enter any additional information for your provider..."
            multiline
            numberOfLines={4}
            placeholderTextColor={Colors.text.muted}
          />
        </View>

        <View style={[styles.buttonRow, isPhone && styles.column]}>
          <AppButton
            label="Cancel"
            variant="outline"
            onPress={() => navigation.goBack()}
            style={isPhone ? styles.fullWidth : styles.minWidth}
          />
          <AppButton
            label="Request Refill"
            variant="primary"
            onPress={handleRequest}
            style={isPhone ? styles.fullWidth : styles.minWidth}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    borderRadius: Spacing.radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputContainer: {
    marginBottom: Spacing.xl,
  },
  textArea: {
    backgroundColor: Colors.background.default,
    borderRadius: Spacing.radius.sm,
    padding: Spacing.md,
    minHeight: 120,
    fontSize: 16,
    color: Colors.text.primary,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.md,
  },
  column: {
    flexDirection: 'column-reverse',
  },
  fullWidth: {
    width: '100%',
  },
  minWidth: {
    minWidth: 160,
  },
});

export default RefillScreen;

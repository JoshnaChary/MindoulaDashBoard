import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { AppButton } from '../../../components/atoms/AppButton';
import { ResponsiveContainer } from '../../../components/atoms/ResponsiveContainer';
import { useNavigation } from '@react-navigation/native';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import { useResponsive } from '../../../core/utils/useResponsive';

export const RefillScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isPhone } = useResponsive();

  const handleRequest = () => {
    Alert.alert('Success', 'Refill requested successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <MemberPortalLayout title="Request Refill">
      <ResponsiveContainer>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AppText variant="md" weight="medium" color={Colors.primary}>
            &lt; Back
          </AppText>
        </TouchableOpacity>

        <View style={styles.card}>
          <AppText
            variant="h2"
            weight="bold"
            color={Colors.text.primary}
            style={{ marginBottom: Spacing.lg }}
          >
            Request Refill
          </AppText>

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
      </ResponsiveContainer>
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginBottom: Spacing.xl,
  },
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

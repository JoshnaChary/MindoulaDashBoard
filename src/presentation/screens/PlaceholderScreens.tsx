import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../components/atoms/AppText';
import MemberPortalLayout from '../../presentation/components/MemberPortalLayout';
import { Colors } from '../../core/theme/colors';

interface Props {
  title: string;
}

const PlaceholderScreen: React.FC<Props> = ({ title }) => {
  return (
    <MemberPortalLayout title={title}>
      <View style={styles.container}>
        <AppText variant="lg" weight="medium" color={Colors.text.primary}>
          {title}
        </AppText>
        <AppText variant="md" color={Colors.text.muted} style={styles.subtitle}>
          This module is coming soon. please check back later.
        </AppText>
      </View>
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
  },
});

export const LabResultsScreen = () => <PlaceholderScreen title="Lab Results" />;
export const QuestionnairesScreen = () => <PlaceholderScreen title="Questionnaires" />;
export const DocumentsScreen = () => <PlaceholderScreen title="Documents" />;
export const InsuranceScreen = () => <PlaceholderScreen title="Insurance" />;
export const AppointmentsScreen = () => <PlaceholderScreen title="Appointments" />;

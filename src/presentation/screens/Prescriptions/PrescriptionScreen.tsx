import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { ResponsiveContainer } from '../../../components/atoms/ResponsiveContainer';
import { useNavigation } from '@react-navigation/native';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import PrescriptionCard from '../../components/Prescriptions/PrescriptionCard';
import { AppConstants } from '../../../core/constants/AppConstants';
import { Spacing } from '../../../core/theme/spacing';
import { Colors } from '../../../core/theme/colors';
import { StackNavigationProp } from '../../../core/navigation/types';
import { Prescription } from '../../../data/models/DomainModels';

export const PrescriptionScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const prescriptions: Prescription[] = [
    {
      id: 1,
      name: 'Sertraline',
      refills: 5,
      dosage: '50mg',
      frequency: 'Weekly',
      instructions: 'Take one tablet by mouth every evening with food.',
      prescribedBy: 'Dr. Amar Sel',
      prescribedOn: 'March 4, 2026',
      route: 'Oral Tablet',
      validUntil: 'March 4, 2027',
      therapyType: 'Continous',
    },
    {
      id: 2,
      name: 'Lorazepam',
      refills: 5,
      dosage: '50mg',
      frequency: 'Weekly',
      instructions: 'Take one tablet by mouth every evening with food.',
      prescribedBy: 'Dr. Amar Sel',
      prescribedOn: 'March 4, 2026',
      route: 'Oral Tablet',
      validUntil: 'March 4, 2027',
      therapyType: 'Continous',
    },
  ];

  return (
    <MemberPortalLayout title="Prescriptions">
      <ResponsiveContainer>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate(AppConstants.screens.dashboard)}
        >
          <AppText variant="md" weight="medium" color={Colors.primary}>
            &lt; Back to Dashboard
          </AppText>
        </TouchableOpacity>

        <AppText variant="h2" weight="bold" style={{ marginBottom: Spacing.xl }}>
          Your Prescriptions
        </AppText>

        <View style={styles.listContainer}>
          {prescriptions.map((p, i) => (
            <PrescriptionCard
              key={p.id}
              item={p}
              index={i}
              onViewDetails={() =>
                navigation.navigate(AppConstants.screens.viewDetails, { prescription: p })
              }
              onRequestRefill={() =>
                navigation.navigate(AppConstants.screens.refillRequest, { prescription: p })
              }
            />
          ))}
        </View>
      </ResponsiveContainer>
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginBottom: Spacing.xl,
  },
  listContainer: {
    gap: Spacing.md,
  },
});

export default PrescriptionScreen;

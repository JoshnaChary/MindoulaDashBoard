import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenLayout from '../../components/Common/ScreenLayout';
import PrescriptionCard from '../../components/Prescriptions/PrescriptionCard';
import { AppConstants } from '../../../core/constants/AppConstants';
import { Spacing } from '../../../core/theme/spacing';
import { StackNavigationProp } from '../../../core/navigation/types';
import { Prescription } from '../../../data/models/DomainModels';
import { useNavigation } from '@react-navigation/native';

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
    <ScreenLayout
      title="Your Prescriptions"
      headerTitle="Prescriptions"
      backLabel="Back to Dashboard"
      onBack={() => navigation.navigate(AppConstants.screens.dashboard)}
    >
      <View style={styles.listContainer}>
        {prescriptions.map((p, i) => (
          <PrescriptionCard
            key={p.id}
            item={p}
            onViewDetails={() =>
              navigation.navigate(AppConstants.screens.viewDetails, { prescription: p })
            }
            onRequestRefill={() =>
              navigation.navigate(AppConstants.screens.refillRequest, { prescription: p })
            }
          />
        ))}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    gap: Spacing.md,
  },
});

export default PrescriptionScreen;

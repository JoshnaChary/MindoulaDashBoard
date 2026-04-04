import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { useNavigation } from '@react-navigation/native';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import PrescriptionCard from '../../components/Prescriptions/PrescriptionCard';
import { AppConstants } from '../../../core/constants/AppConstants';
import { getFigmaPos } from '../../../core/utils/layout';
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
    <MemberPortalLayout>
      <TouchableOpacity
        style={[styles.absolute, getFigmaPos(358, 350)]}
        onPress={() => navigation.navigate(AppConstants.screens.dashboard)}
      >
        <AppText weight="medium" style={{ fontSize: 18 }}>
          &lt; Back
        </AppText>
      </TouchableOpacity>

      <AppText style={[styles.absolute, getFigmaPos(358, 395)]} variant="h3" weight="medium">
        Your Prescriptions
      </AppText>

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
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  absolute: { position: 'absolute' },
});

export default PrescriptionScreen;

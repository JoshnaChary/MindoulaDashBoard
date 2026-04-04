import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../../components/Common/Text';
import { useNavigation } from '@react-navigation/native';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import PrescriptionCard from '../../components/Prescriptions/PrescriptionCard';
import { AppConstants } from '../../../core/constants/AppConstants';
import { Colors } from '../../../core/theme/colors';

const BASE_X = 9;
const BASE_Y = 254;

export const PrescriptionScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const prescriptions = [
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
        style={[styles.absolute, { left: 358 - BASE_X, top: 350 - BASE_Y }]}
        onPress={() => navigation.navigate(AppConstants.screens.dashboard)}
      >
        <Text style={{ color: Colors.text.dark, fontSize: 18, fontWeight: '500' }}>&lt; Back</Text>
      </TouchableOpacity>

      <Text
        style={[
          styles.absolute,
          {
            left: 358 - BASE_X,
            top: 395 - BASE_Y,
            fontSize: 18,
            fontWeight: '500',
            color: Colors.text.dark,
          },
        ]}
      >
        Your Prescriptions
      </Text>

      {prescriptions.map((p, i) => (
        <PrescriptionCard
          key={p.id}
          item={p}
          index={i}
          onViewDetails={() => navigation.navigate('ViewDetails', { prescription: p })}
          onRequestRefill={() => navigation.navigate('RefillRequest', { prescription: p })}
        />
      ))}
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  absolute: { position: 'absolute' },
});

export default PrescriptionScreen;

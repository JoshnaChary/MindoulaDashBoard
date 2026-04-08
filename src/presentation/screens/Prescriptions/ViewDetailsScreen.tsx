import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { useRoute } from '@react-navigation/native';
import ScreenLayout from '../../components/Common/ScreenLayout';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.gridItem}>
    <AppText variant="xs" color={Colors.text.secondary} style={{ marginBottom: 4 }}>
      {label}
    </AppText>
    <AppText variant="md" weight="bold" color={Colors.text.primary}>
      {value}
    </AppText>
  </View>
);

export const ViewDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const prescription = route.params?.prescription;

  if (!prescription) return null;

  return (
    <ScreenLayout
      title={prescription.name}
      headerTitle="Prescription Details"
      backLabel="Back to Prescriptions"
    >
      <View style={styles.card}>
        <View style={styles.instructionBox}>
          <AppText variant="sm" weight="medium" color={Colors.text.secondary}>
            Instructions:
          </AppText>
          <AppText variant="md" style={styles.instructionText}>
            {prescription.instructions}
          </AppText>
        </View>

        <View style={styles.grid}>
          <DetailItem label="Dosage:" value={prescription.dosage} />
          <DetailItem label="Prescribed By:" value={prescription.prescribedBy} />
          <DetailItem label="Frequency:" value={prescription.frequency} />
          <DetailItem label="Prescribed On:" value={prescription.prescribedOn} />
          <DetailItem label="Route:" value={prescription.route} />
          <DetailItem label="Valid Until:" value={prescription.validUntil} />
          <DetailItem label="Therapy Type:" value={prescription.therapyType} />
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
  instructionBox: {
    marginBottom: Spacing.xxl,
    padding: Spacing.md,
    backgroundColor: Colors.background.default,
    borderRadius: Spacing.radius.sm,
  },
  instructionText: {
    marginTop: 4,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.md,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
});

export default ViewDetailsScreen;

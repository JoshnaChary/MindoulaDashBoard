import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { ResponsiveContainer } from '../../../components/atoms/ResponsiveContainer';
import { useRoute, useNavigation } from '@react-navigation/native';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import { useResponsive } from '../../../core/utils/useResponsive';

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
  const navigation = useNavigation<any>();
  const prescription = route.params?.prescription;
  useResponsive();

  if (!prescription) return null;

  return (
    <MemberPortalLayout title="Prescription Details">
      <ResponsiveContainer>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AppText variant="md" weight="medium" color={Colors.primary}>
            &lt; Back to Prescriptions
          </AppText>
        </TouchableOpacity>

        <View style={styles.card}>
          <AppText variant="h2" weight="bold" color={Colors.text.primary}>
            {prescription.name}
          </AppText>

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
  instructionBox: {
    marginTop: Spacing.xl,
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

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { AppButton } from '../../../components/atoms/AppButton';
import { ResponsiveContainer } from '../../../components/atoms/ResponsiveContainer';
import { useNavigation } from '@react-navigation/native';
import { AppConstants } from '../../../core/constants/AppConstants';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import { useResponsive } from '../../../core/utils/useResponsive';

const FigmaDashboardView: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isPhone } = useResponsive();

  return (
    <MemberPortalLayout title="Home">
      <ResponsiveContainer>
        {/* Hello, Jane */}
        <View style={styles.section}>
          <AppText variant="h2" weight="medium">
            Hello, Jane
          </AppText>
        </View>

        {/* Upcoming Appointment */}
        <View style={styles.section}>
          <AppText
            variant="body1"
            weight="regular"
            color={Colors.text.secondary}
            style={styles.sectionTitle}
          >
            Upcoming appointment
          </AppText>

          <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.dateBadge}>
                <AppText variant="lg" weight="bold" color={Colors.text.primary} align="center">
                  14
                </AppText>
                <AppText variant="xs" weight="medium" color={Colors.text.primary} align="center">
                  April
                </AppText>
              </View>
              <View style={styles.appointmentInfo}>
                <AppText variant="md" weight="medium">
                  Follow-up with Dr. J Kim
                </AppText>
                <AppText variant="sm" color={Colors.text.secondary}>
                  3:50 PM ET - 4:10 PM ET
                </AppText>
              </View>
            </View>
            <AppButton
              label="Join Video"
              onPress={() => {}}
              style={isPhone ? styles.fullWidthButton : styles.autoWidthButton}
            />
          </View>
        </View>

        {/* Help Actions */}
        <View style={styles.section}>
          <AppText
            variant="body1"
            weight="regular"
            color={Colors.text.secondary}
            style={styles.sectionTitle}
          >
            How can we help you today?
          </AppText>

          <View style={styles.actionGrid}>
            <ActionCard
              label="View 3 new messages"
              icon={require('../../../assets/message-icon.png')}
              onPress={() => navigation.navigate(AppConstants.screens.messages)}
            />
            <ActionCard label="Request an appointment" onPress={() => {}} />
            <ActionCard
              label="Request a prescription refill"
              onPress={() => navigation.navigate(AppConstants.screens.prescriptions)}
            />
            <ActionCard
              label="Send a message to my care team"
              onPress={() => navigation.navigate(AppConstants.screens.messages)}
            />
          </View>
        </View>
      </ResponsiveContainer>
    </MemberPortalLayout>
  );
};

const ActionCard = ({ label, icon, onPress }: any) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.actionCardContent}>
      {icon && <Image source={icon} style={styles.actionIcon} />}
      <AppText variant="md" weight="medium" color={Colors.dashboard.actionLink}>
        {label}
      </AppText>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  appointmentCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.radius.md,
    padding: Spacing.lg,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    flex: 1,
  },
  dateBadge: {
    width: 64,
    height: 64,
    backgroundColor: Colors.dashboard.badgeBg,
    borderRadius: Spacing.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentInfo: {
    flex: 1,
  },
  fullWidthButton: {
    width: '100%',
  },
  autoWidthButton: {
    minWidth: 140,
  },
  actionGrid: {
    gap: Spacing.md,
  },
  actionCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.radius.md,
    padding: Spacing.lg,
    minHeight: 80,
    justifyContent: 'center',
  },
  actionCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  actionIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default FigmaDashboardView;

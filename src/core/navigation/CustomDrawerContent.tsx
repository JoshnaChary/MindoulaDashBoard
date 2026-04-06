import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { AppText } from '../../components/atoms/AppText';
import { AppIcon } from '../../components/atoms/AppIcon';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { AppConstants } from '../constants/AppConstants';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { navigation, state } = props;
  const currentRouteName = state.routeNames[state.index];

  const handleNavigate = (routeName: string) => {
    navigation.navigate(routeName);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Drawer Header - User Profile */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <AppText variant="lg" weight="medium" color={Colors.white}>
              JD
            </AppText>
          </View>
          <View style={styles.userInfo}>
            <AppText variant="md" weight="medium">
              Jane Doe
            </AppText>
            <AppText variant="sm" color={Colors.text.muted}>
              Member ID: 8273645
            </AppText>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Navigation Items */}
        <DrawerItem
          label="Home"
          icon="home"
          isActive={currentRouteName === AppConstants.screens.dashboard}
          onPress={() => handleNavigate(AppConstants.screens.dashboard)}
        />
        <DrawerItem
          label="Messages"
          icon="chat"
          isActive={currentRouteName === AppConstants.screens.messages}
          onPress={() => handleNavigate(AppConstants.screens.messages)}
          badgeCount={3}
        />
        <DrawerItem
          label="Appointments"
          icon="event"
          isActive={currentRouteName === AppConstants.screens.appointments}
          onPress={() => handleNavigate(AppConstants.screens.appointments)}
        />

        <View style={styles.divider} />
        <AppText variant="xs" color={Colors.text.muted} style={styles.sectionHeader}>
          MEDICAL HISTORY
        </AppText>

        <DrawerItem
          label="Prescriptions"
          icon="medical-services"
          isActive={currentRouteName === AppConstants.screens.prescriptions}
          onPress={() => handleNavigate(AppConstants.screens.prescriptions)}
        />
        <DrawerItem
          label="Lab results"
          icon="biotech"
          isActive={currentRouteName === AppConstants.screens.labResults}
          onPress={() => handleNavigate(AppConstants.screens.labResults)}
        />
        <DrawerItem
          label="Questionnaires"
          icon="assignment"
          isActive={currentRouteName === AppConstants.screens.questionnaires}
          onPress={() => handleNavigate(AppConstants.screens.questionnaires)}
        />
        <DrawerItem
          label="Documents"
          icon="description"
          isActive={currentRouteName === AppConstants.screens.documents}
          onPress={() => handleNavigate(AppConstants.screens.documents)}
        />

        <View style={styles.divider} />
        <AppText variant="xs" color={Colors.text.muted} style={styles.sectionHeader}>
          SUPPORT & PROFILE
        </AppText>

        <DrawerItem
          label="Insurance"
          icon="security"
          isActive={currentRouteName === AppConstants.screens.insurance}
          onPress={() => handleNavigate(AppConstants.screens.insurance)}
        />
        <DrawerItem
          label="Billing"
          icon="payments"
          isActive={currentRouteName === AppConstants.screens.billing}
          onPress={() => handleNavigate(AppConstants.screens.billing)}
        />
        <DrawerItem
          label="Account"
          icon="person"
          isActive={currentRouteName === AppConstants.screens.account}
          onPress={() => handleNavigate(AppConstants.screens.account)}
        />
      </ScrollView>

      {/* Logout / Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton}>
          <AppIcon name="logout" size={20} color={Colors.error} />
          <AppText variant="md" color={Colors.error} style={styles.logoutText}>
            Log Out
          </AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const DrawerItem = ({ label, icon, isActive, onPress, badgeCount }: any) => (
  <TouchableOpacity onPress={onPress} style={[styles.drawerItem, isActive && styles.activeItem]}>
    <View style={styles.itemMain}>
      <AppIcon name={icon} size={24} color={isActive ? Colors.primary : Colors.text.muted} />
      <AppText
        variant="md"
        weight={isActive ? 'medium' : 'regular'}
        color={isActive ? Colors.primary : Colors.text.primary}
        style={styles.itemLabel}
      >
        {label}
      </AppText>
    </View>
    {badgeCount && (
      <View style={styles.badge}>
        <AppText variant="xs" color={Colors.white} weight="bold">
          {badgeCount}
        </AppText>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: '#F8F9FB', // Light professional background
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    marginLeft: Spacing.md,
  },
  scrollContent: {
    paddingVertical: Spacing.md,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginHorizontal: Spacing.sm,
    borderRadius: Spacing.radius.md,
  },
  activeItem: {
    backgroundColor: '#E6F0FF', // Light blue background for active item
  },
  itemMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    marginLeft: 16,
  },
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
    marginHorizontal: Spacing.lg,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
    letterSpacing: 1,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  logoutText: {
    marginLeft: 12,
  },
});

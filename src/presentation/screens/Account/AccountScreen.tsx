import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { ResponsiveContainer } from '../../../components/atoms/ResponsiveContainer';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import BillingTabs from '../../components/Billing/BillingTabs';
import SettingCard from '../../components/Account/SettingCard';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';

export const AccountScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Settings');

  const settings = [
    {
      id: '1',
      label: 'Full Name:',
      value: 'Jane Doe',
      actionLabel: 'Edit',
      onAction: () => Alert.alert('Edit Name'),
    },
    {
      id: '2',
      label: 'Email:',
      value: 'jane.doe@mail.com',
      actionLabel: 'Change',
      onAction: () => Alert.alert('Change Email'),
    },
    {
      id: '3',
      label: 'Password:',
      value: '****************',
      actionLabel: 'Change',
      onAction: () => Alert.alert('Change Password'),
    },
    {
      id: '4',
      label: 'Language:',
      value: 'English',
    },
  ];

  return (
    <MemberPortalLayout title="Account">
      <ResponsiveContainer>
        <AppText variant="h2" weight="bold" style={{ marginBottom: Spacing.lg }}>
          Account
        </AppText>

        <BillingTabs
          options={['Settings', 'Notifications', 'Delegate/Care Givers']}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />

        {activeTab === 'Settings' && (
          <View style={styles.listContainer}>
            {settings.map((item) => (
              <SettingCard
                key={item.id}
                label={item.label}
                value={item.value}
                actionLabel={item.actionLabel}
                onAction={item.onAction}
              />
            ))}
          </View>
        )}

        {activeTab !== 'Settings' && (
          <View style={styles.placeholderContainer}>
            <AppText variant="md" color={Colors.text.primary} align="center">
              Content for {activeTab} coming soon...
            </AppText>
          </View>
        )}
      </ResponsiveContainer>
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: Spacing.radius.md,
  },
  placeholderContainer: {
    marginTop: Spacing.xl,
    padding: Spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: Spacing.radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountScreen;

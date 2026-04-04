import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import BillingTabs from '../../components/Billing/BillingTabs';
import SettingCard from '../../components/Account/SettingCard';
import { Colors } from '../../../core/theme/colors';
import { getFigmaPos } from '../../../core/utils/layout';

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
    <MemberPortalLayout>
      <View style={[styles.absoluteWrapper, getFigmaPos(358, 395), { width: 1040 }]}>
        <View style={styles.container}>
          {/* Title */}
          <AppText variant="h2" weight="bold" style={{ marginBottom: 24 }}>
            Account
          </AppText>

          {/* Tabs */}
          <BillingTabs
            options={['Settings', 'Notifications', 'Delegate/Care Givers']}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            activeColor={Colors.primary}
          />

          {activeTab === 'Settings' && (
            <View style={styles.listContainer}>
              {settings.map((item) => (
                <View key={item.id} style={{ marginBottom: 16 }}>
                  <SettingCard
                    label={item.label}
                    value={item.value}
                    actionLabel={item.actionLabel}
                    onAction={item.onAction}
                  />
                </View>
              ))}
            </View>
          )}

          {activeTab !== 'Settings' && (
            <View style={styles.placeholderContainer}>
              <AppText variant="body1">Content for {activeTab} coming soon...</AppText>
            </View>
          )}
        </View>
      </View>
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  absoluteWrapper: {
    position: 'absolute',
  },
  container: {
    padding: 24,
    flexDirection: 'column',
  },
  h2: {
    marginBottom: 24,
  },
  listContainer: {
    marginTop: 32,
    flexDirection: 'column',
  },
  placeholderContainer: {
    marginTop: 32,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});

export default AccountScreen;

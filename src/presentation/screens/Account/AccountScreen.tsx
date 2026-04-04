import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text } from '../../components/Common/Text';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import BillingTabs from '../../components/Billing/BillingTabs';
import SettingCard from '../../components/Account/SettingCard';
import { Colors } from '../../../core/theme/colors';

const BASE_X = 9;
const BASE_Y = 254;

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
      <View
        style={[styles.absoluteWrapper, { left: 358 - BASE_X, top: 395 - BASE_Y, width: 1040 }]}
      >
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.h2}>Account</Text>

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
              <Text style={styles.body1}>Content for {activeTab} coming soon...</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
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
  body1: {
    fontSize: 16,
    color: Colors.text.primary,
  },
});

export default AccountScreen;

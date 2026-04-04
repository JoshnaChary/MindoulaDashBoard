import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from './Common/Text';
import { useNavigation } from '@react-navigation/native';
import { AppConstants } from '../../core/constants/AppConstants';
import { Colors } from '../../core/theme/colors';

const BASE_X = 9;
const BASE_Y = 254;

interface Props {
  children: React.ReactNode;
}

const MemberPortalLayout: React.FC<Props> = ({ children }) => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator
      contentContainerStyle={styles.horizontalContent}
      style={styles.rootStyle}
    >
      <ScrollView showsVerticalScrollIndicator contentContainerStyle={styles.verticalContent}>
        <View style={styles.mainInterface}>
          <View style={styles.mainView}>
            {/* Header/BG Bar */}
            <View
              style={[
                styles.absolute,
                {
                  left: 9 - BASE_X,
                  top: 254 - BASE_Y,
                  width: 1440,
                  height: 74,
                  backgroundColor: Colors.background.header,
                },
              ]}
            />
            <Text
              style={[
                styles.absolute,
                {
                  left: 33 - BASE_X,
                  top: 276 - BASE_Y,
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: '500',
                },
              ]}
            >
              Member Portal
            </Text>

            {/* Sidebar BG */}
            <View
              style={[
                styles.absolute,
                {
                  left: 9 - BASE_X,
                  top: 328 - BASE_Y,
                  width: 309,
                  height: 726,
                  backgroundColor: Colors.background.sidebar,
                },
              ]}
            />

            {/* Sidebar Nav Items */}
            <View style={[styles.absolute, { left: 50 - BASE_X, top: 365 - BASE_Y, width: 231 }]}>
              <TouchableOpacity onPress={() => navigation.navigate(AppConstants.screens.dashboard)}>
                <Text style={styles.navText}>Home</Text>
              </TouchableOpacity>
              <View style={styles.navSpace} />
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate(AppConstants.screens.messages)}
                >
                  <Text style={styles.navText}>Messages</Text>
                </TouchableOpacity>
                <View
                  style={[
                    styles.absolute,
                    {
                      left: 104,
                      top: 14,
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: Colors.primary,
                    },
                  ]}
                />
              </View>
              <View style={styles.navSpace} />
              <Text style={styles.navText}>Appointments</Text>
              <Text style={styles.divider}>_______________</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(AppConstants.screens.prescriptions)}
              >
                <Text style={styles.navText}>Prescriptions</Text>
              </TouchableOpacity>
              <View style={styles.navSpace} />
              <Text style={styles.navText}>Lab results</Text>
              <View style={styles.navSpace} />
              <Text style={styles.navText}>Questionnaires</Text>
              <View style={styles.navSpace} />
              <Text style={styles.navText}>Documents</Text>
              <CircleIcon isActive={false} />
              <Text style={styles.divider}>________________________</Text>
              <Text style={styles.navText}>Insurance</Text>
              <View style={styles.navSpace} />
              <TouchableOpacity onPress={() => navigation.navigate(AppConstants.screens.billing)}>
                <Text style={styles.navText}>Billing</Text>
              </TouchableOpacity>
              <View style={styles.navSpace} />
              <TouchableOpacity onPress={() => navigation.navigate(AppConstants.screens.account)}>
                <Text style={styles.navText}>Account</Text>
              </TouchableOpacity>
            </View>

            {/* Main Content Area */}
            {children}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const CircleIcon = ({ isActive }: { isActive: boolean }) =>
  isActive ? <View style={styles.activeDot} /> : null;

const styles = StyleSheet.create({
  rootStyle: { backgroundColor: Colors.background.default, flex: 1 },
  horizontalContent: { minWidth: 1440 },
  verticalContent: { minHeight: 1054 },
  mainInterface: { width: 1440, height: 1054 },
  mainView: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 1440,
    height: 1054,
    backgroundColor: Colors.white,
  },
  absolute: { position: 'absolute' },
  navText: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.text.dark,
    marginVertical: 4,
  },
  navSpace: { height: 12 },
  divider: { color: Colors.border, marginVertical: 12 },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
});

export default MemberPortalLayout;

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from '../../components/Common/Text';
import { useNavigation } from '@react-navigation/native';
import { AppConstants } from '../../../core/constants/AppConstants';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import { Colors } from '../../../core/theme/colors';

// Base coordinates for normalization (Node 1:10)
const BASE_X = 9;
const BASE_Y = 254;

const FigmaDashboardView: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <MemberPortalLayout>
      <View style={{ marginTop: 74 }}>
        {/* Hello, Jane */}
        <Text
          style={[
            styles.absolute,
            {
              left: 358 - BASE_X,
              top: 290 - BASE_Y,
              width: 355,
              height: 36,
              color: Colors.text.dark,
              fontSize: 20,
              fontWeight: '500',
            },
          ]}
        >
          Hello, Jane
        </Text>

        {/* Upcoming Appointment Header */}
        <Text
          style={[
            styles.absolute,
            {
              left: 358 - BASE_X,
              top: 349 - BASE_Y,
              width: 355,
              height: 36,
              color: Colors.text.dark,
              fontSize: 16,
              fontWeight: '300',
            },
          ]}
        >
          Upcoming appointment
        </Text>

        {/* Appointment Card */}
        <View
          style={[
            styles.absolute,
            {
              left: 358 - BASE_X,
              top: 380 - BASE_Y,
              width: 653,
              height: 104,
              backgroundColor: Colors.white,
              borderWidth: 1,
              borderColor: Colors.border,
              borderRadius: 8,
            },
          ]}
        />
        <View
          style={[
            styles.absolute,
            styles.dateBadge,
            {
              left: 373 - BASE_X,
              top: 392 - BASE_Y,
              width: 70,
              height: 75,
              backgroundColor: Colors.dashboard.badgeBg,
            },
          ]}
        />
        <Text style={[styles.absolute, styles.dateNum, { left: 381 - BASE_X, top: 407 - BASE_Y }]}>
          14
        </Text>
        <Text
          style={[styles.absolute, styles.dateMonth, { left: 381 - BASE_X, top: 434 - BASE_Y }]}
        >
          April
        </Text>
        <Text
          style={[styles.absolute, styles.apptTitle, { left: 470 - BASE_X, top: 405 - BASE_Y }]}
        >
          Follow-up with Dr. J Kim{'\n'}at 3:50 PM ET - 4:10 PM ET
        </Text>
        <TouchableOpacity
          style={[
            styles.absolute,
            styles.button,
            {
              left: 863 - BASE_X,
              top: 411 - BASE_Y,
              width: 124,
              height: 39,
              backgroundColor: Colors.primary,
            },
          ]}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Join Video</Text>
        </TouchableOpacity>

        {/* Help Header */}
        <Text
          style={[
            styles.absolute,
            {
              left: 358 - BASE_X,
              top: 533 - BASE_Y,
              width: 355,
              height: 36,
              color: Colors.text.dark,
              fontSize: 16,
              fontWeight: '300',
            },
          ]}
        >
          How can we help you today?
        </Text>

        {/* Action Cards */}
        <TouchableOpacity
          style={[styles.absolute, styles.actionCard, { left: 358 - BASE_X, top: 561 - BASE_Y }]}
          onPress={() => navigation.navigate(AppConstants.screens.messages)}
        >
          <Image
            source={require('../../../assets/message-icon.png')}
            style={[
              styles.absolute,
              { width: 62, height: 62, left: 18, top: 16, resizeMode: 'contain' },
            ]}
          />
          <Text style={[styles.actionText, { left: 94, top: 41 }]}>View 3 new messages</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.absolute, styles.actionCard, { left: 358 - BASE_X, top: 680 - BASE_Y }]}
        >
          <Text style={[styles.actionText, { left: 24, top: 39 }]}>Request an appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.absolute, styles.actionCard, { left: 358 - BASE_X, top: 798 - BASE_Y }]}
        >
          <Text style={[styles.actionText, { left: 24, top: 41 }]}>
            Request a prescription refill
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.absolute, styles.actionCard, { left: 358 - BASE_X, top: 917 - BASE_Y }]}
        >
          <Text style={[styles.actionText, { left: 24, top: 41 }]}>
            Send a message to my care team
          </Text>
        </TouchableOpacity>
      </View>
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  absolute: { position: 'absolute' },
  dateBadge: { alignItems: 'center', justifyContent: 'center' },
  dateNum: {
    width: 54,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  dateMonth: {
    width: 54,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  apptTitle: {
    width: 441,
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  button: { justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: '500' },
  actionCard: {
    width: 653,
    height: 104,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'absolute',
  },
  actionText: {
    position: 'absolute',
    color: Colors.dashboard.actionLink,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default FigmaDashboardView;

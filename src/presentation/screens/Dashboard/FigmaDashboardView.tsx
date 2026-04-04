import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { useNavigation } from '@react-navigation/native';
import { AppConstants } from '../../../core/constants/AppConstants';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import { Colors } from '../../../core/theme/colors';
import { getFigmaPos } from '../../../core/utils/layout';

const FigmaDashboardView: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <MemberPortalLayout>
      <View style={{ marginTop: 74 }}>
        {/* Hello, Jane */}
        <AppText
          style={[
            styles.absolute,
            getFigmaPos(358, 290),
            {
              width: 355,
              height: 36,
            },
          ]}
          variant="h3"
          weight="medium"
        >
          Hello, Jane
        </AppText>

        {/* Upcoming Appointment Header */}
        <AppText
          style={[
            styles.absolute,
            getFigmaPos(358, 349),
            {
              width: 355,
              height: 36,
              fontWeight: '300',
            },
          ]}
          variant="body1"
        >
          Upcoming appointment
        </AppText>

        {/* Appointment Card */}
        <View
          style={[
            styles.absolute,
            getFigmaPos(358, 380),
            {
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
            getFigmaPos(373, 392),
            {
              width: 70,
              height: 75,
              backgroundColor: Colors.dashboard.badgeBg,
            },
          ]}
        />
        <AppText style={[styles.absolute, styles.dateNum, getFigmaPos(381, 407)]}>14</AppText>
        <AppText style={[styles.absolute, styles.dateMonth, getFigmaPos(381, 434)]}>April</AppText>
        <AppText style={[styles.absolute, styles.apptTitle, getFigmaPos(470, 405)]}>
          Follow-up with Dr. J Kim{'\n'}at 3:50 PM ET - 4:10 PM ET
        </AppText>
        <TouchableOpacity
          style={[
            styles.absolute,
            styles.button,
            getFigmaPos(863, 411),
            {
              width: 124,
              height: 39,
              backgroundColor: Colors.primary,
            },
          ]}
          onPress={() => {}}
        >
          <AppText style={styles.buttonText} weight="medium">
            Join Video
          </AppText>
        </TouchableOpacity>

        {/* Help Header */}
        <AppText
          style={[
            styles.absolute,
            getFigmaPos(358, 533),
            {
              width: 355,
              height: 36,
              fontWeight: '300',
            },
          ]}
          variant="body1"
        >
          How can we help you today?
        </AppText>

        {/* Action Cards */}
        <TouchableOpacity
          style={[styles.absolute, styles.actionCard, getFigmaPos(358, 561)]}
          onPress={() => navigation.navigate(AppConstants.screens.messages)}
        >
          <Image
            source={require('../../../assets/message-icon.png')}
            style={[
              styles.absolute,
              { width: 62, height: 62, left: 18, top: 16, resizeMode: 'contain' },
            ]}
          />
          <AppText style={[styles.actionText, { left: 94, top: 41 }]} weight="medium">
            View 3 new messages
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.absolute, styles.actionCard, getFigmaPos(358, 680)]}>
          <AppText style={[styles.actionText, { left: 24, top: 39 }]} weight="medium">
            Request an appointment
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.absolute, styles.actionCard, getFigmaPos(358, 798)]}>
          <AppText style={[styles.actionText, { left: 24, top: 41 }]} weight="medium">
            Request a prescription refill
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.absolute, styles.actionCard, getFigmaPos(358, 917)]}>
          <AppText style={[styles.actionText, { left: 24, top: 41 }]} weight="medium">
            Send a message to my care team
          </AppText>
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

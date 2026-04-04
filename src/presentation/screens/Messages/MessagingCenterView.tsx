import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { useNavigation } from '@react-navigation/native';
import { AppConstants } from '../../../core/constants/AppConstants';
import { Colors } from '../../../core/theme/colors';
import { getFigmaPos, FIGMA_BASE_X } from '../../../core/utils/layout';
import { StackNavigationProp } from '../../../core/navigation/types';
import { MessageThread } from '../../../data/models/DomainModels';

// Layout Geometry Constants from Figma JSON
const BASE_Y = 215;
const ROW_WIDTH = 345;
const ROW_HEIGHT = 113;
const CONTENT_X_OFFSET = 30;
const TITLE_Y_OFFSET = 36;
const SUB_Y_OFFSET = 62;
const TIME_X_OFFSET = 267;
const TIME_Y_OFFSET = 36;

const MessagingCenterView: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const [selectedId, setSelectedId] = useState(3);

  const messageThreads: MessageThread[] = [
    {
      id: 1,
      title: 'Northside Clinic',
      subtitle: 'Your April 3 appointment is',
      time: '2:30PM',
      clickable: true,
      unread: true,
    },
    {
      id: 2,
      title: 'Care Team',
      subtitle: 'Nice seeing you today.',
      time: 'April 3',
      clickable: false,
      unread: false,
    },
    {
      id: 3,
      title: 'Dr. J Kim',
      subtitle: 'I have been feeling a bit better',
      time: 'April 3',
      clickable: true,
      unread: false,
    },
    {
      id: 4,
      title: 'Billing Questions',
      subtitle: 'Send over the documents when you can.',
      time: 'April 3',
      clickable: false,
      unread: false,
    },
  ];

  const renderThreadItem = (thread: MessageThread, index: number) => {
    const isSelected = selectedId === thread.id;
    const top = 403 + index * ROW_HEIGHT;

    const content = (
      <View style={{ width: ROW_WIDTH, height: ROW_HEIGHT }}>
        <View style={[styles.titleRow, { left: CONTENT_X_OFFSET, top: TITLE_Y_OFFSET }]}>
          <AppText style={styles.listTitle} weight="medium">
            {thread.title}
          </AppText>
          {thread.unread && <View style={styles.unreadDot} />}
        </View>

        <AppText
          style={[styles.listSub, { left: CONTENT_X_OFFSET, top: SUB_Y_OFFSET }]}
          variant="body2"
        >
          {thread.subtitle}
        </AppText>

        <AppText
          style={[styles.listTime, { left: TIME_X_OFFSET, top: TIME_Y_OFFSET }]}
          variant="body2"
        >
          {thread.time}
        </AppText>

        {isSelected && (
          <View style={[styles.selectionBar, { right: 0, top: 0, height: ROW_HEIGHT }]} />
        )}
      </View>
    );

    const containerStyle = [
      styles.absolute,
      getFigmaPos(241, top, FIGMA_BASE_X, BASE_Y),
      {
        width: ROW_WIDTH,
        height: ROW_HEIGHT,
        backgroundColor: isSelected ? Colors.bubbles.inboundBg : 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
      },
    ];

    return (
      <TouchableOpacity
        key={thread.id}
        onPress={() => setSelectedId(thread.id)}
        disabled={!thread.clickable}
        style={containerStyle}
      >
        {content}
      </TouchableOpacity>
    );
  };

  const renderDetailPanel = () => {
    const renderHeader = (title: string) => (
      <>
        <View
          style={[
            styles.absolute,
            getFigmaPos(587, 349, FIGMA_BASE_X, BASE_Y),
            {
              width: 853,
              height: 54,
              backgroundColor: Colors.white,
            },
          ]}
        />
        <AppText
          style={[
            styles.absolute,
            styles.panelTitleCenter,
            getFigmaPos(587, 365, FIGMA_BASE_X, BASE_Y),
            { width: 853 },
          ]}
          weight="medium"
        >
          {title}
        </AppText>
        <TouchableOpacity
          style={[
            styles.absolute,
            styles.buttonPrimary,
            getFigmaPos(1228, 356, FIGMA_BASE_X, BASE_Y),
            { width: 196, height: 40 },
          ]}
        >
          <AppText style={styles.buttonPrimaryText} weight="medium">
            Request Appointment
          </AppText>
        </TouchableOpacity>
      </>
    );

    if (selectedId === 1) {
      return (
        <>
          {renderHeader('Northside Clinic')}
          <AppText
            style={[
              styles.absolute,
              styles.dateHeader,
              getFigmaPos(587, 415, FIGMA_BASE_X, BASE_Y),
              { width: 853 },
            ]}
            variant="body2"
          >
            April 1, 2026
          </AppText>

          <View
            style={[
              styles.absolute,
              styles.msgCard,
              getFigmaPos(623, 447, FIGMA_BASE_X, BASE_Y),
              {
                width: 408,
                height: 215,
                backgroundColor: Colors.bubbles.notification,
              },
            ]}
          >
            <AppText style={styles.msgBody} weight="medium">
              Your April 3 appointment is confirmed{'\n'}
              With: Dr. M. Okafor, MD{'\n'}
              Date: Thursday, April 3, 2026{'\n'}
              Time: 10:00 – 10:30 AM ET{'\n'}
              Type: Video visit
            </AppText>
            <TouchableOpacity style={styles.cardBtn}>
              <AppText style={styles.cardBtnText} weight="medium">
                View
              </AppText>
            </TouchableOpacity>
          </View>
          <AppText
            style={[styles.msgTimeBelow, getFigmaPos(623, 668, FIGMA_BASE_X, BASE_Y)]}
            variant="body2"
          >
            2:30PM
          </AppText>

          <View
            style={[
              styles.absolute,
              styles.msgCard,
              getFigmaPos(623, 700, FIGMA_BASE_X, BASE_Y),
              {
                width: 408,
                height: 129,
                backgroundColor: Colors.bubbles.notification,
              },
            ]}
          >
            <AppText style={styles.msgBody} weight="medium">
              You’ve received a consent form to sign.
            </AppText>
            <TouchableOpacity style={[styles.cardBtn, { width: 153 }]}>
              <AppText style={styles.cardBtnText} weight="medium">
                Review & Sign
              </AppText>
            </TouchableOpacity>
          </View>
          <AppText
            style={[styles.msgTimeBelow, getFigmaPos(623, 836, FIGMA_BASE_X, BASE_Y)]}
            variant="body2"
          >
            2:30PM
          </AppText>

          <View
            style={[
              styles.absolute,
              styles.msgCard,
              getFigmaPos(623, 867, FIGMA_BASE_X, BASE_Y),
              {
                width: 408,
                height: 129,
                backgroundColor: Colors.bubbles.notification,
              },
            ]}
          >
            <AppText style={styles.msgBody} weight="medium">
              You've received your lab results.
            </AppText>
            <TouchableOpacity style={[styles.cardBtn, { width: 143 }]}>
              <AppText style={styles.cardBtnText} weight="medium">
                View Results
              </AppText>
            </TouchableOpacity>
          </View>
          <AppText
            style={[styles.msgTimeBelow, getFigmaPos(623, 1003, FIGMA_BASE_X, BASE_Y)]}
            variant="body2"
          >
            2:30PM
          </AppText>

          <View
            style={[
              styles.absolute,
              styles.msgCard,
              getFigmaPos(623, 1034, FIGMA_BASE_X, BASE_Y),
              {
                width: 408,
                height: 129,
                backgroundColor: Colors.bubbles.notification,
              },
            ]}
          >
            <AppText style={styles.msgBody} weight="medium">
              It's time to join your appointment.
            </AppText>
            <TouchableOpacity style={[styles.cardBtn, { width: 133 }]}>
              <AppText style={styles.cardBtnText} weight="medium">
                Join Video
              </AppText>
            </TouchableOpacity>
          </View>
          <AppText
            style={[styles.msgTimeBelow, getFigmaPos(623, 1170, FIGMA_BASE_X, BASE_Y)]}
            variant="body2"
          >
            2:30PM
          </AppText>
        </>
      );
    } else if (selectedId === 3) {
      return (
        <>
          {renderHeader('Dr. J Kim')}
          <AppText
            style={[
              styles.absolute,
              styles.dateHeader,
              getFigmaPos(587, 415, FIGMA_BASE_X, BASE_Y),
              { width: 853 },
            ]}
            variant="body2"
          >
            April 1, 2026
          </AppText>
          <AppText
            style={[
              styles.absolute,
              styles.msgSenderLabel,
              getFigmaPos(623, 420, FIGMA_BASE_X, BASE_Y),
            ]}
            variant="body2"
          >
            Dr. J Kim
          </AppText>

          <View
            style={[
              styles.absolute,
              styles.msgBubbleLeft,
              getFigmaPos(623, 447, FIGMA_BASE_X, BASE_Y),
              {
                width: 311,
                height: 161,
                backgroundColor: Colors.bubbles.inboundBg,
              },
            ]}
          >
            <AppText style={styles.msgBody} weight="medium">
              Hi Jane, I wanted to let you know your lab results from last week are in. Overall they
              look good — I will go through them with you at your next appointment on April 3. In
              the meantime feel free to review them.
            </AppText>
          </View>
          <AppText
            style={[styles.msgTimeBelow, getFigmaPos(623, 615, FIGMA_BASE_X, BASE_Y)]}
            variant="body2"
          >
            2:30PM
          </AppText>

          <AppText
            style={[
              styles.absolute,
              styles.msgSenderLabel,
              getFigmaPos(880, 625, FIGMA_BASE_X, BASE_Y),
              { width: 66, textAlign: 'right' },
            ]}
            variant="body2"
          >
            You
          </AppText>

          <View
            style={[
              styles.absolute,
              styles.msgBubbleRight,
              getFigmaPos(635, 652, FIGMA_BASE_X, BASE_Y),
              {
                width: 311,
                height: 96,
                backgroundColor: Colors.bubbles.outboundBg,
              },
            ]}
          >
            <AppText style={styles.msgBody} weight="medium">
              I have been feeling a bit better overall, though sleep is still a little difficult
              some nights.
            </AppText>
          </View>
          <AppText
            style={[styles.msgTimeBelow, getFigmaPos(880, 755, FIGMA_BASE_X, BASE_Y)]}
            variant="body2"
          >
            2:50PM
          </AppText>

          <View
            style={[
              styles.absolute,
              getFigmaPos(587, 924, FIGMA_BASE_X, BASE_Y),
              {
                width: 853,
                height: 151,
                backgroundColor: Colors.white,
              },
            ]}
          >
            <View style={{ width: '100%', height: 1, backgroundColor: Colors.border }} />
            <TextInput placeholder="Message Here" style={styles.inputStyle} />
            <View style={{ width: '100%', height: 1, backgroundColor: Colors.border }} />
            <TouchableOpacity style={{ position: 'absolute', top: 110, left: 24 }}>
              <AppText style={styles.attachBtn} weight="medium">
                + Attach file
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonPrimary,
                { position: 'absolute', right: 16, top: 100, width: 112, height: 39 },
              ]}
            >
              <AppText style={styles.buttonPrimaryText} weight="medium">
                Send
              </AppText>
            </TouchableOpacity>
          </View>
        </>
      );
    }
    return null;
  };

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
            {/* Top Navigation */}
            <View
              style={[
                styles.absolute,
                {
                  left: 0,
                  top: 0,
                  width: 1440,
                  height: 74,
                  backgroundColor: Colors.background.header,
                },
              ]}
            />
            <TouchableOpacity
              style={[
                styles.absolute,
                getFigmaPos(33, 23, FIGMA_BASE_X, 0),
                { width: 416, height: 24 },
              ]}
              onPress={() => navigation.navigate(AppConstants.screens.dashboard)}
            >
              <AppText style={styles.headerTitle} weight="medium">
                Member Portal
              </AppText>
            </TouchableOpacity>

            {/* Sidebar BG */}
            <View
              style={[
                styles.absolute,
                getFigmaPos(9, 74, FIGMA_BASE_X, 0),
                {
                  width: 226,
                  height: 941,
                  backgroundColor: Colors.background.sidebar,
                },
              ]}
            />

            {/* Layout Dividers */}
            <View
              style={[
                styles.absolute,
                getFigmaPos(241, 74, FIGMA_BASE_X, 0),
                {
                  width: 1,
                  height: 941,
                  backgroundColor: Colors.border,
                },
              ]}
            />
            <View
              style={[
                styles.absolute,
                getFigmaPos(586, 74, FIGMA_BASE_X, 0),
                {
                  width: 1,
                  height: 941,
                  backgroundColor: Colors.border,
                },
              ]}
            />
            <View
              style={[
                styles.absolute,
                getFigmaPos(241, 403, FIGMA_BASE_X, BASE_Y),
                {
                  width: 1208,
                  height: 1,
                  backgroundColor: Colors.border,
                },
              ]}
            />

            {/* Back Button */}
            <TouchableOpacity
              style={[styles.absolute, getFigmaPos(263, 305, FIGMA_BASE_X, BASE_Y)]}
              onPress={() => navigation.navigate(AppConstants.screens.dashboard)}
            >
              <AppText weight="medium" style={{ fontSize: 18 }}>
                &lt; Back
              </AppText>
            </TouchableOpacity>

            {/* Title */}
            <AppText
              style={[
                styles.absolute,
                styles.panelTitle,
                getFigmaPos(263, 365, FIGMA_BASE_X, BASE_Y),
              ]}
              weight="medium"
            >
              Messages
            </AppText>

            {/* Content Rendering */}
            {messageThreads.map((thread, index) => renderThreadItem(thread, index))}
            {renderDetailPanel()}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootStyle: { backgroundColor: Colors.background.default, flex: 1 },
  horizontalContent: { minWidth: 1440 },
  verticalContent: { minHeight: 1200 },
  mainInterface: { width: 1440, height: 1200 },
  mainView: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 1440,
    height: 1200,
    backgroundColor: Colors.white,
  },
  absolute: { position: 'absolute' },
  headerTitle: { color: Colors.white, fontSize: 20 },
  panelTitle: { color: Colors.text.dark, fontSize: 18 },
  panelTitleCenter: {
    color: Colors.text.dark,
    fontSize: 18,
    textAlign: 'center',
  },
  listTitle: { fontSize: 18, color: Colors.text.dark },
  listSub: { fontSize: 13, color: Colors.text.dark },
  listTime: {
    fontSize: 13,
    color: Colors.text.dark,
    textAlign: 'right',
    width: 61,
  },
  selectionBar: { position: 'absolute', width: 8, backgroundColor: Colors.primaryDark },
  titleRow: { position: 'absolute', flexDirection: 'row', alignItems: 'center', gap: 8 },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPrimaryText: { color: Colors.white, fontSize: 16 },
  msgCard: { borderRadius: 12, borderWidth: 1, borderColor: Colors.border, padding: 20 },
  msgBubbleLeft: { borderRadius: 12, padding: 18 },
  msgBubbleRight: { borderRadius: 12, padding: 18 },
  msgBody: {
    fontSize: 18,
    color: Colors.text.dark,
    lineHeight: 22,
  },
  msgTimeBelow: {
    position: 'absolute',
    color: Colors.text.dark,
  },
  dateHeader: {
    color: Colors.text.dark,
    textAlign: 'center',
  },
  msgSenderLabel: { color: Colors.text.dark },
  cardBtn: {
    position: 'absolute',
    right: 16,
    bottom: 10,
    width: 133,
    height: 40,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBtnText: { color: Colors.primaryDark, fontSize: 16 },
  inputStyle: {
    padding: 25,
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text.dark,
  },
  attachBtn: { color: Colors.primaryDark, fontSize: 18 },
});

export default MessagingCenterView;

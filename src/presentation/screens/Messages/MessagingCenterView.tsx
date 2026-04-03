import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppConstants } from '../../../core/constants/AppConstants';
import { Colors } from '../../../core/theme/colors';

// Layout Geometry Constants from Figma JSON
const BASE_X = 9;
const BASE_Y = 215;
const ROW_WIDTH = 345;
const ROW_HEIGHT = 113;
const CONTENT_X_OFFSET = 30; // Node 1:83 (Title) relative to row start
const TITLE_Y_OFFSET = 36; // top margin from row
const SUB_Y_OFFSET = 62; // 26px gap from title
const TIME_X_OFFSET = 267; // Node 1:82 x - row start x
const TIME_Y_OFFSET = 36; // aligned to same top as title

const MessagingCenterView: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedId, setSelectedId] = useState(3); // Dr. J Kim selected in design

  const messageThreads = [
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

  const renderThreadItem = (thread: any, index: number) => {
    const isSelected = selectedId === thread.id;
    const top = 403 + index * ROW_HEIGHT; // Vertical start for Node 1:59

    const content = (
      <View style={{ width: ROW_WIDTH, height: ROW_HEIGHT }}>
        {/* Title row with inline unread dot */}
        <View style={[styles.titleRow, { left: CONTENT_X_OFFSET, top: TITLE_Y_OFFSET }]}>
          <Text style={styles.listTitle}>{thread.title}</Text>
          {thread.unread && <View style={styles.unreadDot} />}
        </View>

        {/* Subtitle */}
        <Text style={[styles.listSub, { left: CONTENT_X_OFFSET, top: SUB_Y_OFFSET }]}>
          {thread.subtitle}
        </Text>

        {/* Time */}
        <Text style={[styles.listTime, { left: TIME_X_OFFSET, top: TIME_Y_OFFSET }]}>
          {thread.time}
        </Text>

        {/* Selection Indicator Bar */}
        {isSelected && (
          <View style={[styles.selectionBar, { right: 0, top: 0, height: ROW_HEIGHT }]} />
        )}
      </View>
    );

    const containerStyle = [
      styles.absolute,
      {
        left: 241 - BASE_X,
        top: top - BASE_Y,
        width: ROW_WIDTH,
        height: ROW_HEIGHT,
        backgroundColor: isSelected ? Colors.bubbles.inboundBg : 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
      },
    ];

    if (thread.clickable) {
      return (
        <TouchableOpacity
          key={thread.id}
          onPress={() => setSelectedId(thread.id)}
          style={containerStyle}
        >
          {content}
        </TouchableOpacity>
      );
    } else {
      return (
        <View key={thread.id} style={containerStyle}>
          {content}
        </View>
      );
    }
  };

  const renderDetailPanel = () => {
    // Right panel starts at x: 587
    const renderHeader = (title: string) => (
      <>
        <View
          style={[
            styles.absolute,
            {
              left: 587 - BASE_X,
              top: 349 - BASE_Y,
              width: 853,
              height: 54,
              backgroundColor: Colors.white,
            },
          ]}
        />
        <Text
          style={[
            styles.absolute,
            styles.panelTitleCenter,
            { left: 587 - BASE_X, width: 853, top: 365 - BASE_Y },
          ]}
        >
          {title}
        </Text>
        <TouchableOpacity
          style={[
            styles.absolute,
            styles.buttonPrimary,
            { right: 16, top: 356 - BASE_Y, width: 196, height: 40 },
          ]}
        >
          <Text style={styles.buttonPrimaryText}>Request Appointment</Text>
        </TouchableOpacity>
      </>
    );

    if (selectedId === 1) {
      return (
        <>
          {renderHeader('Northside Clinic')}
          <Text
            style={[
              styles.absolute,
              styles.dateHeader,
              { left: 587 - BASE_X, width: 853, top: 415 - BASE_Y },
            ]}
          >
            April 1, 2026
          </Text>

          {/* Appointment Confirm Card (1:71) */}
          <View
            style={[
              styles.absolute,
              styles.msgCard,
              {
                left: 623 - BASE_X,
                top: 447 - BASE_Y,
                width: 408,
                height: 215,
                backgroundColor: Colors.bubbles.notification,
              },
            ]}
          >
            <Text style={styles.msgBody}>
              Your April 3 appointment is confirmed{'\n'}
              With: Dr. M. Okafor, MD{'\n'}
              Date: Thursday, April 3, 2026{'\n'}
              Time: 10:00 – 10:30 AM ET{'\n'}
              Type: Video visit
            </Text>
            <TouchableOpacity style={styles.cardBtn}>
              <Text style={styles.cardBtnText}>View</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.msgTimeBelow, { left: 623 - BASE_X, top: 668 - BASE_Y }]}>
            2:30PM
          </Text>

          {/* Consent Form Card (1:63) */}
          <View
            style={[
              styles.absolute,
              styles.msgCard,
              {
                left: 623 - BASE_X,
                top: 700 - BASE_Y,
                width: 408,
                height: 129,
                backgroundColor: Colors.bubbles.notification,
              },
            ]}
          >
            <Text style={styles.msgBody}>You’ve received a consent form to sign.</Text>
            <TouchableOpacity style={[styles.cardBtn, { width: 153 }]}>
              <Text style={styles.cardBtnText}>Review & Sign</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.msgTimeBelow, { left: 623 - BASE_X, top: 836 - BASE_Y }]}>
            2:30PM
          </Text>

          {/* Lab Results Card (1:129) */}
          <View
            style={[
              styles.absolute,
              styles.msgCard,
              {
                left: 623 - BASE_X,
                top: 867 - BASE_Y,
                width: 408,
                height: 129,
                backgroundColor: Colors.bubbles.notification,
              },
            ]}
          >
            <Text style={styles.msgBody}>You've received your lab results.</Text>
            <TouchableOpacity style={[styles.cardBtn, { width: 143 }]}>
              <Text style={styles.cardBtnText}>View Results</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.msgTimeBelow, { left: 623 - BASE_X, top: 1003 - BASE_Y }]}>
            2:30PM
          </Text>

          {/* Join Video Card (1:130) */}
          <View
            style={[
              styles.absolute,
              styles.msgCard,
              {
                left: 623 - BASE_X,
                top: 1034 - BASE_Y,
                width: 408,
                height: 129,
                backgroundColor: Colors.bubbles.notification,
              },
            ]}
          >
            <Text style={styles.msgBody}>It's time to join your appointment.</Text>
            <TouchableOpacity style={[styles.cardBtn, { width: 133 }]}>
              <Text style={styles.cardBtnText}>Join Video</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.msgTimeBelow, { left: 623 - BASE_X, top: 1170 - BASE_Y }]}>
            2:30PM
          </Text>
        </>
      );
    } else if (selectedId === 3) {
      return (
        <>
          {renderHeader('Dr. J Kim')}
          <Text
            style={[
              styles.absolute,
              styles.dateHeader,
              { left: 587 - BASE_X, width: 853, top: 415 - BASE_Y },
            ]}
          >
            April 1, 2026
          </Text>
          <Text
            style={[
              styles.absolute,
              styles.msgSenderLabel,
              { left: 623 - BASE_X, top: 420 - BASE_Y },
            ]}
          >
            Dr. J Kim
          </Text>

          {/* Dr J Kim Bubble (1:97) */}
          <View
            style={[
              styles.absolute,
              styles.msgBubbleLeft,
              {
                left: 623 - BASE_X,
                top: 447 - BASE_Y,
                width: 311,
                height: 161,
                backgroundColor: Colors.bubbles.inboundBg,
              },
            ]}
          >
            <Text style={styles.msgBody}>
              Hi Jane, I wanted to let you know your lab results from last week are in. Overall they
              look good — I will go through them with you at your next appointment on April 3. In
              the meantime feel free to review them.
            </Text>
          </View>
          <Text style={[styles.msgTimeBelow, { left: 623 - BASE_X, top: 615 - BASE_Y }]}>
            2:30PM
          </Text>

          <Text
            style={[
              styles.absolute,
              styles.msgSenderLabel,
              { right: 22, top: 625 - BASE_Y, textAlign: 'right' },
            ]}
          >
            You
          </Text>

          {/* Your Bubble (1:102) */}
          <View
            style={[
              styles.absolute,
              styles.msgBubbleRight,
              {
                right: 22,
                top: 652 - BASE_Y,
                width: 311,
                height: 96,
                backgroundColor: Colors.bubbles.outboundBg,
              },
            ]}
          >
            <Text style={styles.msgBody}>
              I have been feeling a bit better overall, though sleep is still a little difficult
              some nights.
            </Text>
          </View>
          <Text style={[styles.msgTimeBelow, { right: 22, top: 755 - BASE_Y }]}>2:50PM</Text>

          {/* Input Area (Standardized) */}
          <View
            style={[
              styles.absolute,
              {
                left: 587 - BASE_X,
                top: 924 - BASE_Y,
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
              <Text style={styles.attachBtn}>+ Attach file</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonPrimary,
                { position: 'absolute', right: 16, top: 100, width: 112, height: 39 },
              ]}
            >
              <Text style={styles.buttonPrimaryText}>Send</Text>
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
              style={[styles.absolute, { left: 33 - BASE_X, top: 23, width: 416, height: 24 }]}
              onPress={() => navigation.navigate(AppConstants.screens.dashboard)}
            >
              <Text style={styles.headerTitle}>Member Portal</Text>
            </TouchableOpacity>

            {/* Sidebar BG */}
            <View
              style={[
                styles.absolute,
                {
                  left: 9 - BASE_X,
                  top: 74,
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
                {
                  left: 241 - BASE_X,
                  top: 74,
                  width: 1,
                  height: 941,
                  backgroundColor: Colors.border,
                },
              ]}
            />
            <View
              style={[
                styles.absolute,
                {
                  left: 586 - BASE_X,
                  top: 74,
                  width: 1,
                  height: 941,
                  backgroundColor: Colors.border,
                },
              ]}
            />
            <View
              style={[
                styles.absolute,
                {
                  left: 241 - BASE_X,
                  top: 403 - BASE_Y,
                  width: 1208,
                  height: 1,
                  backgroundColor: Colors.border,
                },
              ]}
            />

            {/* Back Button */}
            <TouchableOpacity
              style={[styles.absolute, { left: 263 - BASE_X, top: 305 - BASE_Y }]}
              onPress={() => navigation.navigate(AppConstants.screens.dashboard)}
            >
              <Text
                style={{
                  color: Colors.text.dark,
                  fontSize: 18,
                  fontWeight: '500',
                  fontFamily: 'Inter',
                }}
              >
                &lt; Back
              </Text>
            </TouchableOpacity>

            {/* Title */}
            <Text
              style={[
                styles.absolute,
                styles.panelTitle,
                { left: 263 - BASE_X, top: 365 - BASE_Y },
              ]}
            >
              Messages
            </Text>

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
  headerTitle: { color: Colors.white, fontFamily: 'Inter', fontSize: 20, fontWeight: '500' },
  panelTitle: { color: Colors.text.dark, fontFamily: 'Inter', fontSize: 18, fontWeight: '500' },
  panelTitleCenter: {
    color: Colors.text.dark,
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  listTitle: { fontSize: 18, fontWeight: '500', color: Colors.text.dark, fontFamily: 'Inter' },
  listSub: { fontSize: 13, fontWeight: '300', color: Colors.text.dark, fontFamily: 'Inter' },
  listTime: {
    fontSize: 13,
    fontWeight: '300',
    color: Colors.text.dark,
    fontFamily: 'Inter',
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
  buttonPrimaryText: { color: Colors.white, fontSize: 16, fontWeight: '500', fontFamily: 'Inter' },
  msgCard: { borderRadius: 12, borderWidth: 1, borderColor: Colors.border, padding: 20 },
  msgBubbleLeft: { borderRadius: 12, padding: 18 },
  msgBubbleRight: { borderRadius: 12, padding: 18 },
  msgBody: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text.dark,
    fontFamily: 'Inter',
    lineHeight: 22,
  },
  msgTimeBelow: {
    position: 'absolute',
    fontSize: 13,
    fontWeight: '300',
    color: Colors.text.dark,
    fontFamily: 'Inter',
  },
  dateHeader: {
    color: Colors.text.dark,
    fontSize: 13,
    fontWeight: '300',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  msgSenderLabel: { color: Colors.text.dark, fontSize: 13, fontWeight: '300', fontFamily: 'Inter' },
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
  cardBtnText: { color: Colors.primaryDark, fontSize: 16, fontWeight: '500', fontFamily: 'Inter' },
  inputStyle: {
    padding: 25,
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: Colors.text.dark,
  },
  attachBtn: { color: Colors.primaryDark, fontSize: 18, fontWeight: '500', fontFamily: 'Inter' },
});

export default MessagingCenterView;

import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { AppButton } from '../../../components/atoms/AppButton';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import { useResponsive } from '../../../core/utils/useResponsive';

interface ChatPanelProps {
  threadId: number;
  onBack?: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ threadId, onBack }) => {
  const { isPhone } = useResponsive();

  const renderMessage = (
    text: string,
    sender: 'me' | 'other',
    time: string,
    isNotification?: boolean,
  ) => {
    if (isNotification) {
      return (
        <View style={styles.notificationBubble}>
          <AppText variant="md" color={Colors.text.primary} style={{ lineHeight: 22 }}>
            {text}
          </AppText>
          <AppButton label="View" variant="outline" size="small" style={styles.bubbleAction} />
          <AppText variant="xs" color={Colors.text.muted} align="right" style={{ marginTop: 4 }}>
            {time}
          </AppText>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.bubbleContainer,
          sender === 'me' ? styles.bubbleMeContainer : styles.bubbleOtherContainer,
        ]}
      >
        <View style={[styles.bubble, sender === 'me' ? styles.bubbleMe : styles.bubbleOther]}>
          <AppText variant="md" color={sender === 'me' ? Colors.text.primary : Colors.text.dark}>
            {text}
          </AppText>
        </View>
        <AppText variant="xs" color={Colors.text.muted} style={styles.bubbleTime}>
          {time}
        </AppText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Mini Header */}
      <View style={styles.header}>
        {isPhone && (
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <AppText variant="md" weight="medium" color={Colors.primary}>
              &lt; Back
            </AppText>
          </TouchableOpacity>
        )}
        <View style={styles.headerTitle}>
          <AppText variant="md" weight="bold">
            Thread Details
          </AppText>
          <AppText variant="xs" color={Colors.text.secondary}>
            Care Team • Responsive View
          </AppText>
        </View>
        {!isPhone && <AppButton label="Request Appointment" variant="primary" size="small" />}
      </View>

      {/* Chat Area */}
      <ScrollView contentContainerStyle={styles.chatScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.dateSeparator}>
          <AppText variant="xs" color={Colors.text.muted}>
            April 1, 2026
          </AppText>
        </View>

        {threadId === 1 ? (
          <>
            {renderMessage(
              'Your April 3 appointment is confirmed\nWith: Dr. M. Okafor, MD\nDate: Thursday, April 3, 2026',
              'other',
              '2:30PM',
              true,
            )}
            {renderMessage('You’ve received a consent form to sign.', 'other', '2:30PM', true)}
            {renderMessage("It's time to join your appointment.", 'other', '3:00PM', true)}
          </>
        ) : (
          <>
            {renderMessage(
              'Hi Jane, I wanted to let you know your lab results from last week are in.',
              'other',
              '2:30PM',
            )}
            {renderMessage(
              'I have been feeling a bit better overall, though sleep is still a little difficult some nights.',
              'me',
              '2:50PM',
            )}
          </>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TextInput placeholder="Type your message here..." style={styles.input} multiline />
        <View style={styles.inputActions}>
          <TouchableOpacity style={styles.attachBtn}>
            <AppText variant="sm" weight="medium" color={Colors.primary}>
              + Attach file
            </AppText>
          </TouchableOpacity>
          <AppButton label="Send" size="small" style={{ width: 80 }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    marginRight: Spacing.md,
  },
  headerTitle: {
    flex: 1,
    justifyContent: 'center',
  },
  chatScroll: {
    padding: Spacing.lg,
    flexGrow: 1,
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  bubbleContainer: {
    marginBottom: Spacing.lg,
    maxWidth: '85%',
  },
  bubbleMeContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubbleOtherContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    padding: Spacing.md,
    borderRadius: Spacing.radius.md,
  },
  bubbleMe: {
    backgroundColor: Colors.bubbles.outboundBg,
    borderBottomRightRadius: 2,
  },
  bubbleOther: {
    backgroundColor: Colors.bubbles.inboundBg,
    borderBottomLeftRadius: 2,
  },
  notificationBubble: {
    backgroundColor: Colors.bubbles.notification,
    padding: Spacing.lg,
    borderRadius: Spacing.radius.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bubbleAction: {
    marginTop: Spacing.md,
    alignSelf: 'flex-start',
    minWidth: 100,
  },
  bubbleTime: {
    marginTop: 4,
  },
  inputArea: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: Spacing.md,
  },
  input: {
    minHeight: 48,
    maxHeight: 120,
    backgroundColor: Colors.background.default,
    borderRadius: Spacing.radius.sm,
    padding: Spacing.md,
    fontSize: 16,
    marginBottom: Spacing.sm,
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attachBtn: {
    padding: Spacing.sm,
  },
});

export default ChatPanel;

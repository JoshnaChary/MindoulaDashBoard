import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { ResponsiveContainer } from '../../../components/atoms/ResponsiveContainer';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import { useResponsive } from '../../../core/utils/useResponsive';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import ThreadItem from '../../components/Messages/ThreadItem';
import ChatPanel from '../../components/Messages/ChatPanel';
import { MessageThread } from '../../../data/models/DomainModels';

type MessagingCenterViewProps = {
  // Test-only knobs to cover branches without mocking React internals.
  initialSelectedId?: number | null;
  initialShowDetailOnMobile?: boolean;
};

const MessagingCenterView: React.FC<MessagingCenterViewProps> = ({
  initialSelectedId = 1,
  initialShowDetailOnMobile = false,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(initialSelectedId);
  const { isPhone, isDesktop, height } = useResponsive();
  const [showDetailOnMobile, setShowDetailOnMobile] = useState(initialShowDetailOnMobile);

  const messageThreads: MessageThread[] = [
    {
      id: 1,
      title: 'Northside Clinic',
      subtitle: 'Your April 3 appointment is confirmed',
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
  ];

  const handleSelectThread = (id: number) => {
    setSelectedId(id);
    if (isPhone) {
      setShowDetailOnMobile(true);
    }
  };

  const renderThreadList = () => (
    <View style={styles.threadList}>
      <AppText variant="h2" weight="bold" style={styles.title}>
        Messages
      </AppText>
      <ScrollView showsVerticalScrollIndicator={false}>
        {messageThreads.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            isSelected={selectedId === thread.id}
            onPress={() => handleSelectThread(thread.id)}
          />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <MemberPortalLayout title="Messages">
      <ResponsiveContainer padding="none" fluid={isDesktop}>
        <View style={[styles.mainContainer, { height: height - 128 }]}>
          {/* Split View for Desktop/Tablet or List View for Mobile */}
          {(!isPhone || !showDetailOnMobile) && (
            <View style={[styles.listPane, isPhone && styles.mobilePane]}>
              {renderThreadList()}
            </View>
          )}

          {/* Details Pane (Split on Desktop, Full on Mobile when active) */}
          {(!isPhone || showDetailOnMobile) && (
            <View style={[styles.detailPane, isPhone && styles.mobilePane]}>
              {selectedId ? (
                <ChatPanel threadId={selectedId} onBack={() => setShowDetailOnMobile(false)} />
              ) : (
                <View style={styles.emptyState}>
                  <AppText variant="md" color={Colors.text.muted}>
                    Select a thread to start messaging
                  </AppText>
                </View>
              )}
            </View>
          )}
        </View>
      </ResponsiveContainer>
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 600,
  },
  listPane: {
    width: 320,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    backgroundColor: Colors.white,
  },
  detailPane: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  mobilePane: {
    width: '100%',
    borderRightWidth: 0,
  },
  threadList: {
    flex: 1,
  },
  title: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
});

export default MessagingCenterView;

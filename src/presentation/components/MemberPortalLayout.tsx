import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  RefreshControl,
} from 'react-native';
import { AppText } from '../../components/atoms/AppText';
import { AppIcon } from '../../components/atoms/AppIcon';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { AppConstants } from '../../core/constants/AppConstants';
import { Colors } from '../../core/theme/colors';
import { Spacing } from '../../core/theme/spacing';
import { useResponsive } from '../../core/utils/useResponsive';

interface Props {
  children: React.ReactNode;
  title?: string;
  showSidebar?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const MemberPortalLayout: React.FC<Props> = ({
  children,
  title = 'Member Portal',
  showSidebar = true,
  onRefresh,
  refreshing = false,
}) => {
  const navigation = useNavigation<any>();
  const { isMobile, isDesktop, isTablet } = useResponsive();

  // On Mobile, we don't show the sidebar inside the layout because we use a Drawer.
  const shouldShowSidebar = showSidebar && isDesktop;
  const isMobileHeader = isMobile || isTablet;

  return (
    <SafeAreaView style={styles.rootStyle}>
      <View style={styles.container}>
        {/* Header - Always Visible */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {isMobileHeader && (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                style={styles.menuButton}
              >
                <AppIcon name="menu" size={24} color={Colors.white} />
              </TouchableOpacity>
            )}
            <AppText variant="lg" weight="medium" color={Colors.white}>
              {title}
            </AppText>
          </View>
        </View>

        <View style={styles.contentRow}>
          {/* Sidebar - Desktop Only */}
          {shouldShowSidebar && (
            <View style={styles.sidebar}>
              <ScrollView contentContainerStyle={styles.sidebarContent}>
                <NavItem
                  label="Home"
                  onPress={() => navigation.navigate(AppConstants.screens.dashboard)}
                  isActive
                />
                <NavItem
                  label="Messages"
                  onPress={() => navigation.navigate(AppConstants.screens.messages)}
                  hasBadge
                />
                <NavItem label="Appointments" onPress={() => {}} />

                <View style={styles.divider} />

                <NavItem
                  label="Prescriptions"
                  onPress={() => navigation.navigate(AppConstants.screens.prescriptions)}
                />
                <NavItem label="Lab results" onPress={() => {}} />
                <NavItem label="Questionnaires" onPress={() => {}} />
                <NavItem label="Documents" onPress={() => {}} />

                <View style={styles.divider} />

                <NavItem label="Insurance" onPress={() => {}} />
                <NavItem
                  label="Billing"
                  onPress={() => navigation.navigate(AppConstants.screens.billing)}
                />
                <NavItem
                  label="Account"
                  onPress={() => navigation.navigate(AppConstants.screens.account)}
                />
              </ScrollView>
            </View>
          )}

          {/* Main Content */}
          <View style={styles.mainContent}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              refreshControl={
                onRefresh ? (
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[Colors.primary]}
                    tintColor={Colors.primary}
                  />
                ) : undefined
              }
            >
              {children}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const NavItem = ({ label, onPress, isActive, hasBadge }: any) => (
  <TouchableOpacity onPress={onPress} style={styles.navItem}>
    <AppText variant="md" weight={isActive ? 'medium' : 'regular'}>
      {label}
    </AppText>
    {hasBadge && <View style={styles.badge} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 64,
    backgroundColor: Colors.background.header,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
      web: { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: Spacing.md,
    padding: Spacing.xs,
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 280,
    backgroundColor: Colors.background.sidebar,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  sidebarContent: {
    padding: Spacing.lg,
  },
  mainContent: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  navItem: {
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
});

export default MemberPortalLayout;

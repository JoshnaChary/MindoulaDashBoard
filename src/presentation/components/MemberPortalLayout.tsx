import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  RefreshControl,
} from 'react-native';
import { AppText } from '../../components/atoms/AppText';
import { AppIcon } from '../../components/atoms/AppIcon';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();
  const { isMobile, isDesktop, isTablet } = useResponsive();

  // On Mobile, we don't show the sidebar inside the layout because we use a Drawer.
  const shouldShowSidebar = showSidebar && isDesktop;
  const isMobileHeader = isMobile || isTablet;

  return (
    <View style={styles.rootStyle}>
      <View style={styles.container}>
        {/* Header - Always Visible */}
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <View style={styles.headerContent}>
            {isMobileHeader && (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                style={styles.menuButton}
                testID="menu-button"
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
                <View style={styles.divider} />
                <NavItem
                  label="Log Out"
                  onPress={() => {
                    // Navigate to initial screen or show alert
                  }}
                  isError
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
    </View>
  );
};

const NavItem = ({ label, onPress, isActive, hasBadge, isError }: any) => {
  const textColor = isError ? Colors.error : isActive ? Colors.primary : Colors.text.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.navItem}
      testID={`nav-item-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <AppText variant="md" weight={isActive ? 'medium' : 'regular'} color={textColor}>
        {label}
      </AppText>
      {hasBadge && <View style={styles.badge} testID="nav-badge" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.background.header,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        minHeight: 64,
        paddingTop: 0, // Reset padding for web as insets are 0
      },
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

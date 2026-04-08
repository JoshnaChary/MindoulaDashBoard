import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { ResponsiveContainer } from '../../../components/atoms/ResponsiveContainer';
import { useNavigation } from '@react-navigation/native';
import MemberPortalLayout from '../MemberPortalLayout';
import { Spacing } from '../../../core/theme/spacing';
import { Colors } from '../../../core/theme/colors';

interface ScreenLayoutProps {
  title: string;
  headerTitle?: string;
  onBack?: () => void;
  backLabel?: string;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  title,
  headerTitle,
  onBack,
  backLabel = 'Back',
  children,
  containerStyle,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <MemberPortalLayout title={headerTitle || title}>
      <ResponsiveContainer style={[styles.container, containerStyle]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <AppText variant="md" weight="medium" color={Colors.primary}>
            &lt; {backLabel}
          </AppText>
        </TouchableOpacity>

        <AppText variant="h2" weight="bold" style={styles.title}>
          {title}
        </AppText>

        {children}
      </ResponsiveContainer>
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xl,
  },
  backButton: {
    marginBottom: Spacing.xl,
  },
  title: {
    marginBottom: Spacing.xl,
  },
});

export default ScreenLayout;

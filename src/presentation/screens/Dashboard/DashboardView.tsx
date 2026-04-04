import React from 'react';
import { View, ScrollView, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { useDashboardViewModel } from './DashboardViewModel';
import { DashboardHeader } from '../../../components/organisms/DashboardHeader';
import { MenuListItem } from '../../../components/molecules/MenuListItem';
import { AppointmentCard } from '../../../components/organisms/AppointmentCard';
import { ActionCard } from '../../../components/organisms/ActionCard';
import { AppText } from '../../../components/atoms/AppText';
import { AppButton } from '../../../components/atoms/AppButton';
import { Colors } from '../../../core/theme/colors';
import { styles } from './Dashboard.styles';

export const DashboardView = () => {
  const { data, isLoading, error, activeMenu, onMenuPress, onCtaPress, onActionPress, refresh } =
    useDashboardViewModel();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.errorContainer}>
        <AppText variant="lg" weight="bold" style={styles.errorText}>
          {error || 'Something went wrong'}
        </AppText>
        <AppButton label="Retry" onPress={refresh} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webContainer}>
        <DashboardHeader title={data.header.title} subtitle={data.header.subtitle} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <FlatList
            data={data.menu}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <MenuListItem
                title={item}
                isActive={activeMenu === item}
                onPress={() => onMenuPress(item)}
              />
            )}
            style={styles.menuList}
          />

          {data.cards.map((card, index) => {
            if (card.type === 'appointment') {
              return (
                <AppointmentCard
                  key={index}
                  date={card.date || ''}
                  doctor={card.doctor || ''}
                  time={card.time || ''}
                  cta={card.cta || ''}
                  onCtaPress={() => onCtaPress(card.cta || '')}
                />
              );
            }
            if (card.type === 'action') {
              return (
                <ActionCard
                  key={index}
                  title={card.title || ''}
                  onPress={() => onActionPress(card.title || '')}
                />
              );
            }
            return null;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

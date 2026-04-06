import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useResponsive } from '../utils/useResponsive';
import { MainDrawerNavigator } from './MainDrawerNavigator';
import FigmaDashboardView from '../../presentation/screens/Dashboard/FigmaDashboardView';
import MessagingCenterView from '../../presentation/screens/Messages/MessagingCenterView';
import { PrescriptionScreen } from '../../presentation/screens/Prescriptions/PrescriptionScreen';
import { ViewDetailsScreen } from '../../presentation/screens/Prescriptions/ViewDetailsScreen';
import { RefillScreen } from '../../presentation/screens/Prescriptions/RefillScreen';
import { BillingScreen } from '../../presentation/screens/Billing/BillingScreen';
import { AccountScreen } from '../../presentation/screens/Account/AccountScreen';
import {
  LabResultsScreen,
  QuestionnairesScreen,
  DocumentsScreen,
  InsuranceScreen,
  AppointmentsScreen,
} from '../../presentation/screens/PlaceholderScreens';
import { AppConstants } from '../constants/AppConstants';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isPhone } = useResponsive();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isPhone ? ('Main' as any) : AppConstants.screens.dashboard}
        screenOptions={{ headerShown: false }}
      >
        {isPhone ? (
          // Mobile: Use Drawer Navigator as the Main entry point
          <Stack.Screen name={'Main' as any} component={MainDrawerNavigator} />
        ) : (
          // Desktop/Web/Tablet: Use standard Stack and handle navigation in Sidebar
          <>
            <Stack.Screen name={AppConstants.screens.dashboard} component={FigmaDashboardView} />
            <Stack.Screen name={AppConstants.screens.messages} component={MessagingCenterView} />
            <Stack.Screen name={AppConstants.screens.appointments} component={AppointmentsScreen} />
            <Stack.Screen
              name={AppConstants.screens.prescriptions}
              component={PrescriptionScreen}
            />
            <Stack.Screen name={AppConstants.screens.labResults} component={LabResultsScreen} />
            <Stack.Screen
              name={AppConstants.screens.questionnaires}
              component={QuestionnairesScreen}
            />
            <Stack.Screen name={AppConstants.screens.documents} component={DocumentsScreen} />
            <Stack.Screen name={AppConstants.screens.insurance} component={InsuranceScreen} />
            <Stack.Screen name={AppConstants.screens.billing} component={BillingScreen} />
            <Stack.Screen name={AppConstants.screens.account} component={AccountScreen} />
          </>
        )}

        {/* Sub-screens (always available in stack) */}
        <Stack.Screen name={AppConstants.screens.viewDetails} component={ViewDetailsScreen} />
        <Stack.Screen name={AppConstants.screens.refillRequest} component={RefillScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

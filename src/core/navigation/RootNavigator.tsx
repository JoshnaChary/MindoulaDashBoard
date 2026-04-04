import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FigmaDashboardView from '../../presentation/screens/Dashboard/FigmaDashboardView';
import MessagingCenterView from '../../presentation/screens/Messages/MessagingCenterView';
import { PrescriptionScreen } from '../../presentation/screens/Prescriptions/PrescriptionScreen';
import { ViewDetailsScreen } from '../../presentation/screens/Prescriptions/ViewDetailsScreen';
import { RefillScreen } from '../../presentation/screens/Prescriptions/RefillScreen';
import { BillingScreen } from '../../presentation/screens/Billing/BillingScreen';
import { AccountScreen } from '../../presentation/screens/Account/AccountScreen';
import { AppConstants } from '../constants/AppConstants';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={AppConstants.screens.dashboard}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={AppConstants.screens.dashboard} component={FigmaDashboardView} />
        <Stack.Screen name={AppConstants.screens.messages} component={MessagingCenterView} />
        <Stack.Screen name={AppConstants.screens.prescriptions} component={PrescriptionScreen} />
        <Stack.Screen name={AppConstants.screens.viewDetails} component={ViewDetailsScreen} />
        <Stack.Screen name={AppConstants.screens.refillRequest} component={RefillScreen} />
        <Stack.Screen name={AppConstants.screens.billing} component={BillingScreen} />
        <Stack.Screen name={AppConstants.screens.account} component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

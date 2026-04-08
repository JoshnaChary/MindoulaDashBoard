import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawerContent } from './CustomDrawerContent';
import { AppConstants } from '../constants/AppConstants';

import FigmaDashboardView from '../../presentation/screens/Dashboard/FigmaDashboardView';
import MessagingCenterView from '../../presentation/screens/Messages/MessagingCenterView';
import PrescriptionScreen from '../../presentation/screens/Prescriptions/PrescriptionScreen';
import AccountScreen from '../../presentation/screens/Account/AccountScreen';
import BillingScreen from '../../presentation/screens/Billing/BillingScreen';
import {
  LabResultsScreen,
  QuestionnairesScreen,
  DocumentsScreen,
  InsuranceScreen,
  AppointmentsScreen,
} from '../../presentation/screens/PlaceholderScreens';

const Drawer = createDrawerNavigator();

export const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: 300,
        },
      }}
    >
      <Drawer.Screen name={AppConstants.screens.dashboard} component={FigmaDashboardView} />
      <Drawer.Screen name={AppConstants.screens.messages} component={MessagingCenterView} />
      <Drawer.Screen name={AppConstants.screens.appointments} component={AppointmentsScreen} />
      <Drawer.Screen name={AppConstants.screens.prescriptions} component={PrescriptionScreen} />
      <Drawer.Screen name={AppConstants.screens.labResults} component={LabResultsScreen} />
      <Drawer.Screen name={AppConstants.screens.questionnaires} component={QuestionnairesScreen} />
      <Drawer.Screen name={AppConstants.screens.documents} component={DocumentsScreen} />
      <Drawer.Screen name={AppConstants.screens.insurance} component={InsuranceScreen} />
      <Drawer.Screen name={AppConstants.screens.billing} component={BillingScreen} />
      <Drawer.Screen name={AppConstants.screens.account} component={AccountScreen} />
    </Drawer.Navigator>
  );
};

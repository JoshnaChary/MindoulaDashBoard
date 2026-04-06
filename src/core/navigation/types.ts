import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppConstants } from '../constants/AppConstants';
import { Prescription } from '../../data/models/DomainModels';

export type RootStackParamList = {
  [AppConstants.screens.dashboard]: undefined;
  [AppConstants.screens.messages]: undefined;
  [AppConstants.screens.prescriptions]: undefined;
  [AppConstants.screens.viewDetails]: { prescription: Prescription };
  [AppConstants.screens.refillRequest]: { prescription: Prescription };
  [AppConstants.screens.billing]: undefined;
  [AppConstants.screens.account]: undefined;
  [AppConstants.screens.appointments]: undefined;
  [AppConstants.screens.profile]: undefined;
  [AppConstants.screens.labResults]: undefined;
  [AppConstants.screens.questionnaires]: undefined;
  [AppConstants.screens.documents]: undefined;
  [AppConstants.screens.insurance]: undefined;
};

export type StackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

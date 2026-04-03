import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MemberPortalLayout from '../../components/MemberPortalLayout';

const figmaColor = (r: number, g: number, b: number, a: number = 1) =>
  `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
const BASE_X = 9;
const BASE_Y = 254;

export const RefillScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <MemberPortalLayout>
      <View
        style={[
          styles.absolute,
          {
            left: 358 - BASE_X,
            top: 290 - BASE_Y,
            width: 653,
            paddingHorizontal: 20,
            paddingTop: 60,
            paddingBottom: 20,
          },
        ]}
      >
        {/* Button: < Back */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 12 }}>
          <Text
            style={{
              color: figmaColor(0.224, 0.231, 0.247, 1),
              fontSize: 18,
              fontWeight: '500',
              fontFamily: 'Inter',
            }}
          >
            &lt; Back
          </Text>
        </TouchableOpacity>

        {/* Typography: Request Refill */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            color: '#111',
            marginTop: 12,
            marginBottom: 16,
            fontFamily: 'Inter',
          }}
        >
          Request Refill
        </Text>

        {/* TextArea: Add Note. */}
        <View
          style={{
            backgroundColor: '#F0F1F5',
            minHeight: 120,
            borderRadius: 4,
            paddingHorizontal: 16,
            paddingTop: 12,
          }}
        >
          <Text style={{ color: '#393B3F', fontFamily: 'Inter' }}>Add Note.</Text>
        </View>

        {/* Stack: Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24 }}>
          <TouchableOpacity
            style={[styles.smallOutlinedBtn, { marginRight: 12 }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonTextSmallBlue}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallBlueBtn}
            onPress={() =>
              Alert.alert('Success', 'Refill requested successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ])
            }
          >
            <Text style={styles.buttonTextSmall}>Request Refill</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  absolute: { position: 'absolute' },
  smallOutlinedBtn: {
    borderWidth: 1,
    borderColor: figmaColor(0.231, 0.455, 0.82, 1),
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 15,
    backgroundColor: '#FFFFFF',
  },
  buttonTextSmallBlue: {
    color: figmaColor(0.231, 0.455, 0.82, 1),
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  smallBlueBtn: {
    backgroundColor: figmaColor(0.231, 0.455, 0.82, 1),
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  buttonTextSmall: { color: 'white', fontSize: 16, fontWeight: '500', fontFamily: 'Inter' },
});

export default RefillScreen;

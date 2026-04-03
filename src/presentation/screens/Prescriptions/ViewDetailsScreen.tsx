import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MemberPortalLayout from '../../components/MemberPortalLayout';

const figmaColor = (r: number, g: number, b: number, a: number = 1) =>
  `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
const BASE_X = 9;
const BASE_Y = 254;

export const ViewDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const prescription = route.params?.prescription;

  if (!prescription) return null;

  return (
    <MemberPortalLayout>
      <View
        style={[
          styles.absolute,
          {
            left: 358 - BASE_X,
            top: 290 - BASE_Y,
            width: 653,
            paddingHorizontal: 24,
            paddingTop: 60,
            paddingBottom: 24,
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

        {/* Typography: Medicine Name (h2) */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#2D3748',
            marginTop: 24,
            marginBottom: 8,
          }}
        >
          {prescription.name}
        </Text>

        {/* Typography: Instructions */}
        <Text style={{ fontSize: 14, color: '#718096', marginBottom: 32 }}>
          Instructions:{'\n'}
          {prescription.instructions}
        </Text>

        {/* Grid 2 Columns */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -12 }}>
          <View style={styles.gridItem}>
            <Text style={styles.caption}>Dosage:</Text>
            <Text style={styles.bodyBold}>{prescription.dosage}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.caption}>Prescribed By:</Text>
            <Text style={styles.bodyBold}>{prescription.prescribedBy}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.caption}>Frequency:</Text>
            <Text style={styles.bodyBold}>{prescription.frequency}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.caption}>Prescribed On:</Text>
            <Text style={styles.bodyBold}>{prescription.prescribedOn}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.caption}>Route:</Text>
            <Text style={styles.bodyBold}>{prescription.route}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.caption}>Valid Until:</Text>
            <Text style={styles.bodyBold}>{prescription.validUntil}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.caption}>Therapy Type:</Text>
            <Text style={styles.bodyBold}>{prescription.therapyType}</Text>
          </View>
        </View>
      </View>
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  absolute: { position: 'absolute' },
  gridItem: { width: '50%', paddingHorizontal: 12, marginBottom: 24 },
  caption: { fontSize: 12, color: '#718096', marginBottom: 4 },
  bodyBold: { fontSize: 16, fontWeight: 'bold', color: '#111' },
});

export default ViewDetailsScreen;

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import BillingTabs from '../../components/Billing/BillingTabs';
import BillingCard from '../../components/Billing/BillingCard';
import InvoiceCard from '../../components/Billing/InvoiceCard';
import ChargeCard from '../../components/Billing/ChargeCard';
import PaymentMethodCard from '../../components/Billing/PaymentMethodCard';
import { Colors } from '../../../core/theme/colors';
import { getFigmaPos } from '../../../core/utils/layout';

export const BillingScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Outstanding');
  const [isDetailView, setIsDetailView] = useState(false);

  const billingItems = [
    {
      id: '1',
      title: 'Follow Up - Medication Review',
      amount: '$180',
      invoiceId: '001122',
      dueDate: 'April 3, 2026',
      status: 'Overdue',
      statusColor: Colors.error,
      indicatorColor: Colors.error,
    },
    {
      id: '2',
      title: 'Follow Up - Medication Review',
      amount: '$180',
      invoiceId: '001122',
      dueDate: 'April 3, 2026',
      status: 'Pending',
      statusColor: Colors.text.secondary,
      indicatorColor: Colors.border,
    },
  ];

  const historyItems = [
    {
      id: 'invoice-001122-1',
      title: 'Follow Up - Medication Review',
      amount: '$180.32',
      invoiceId: '001122',
      dueDate: 'April 3, 2026',
      status: 'Paid',
      statusColor: '#38A169',
    },
    {
      id: 'invoice-001122-2',
      title: 'Follow Up - Medication Review',
      amount: '$180.50',
      invoiceId: '001122',
      dueDate: 'April 3, 2026',
      status: 'Cancelled',
      statusColor: '#E53E3E',
    },
    {
      id: 'invoice-001122-3',
      title: 'Follow Up - Medication Review',
      amount: '$180.50',
      invoiceId: '001122',
      dueDate: 'April 3, 2026',
      status: 'Paid',
      statusColor: '#38A169',
    },
  ];

  const chargeItems = [
    {
      title: 'Medication management',
      amount: '$50.00',
      quantity: 1,
      serviceDate: 'April 3, 2026',
      note: 'lorem ipsum',
    },
    {
      title: 'Medication management',
      amount: '$50.00',
      quantity: 1,
      serviceDate: 'April 3, 2026',
      note: 'lorem ipsum',
    },
    {
      title: 'Medication management',
      amount: '$80.50',
      quantity: 1,
      serviceDate: 'April 3, 2026',
      note: 'lorem ipsum',
    },
  ];

  const paymentMethods = [
    {
      id: 'pm-1',
      cardType: 'Mastercard',
      cardNumber: '•••• 4242',
      expiryDate: '08/27',
      addedDate: 'Mar 2026',
      isDefault: true,
    },
    {
      id: 'pm-2',
      cardType: 'Visa',
      cardNumber: '•••• 8080',
      expiryDate: '08/27',
      addedDate: 'Mar 2026',
      isDefault: false,
    },
  ];

  const renderOutstandingView = () => (
    <>
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <AppText variant="caption" style={styles.caption}>
            Total outstanding balance:
          </AppText>
          <AppText variant="h1" weight="bold">
            $360.00
          </AppText>
        </View>

        <View style={styles.gridItem}>
          <AppText variant="caption" style={styles.caption}>
            Last payment
          </AppText>
          <AppText variant="h3" weight="semibold">
            March 4, 2026
          </AppText>
        </View>
      </View>

      <View style={styles.listContainer}>
        {billingItems.map((item) => (
          <View key={item.id} style={{ marginBottom: 16 }}>
            <BillingCard item={item} onViewDetails={() => setIsDetailView(true)} />
          </View>
        ))}
      </View>
    </>
  );

  const renderHistoryView = () => (
    <>
      <View style={styles.filterSection}>
        <AppText variant="caption" style={styles.label}>
          Filter by date
        </AppText>
        <TouchableOpacity style={styles.select}>
          <AppText variant="body2">All time</AppText>
          <AppText variant="caption">▼</AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {historyItems.map((item) => (
          <View key={item.id} style={{ marginBottom: 16 }}>
            <InvoiceCard
              title={item.title}
              amount={item.amount}
              invoiceId={item.invoiceId}
              dueDate={item.dueDate}
              status={item.status}
              statusColor={item.statusColor}
              onViewDetails={() => setIsDetailView(true)}
            />
          </View>
        ))}
      </View>
    </>
  );

  const renderPaymentMethods = () => (
    <View style={styles.paymentMethodsContainer}>
      <AppText variant="body2" style={styles.body2}>
        Card details are stored securely by our payment processor. We never store your full card
        number.
      </AppText>

      <View style={styles.flexEndRow}>
        <TouchableOpacity style={styles.btnAddCard} onPress={() => Alert.alert('Add New Card')}>
          <AppText weight="semibold" style={styles.btnAddCardText}>
            Add New Card
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.paymentList}>
        {paymentMethods.map((method) => (
          <View key={method.id} style={{ marginBottom: 16 }}>
            <PaymentMethodCard
              cardType={method.cardType}
              cardNumber={method.cardNumber}
              expiryDate={method.expiryDate}
              addedDate={method.addedDate}
              isDefault={method.isDefault}
              onRemove={() =>
                Alert.alert('Remove Card', `Removing card ending in ${method.cardNumber.slice(-4)}`)
              }
              onSetDefault={() =>
                Alert.alert(
                  'Set Default',
                  `Setting card ending in ${method.cardNumber.slice(-4)} as default`,
                )
              }
            />
          </View>
        ))}
      </View>
    </View>
  );

  const renderInvoiceDetails = () => (
    <View style={styles.detailsContainer}>
      <View style={styles.headerRow}>
        <View style={styles.flex1}>
          <AppText variant="h2" weight="bold">
            Follow Up - Medication Review
          </AppText>
          <AppText variant="caption">Invoice ID: 001122</AppText>
          <AppText variant="caption">Due date: April 3, 2026</AppText>
        </View>
        <View style={styles.alignEnd}>
          <AppText variant="h2" weight="bold">
            $180.50
          </AppText>
          <TouchableOpacity style={styles.btnPayNowDetail}>
            <AppText weight="semibold" style={styles.btnPayNowText}>
              Pay Now
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="h3" weight="bold" style={styles.sectionTitle}>
          Provider:
        </AppText>
        <AppText weight="bold" style={styles.providerName}>
          Dr. J. Kim, Northern Clinic
        </AppText>
        <AppText>Psychiatry</AppText>
      </View>

      <View style={styles.section}>
        <AppText variant="h3" weight="bold" style={styles.sectionTitle}>
          Charges:
        </AppText>
        <View style={styles.listContainer}>
          {chargeItems.map((charge, index) => (
            <ChargeCard
              key={index}
              title={charge.title}
              amount={charge.amount}
              quantity={charge.quantity}
              serviceDate={charge.serviceDate}
              note={charge.note}
            />
          ))}
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    if (isDetailView) return renderInvoiceDetails();

    switch (activeTab) {
      case 'History':
        return renderHistoryView();
      case 'Payment':
        return renderPaymentMethods();
      default:
        return renderOutstandingView();
    }
  };

  return (
    <MemberPortalLayout>
      {isDetailView && (
        <TouchableOpacity
          style={[styles.absolute, getFigmaPos(358, 350)]}
          onPress={() => setIsDetailView(false)}
        >
          <AppText weight="medium" style={{ fontSize: 18 }}>
            &lt; Back
          </AppText>
        </TouchableOpacity>
      )}

      <View style={[styles.absoluteWrapper, getFigmaPos(358, 395), { width: 1040 }]}>
        <View style={styles.container}>
          {!isDetailView && (
            <>
              <AppText variant="h2" weight="bold" style={{ marginBottom: 24 }}>
                Billing
              </AppText>

              <BillingTabs
                options={['Outstanding', 'History', 'Payment']}
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                }}
                activeColor={Colors.primary}
              />
            </>
          )}

          {renderContent()}
        </View>
      </View>
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  absolute: { position: 'absolute' },
  absoluteWrapper: { position: 'absolute' },
  container: { padding: 24, flexDirection: 'column' },
  grid: { flexDirection: 'row', marginBottom: 40, gap: 40 },
  gridItem: { flexDirection: 'column' },
  caption: { color: Colors.text.secondary, marginBottom: 4 },
  listContainer: { flexDirection: 'column' },
  filterSection: { marginBottom: 24 },
  label: { color: Colors.text.secondary, marginBottom: 4 },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  detailsContainer: { flexDirection: 'column', flex: 1 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  flex1: { flex: 1 },
  alignEnd: { alignItems: 'flex-end' },
  btnPayNowDetail: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  btnPayNowText: { color: Colors.white, fontSize: 16 },
  section: { marginBottom: 32 },
  sectionTitle: { color: Colors.text.primary, marginBottom: 12 },
  providerName: { color: Colors.text.primary, marginBottom: 4 },
  paymentMethodsContainer: { flexDirection: 'column' },
  body2: { color: '#718096', marginBottom: 24 },
  flexEndRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 16 },
  btnAddCard: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  btnAddCardText: { color: Colors.white, fontSize: 16 },
  paymentList: { flexDirection: 'column' },
});

export default BillingScreen;

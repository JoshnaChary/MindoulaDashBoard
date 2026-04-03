import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import BillingTabs from '../../components/Billing/BillingTabs';
import BillingCard from '../../components/Billing/BillingCard';
import InvoiceCard from '../../components/Billing/InvoiceCard';
import ChargeCard from '../../components/Billing/ChargeCard';
import PaymentMethodCard from '../../components/Billing/PaymentMethodCard';
import { Colors } from '../../../core/theme/colors';

const BASE_X = 9;
const BASE_Y = 254;

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
      {/* 2-Column Grid Summary */}
      <View style={styles.grid}>
        {/* Left Column */}
        <View style={styles.gridItem}>
          <Text style={styles.caption}>Total outstanding balance:</Text>
          <Text style={styles.h1}>$360.00</Text>
        </View>

        {/* Right Column */}
        <View style={styles.gridItem}>
          <Text style={styles.caption}>Last payment</Text>
          <Text style={styles.h3}>March 4, 2026</Text>
        </View>
      </View>

      {/* Billing List */}
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
      {/* Filter Section */}
      <View style={styles.filterSection}>
        <Text style={styles.label}>Filter by date</Text>
        <TouchableOpacity style={styles.select}>
          <Text style={styles.selectText}>All time</Text>
          <Text style={styles.selectArrow}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* History List */}
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
      <Text style={styles.body2}>
        Card details are stored securely by our payment processor. We never store your full card
        number.
      </Text>

      <View style={styles.flexEndRow}>
        <TouchableOpacity style={styles.btnAddCard} onPress={() => Alert.alert('Add New Card')}>
          <Text style={styles.btnAddCardText}>Add New Card</Text>
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
      {/* Header Info */}
      <View style={styles.headerRow}>
        <View style={styles.flex1}>
          <Text style={styles.h2Large}>Follow Up - Medication Review</Text>
          <Text style={styles.captionRegular}>Invoice ID: 001122</Text>
          <Text style={styles.captionRegular}>Due date: April 3, 2026</Text>
        </View>
        <View style={styles.alignEnd}>
          <Text style={styles.h2Bold}>$180.50</Text>
          <TouchableOpacity style={styles.btnPayNowDetail}>
            <Text style={styles.btnPayNowText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Provider Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Provider:</Text>
        <Text style={styles.providerName}>Dr. J. Kim, Northern Clinic</Text>
        <Text style={styles.bodyText}>Psychiatry</Text>
      </View>

      {/* Charges Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Charges:</Text>
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
          style={[styles.absolute, { left: 358 - BASE_X, top: 350 - BASE_Y }]}
          onPress={() => setIsDetailView(false)}
        >
          <Text
            style={{
              color: Colors.text.dark,
              fontSize: 18,
              fontWeight: '500',
              fontFamily: 'Inter',
            }}
          >
            &lt; Back
          </Text>
        </TouchableOpacity>
      )}

      <View
        style={[styles.absoluteWrapper, { left: 358 - BASE_X, top: 395 - BASE_Y, width: 1040 }]}
      >
        <View style={styles.container}>
          {!isDetailView && (
            <>
              {/* Title */}
              <Text style={styles.h2}>Billing</Text>

              {/* Tabs */}
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
  absolute: {
    position: 'absolute',
  },
  absoluteWrapper: {
    position: 'absolute',
  },
  container: {
    padding: 24,
    flexDirection: 'column',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 24,
    fontFamily: 'Inter',
  },
  grid: {
    flexDirection: 'row',
    marginBottom: 40,
    gap: 40,
  },
  gridItem: {
    flexDirection: 'column',
  },
  caption: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'Inter',
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.primary,
    fontFamily: 'Inter',
  },
  listContainer: {
    flexDirection: 'column',
  },
  filterSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontFamily: 'Inter',
    marginBottom: 4,
  },
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
  selectText: {
    fontSize: 14,
    color: Colors.text.primary,
    fontFamily: 'Inter',
  },
  selectArrow: {
    fontSize: 10,
    color: Colors.text.secondary,
  },
  // NEW STYLES FOR INVOICE DETAILS
  detailsContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  flex1: {
    flex: 1,
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  h2Large: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    fontFamily: 'Inter',
    marginBottom: 8,
  },
  h2Bold: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    fontFamily: 'Inter',
    marginBottom: 12,
  },
  captionRegular: {
    fontSize: 14,
    color: '#718096',
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  btnPayNowDetail: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  btnPayNowText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'Inter',
    marginBottom: 12,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 16,
    color: Colors.text.primary,
    fontFamily: 'Inter',
  },
  // NEW STYLES FOR PAYMENT METHODS
  paymentMethodsContainer: {
    flexDirection: 'column',
  },
  body2: {
    fontSize: 14,
    color: '#718096',
    fontFamily: 'Inter',
    marginBottom: 24,
  },
  flexEndRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  btnAddCard: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  btnAddCardText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  paymentList: {
    flexDirection: 'column',
  },
});

export default BillingScreen;

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { AppButton } from '../../../components/atoms/AppButton';
import { ResponsiveContainer } from '../../../components/atoms/ResponsiveContainer';
import MemberPortalLayout from '../../components/MemberPortalLayout';
import BillingTabs from '../../components/Billing/BillingTabs';
import BillingCard from '../../components/Billing/BillingCard';
import InvoiceCard from '../../components/Billing/InvoiceCard';
import ChargeCard from '../../components/Billing/ChargeCard';
import PaymentMethodCard from '../../components/Billing/PaymentMethodCard';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import { useResponsive } from '../../../core/utils/useResponsive';

export const BillingScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Outstanding');
  const [isDetailView, setIsDetailView] = useState(false);
  const { isPhone } = useResponsive();

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
      id: 'history-1',
      title: 'Follow Up - Medication Review',
      amount: '$180.32',
      invoiceId: '001122',
      dueDate: 'April 3, 2026',
      status: 'Paid',
      statusColor: '#38A169',
    },
    {
      id: 'history-2',
      title: 'Follow Up - Medication Review',
      amount: '$180.50',
      invoiceId: '001122',
      dueDate: 'April 3, 2026',
      status: 'Cancelled',
      statusColor: '#E53E3E',
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
  ];

  const renderOutstandingView = () => (
    <View style={styles.tabContent}>
      <View style={[styles.statsRow, isPhone && styles.column]}>
        <View style={styles.statBox}>
          <AppText variant="sm" color={Colors.text.secondary}>
            Total outstanding balance:
          </AppText>
          <AppText variant="h1" weight="bold">
            $360.00
          </AppText>
        </View>
        <View style={styles.statBox}>
          <AppText variant="sm" color={Colors.text.secondary}>
            Last payment:
          </AppText>
          <AppText variant="h3" weight="medium">
            March 4, 2026
          </AppText>
        </View>
      </View>

      <View style={styles.listContainer}>
        {billingItems.map((item) => (
          <BillingCard key={item.id} item={item} onViewDetails={() => setIsDetailView(true)} />
        ))}
      </View>
    </View>
  );

  const renderHistoryView = () => (
    <View style={styles.tabContent}>
      <View style={styles.filterSection}>
        <AppText variant="sm" weight="medium" style={{ marginBottom: Spacing.xs }}>
          Filter by date
        </AppText>
        <TouchableOpacity style={styles.select}>
          <AppText variant="body2">All time</AppText>
          <AppText variant="xs">▼</AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {historyItems.map((item) => (
          <InvoiceCard
            key={item.id}
            title={item.title}
            amount={item.amount}
            invoiceId={item.invoiceId}
            dueDate={item.dueDate}
            status={item.status}
            statusColor={item.statusColor}
            onViewDetails={() => setIsDetailView(true)}
          />
        ))}
      </View>
    </View>
  );

  const renderPaymentMethods = () => (
    <View style={styles.tabContent}>
      <AppText variant="sm" color={Colors.text.secondary} style={{ marginBottom: Spacing.lg }}>
        Card details are stored securely by our payment processor. We never store your full card
        number.
      </AppText>

      <View style={styles.actionRow}>
        <AppButton
          label="Add New Card"
          variant="primary"
          onPress={() => Alert.alert('Add New Card')}
          size="small"
        />
      </View>

      <View style={styles.listContainer}>
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            cardType={method.cardType}
            cardNumber={method.cardNumber}
            expiryDate={method.expiryDate}
            addedDate={method.addedDate}
            isDefault={method.isDefault}
            onRemove={() => Alert.alert('Remove Card')}
            onSetDefault={() => Alert.alert('Set Default')}
          />
        ))}
      </View>
    </View>
  );

  const renderInvoiceDetails = () => (
    <View style={styles.detailView}>
      <TouchableOpacity onPress={() => setIsDetailView(false)} style={styles.backButton}>
        <AppText variant="md" weight="medium" color={Colors.primary}>
          &lt; Back to Billing
        </AppText>
      </TouchableOpacity>

      <View style={[styles.detailHeader, isPhone && styles.column]}>
        <View style={{ flex: 1 }}>
          <AppText variant="h2" weight="bold">
            Follow Up - Medication Review
          </AppText>
          <AppText variant="sm" color={Colors.text.secondary}>
            Invoice ID: 001122 • Due: April 3, 2026
          </AppText>
        </View>
        <View
          style={[styles.amountBox, isPhone && { marginTop: Spacing.md, alignItems: 'flex-start' }]}
        >
          <AppText variant="h2" weight="bold">
            $180.50
          </AppText>
          <AppButton label="Pay Now" onPress={() => {}} size="small" />
        </View>
      </View>

      <View style={styles.detailSection}>
        <AppText variant="md" weight="bold" style={{ marginBottom: Spacing.sm }}>
          Provider:
        </AppText>
        <AppText weight="medium">Dr. J. Kim, Northern Clinic</AppText>
        <AppText variant="sm" color={Colors.text.secondary}>
          Psychiatry
        </AppText>
      </View>

      <View style={styles.detailSection}>
        <AppText variant="md" weight="bold" style={{ marginBottom: Spacing.md }}>
          Charges:
        </AppText>
        {chargeItems.map((charge, index) => (
          <ChargeCard key={index} {...charge} />
        ))}
      </View>
    </View>
  );

  return (
    <MemberPortalLayout title="Billing">
      <ResponsiveContainer>
        {!isDetailView && (
          <>
            <AppText variant="h2" weight="bold" style={{ marginBottom: Spacing.lg }}>
              Billing
            </AppText>
            <BillingTabs
              options={['Outstanding', 'History', 'Payment']}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </>
        )}

        {isDetailView ? (
          renderInvoiceDetails()
        ) : (
          <View>
            {activeTab === 'Outstanding' && renderOutstandingView()}
            {activeTab === 'History' && renderHistoryView()}
            {activeTab === 'Payment' && renderPaymentMethods()}
          </View>
        )}
      </ResponsiveContainer>
    </MemberPortalLayout>
  );
};

const styles = StyleSheet.create({
  tabContent: {
    paddingVertical: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.xxl,
    marginBottom: Spacing.xxl,
  },
  column: {
    flexDirection: 'column',
    gap: Spacing.lg,
  },
  statBox: {
    gap: Spacing.xs,
  },
  listContainer: {
    gap: Spacing.md,
  },
  filterSection: {
    marginBottom: Spacing.xl,
    maxWidth: 300,
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.radius.sm,
    padding: Spacing.md,
    backgroundColor: Colors.white,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: Spacing.lg,
  },
  detailView: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: Spacing.radius.md,
  },
  backButton: {
    marginBottom: Spacing.xl,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
    paddingBottom: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  amountBox: {
    alignItems: 'flex-end',
    gap: Spacing.md,
  },
  detailSection: {
    marginBottom: Spacing.xl,
  },
});

export default BillingScreen;

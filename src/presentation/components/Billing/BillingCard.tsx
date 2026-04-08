import React from 'react';
import DashboardCard from '../Common/DashboardCard';

interface BillingCardProps {
  item: {
    title: string;
    amount: string;
    invoiceId: string;
    dueDate: string;
    status: string;
    statusColor: string;
    indicatorColor: string;
  };
  onViewDetails: () => void;
}

const BillingCard: React.FC<BillingCardProps> = ({ item, onViewDetails }) => {
  return (
    <DashboardCard
      indicatorColor={item.indicatorColor}
      title={item.title}
      amount={item.amount}
      subtext={`Invoice ID: ${item.invoiceId} • Due: ${item.dueDate}`}
      status={item.status}
      statusColor={item.statusColor}
      actionLabel="View Details"
      onAction={onViewDetails}
    />
  );
};

export default BillingCard;

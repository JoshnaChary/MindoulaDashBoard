import React from 'react';
import DashboardCard from '../Common/DashboardCard';

interface InvoiceCardProps {
  title: string;
  amount: string;
  invoiceId: string;
  dueDate: string;
  status: string;
  statusColor: string;
  onViewDetails: () => void;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({
  title,
  amount,
  invoiceId,
  dueDate,
  status,
  statusColor,
  onViewDetails,
}) => {
  return (
    <DashboardCard
      title={title}
      amount={amount}
      subtext={`Invoice ID: ${invoiceId} • Paid: ${dueDate}`}
      status={status}
      statusColor={statusColor}
      actionLabel="View Details"
      onAction={onViewDetails}
    />
  );
};

export default InvoiceCard;

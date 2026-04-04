export interface Prescription {
  id: number;
  name: string;
  refills: number;
  dosage: string;
  frequency: string;
  instructions: string;
  prescribedBy: string;
  prescribedOn: string;
  route: string;
  validUntil: string;
  therapyType: string;
}

export interface MessageThread {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  clickable: boolean;
  unread: boolean;
}

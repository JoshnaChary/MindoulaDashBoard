export interface DashboardHeader {
  title: string;
  subtitle: string;
}

export type CardType = 'appointment' | 'action';

export interface DashboardCard {
  type: CardType;
  title?: string;
  date?: string;
  doctor?: string;
  time?: string;
  cta?: string;
}

export interface DashboardData {
  screen: string;
  header: DashboardHeader;
  menu: string[];
  cards: DashboardCard[];
}

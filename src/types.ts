export interface MonthlyMetric {
  month: string;
  shortMonth: string;
  impressoes: number;
  alcance: number;
  interacoes: number;
  engajamentoRate: number; // in %
  feedAvgViews: number;
  storiesAvgViews: number;
  reelsAvgViews: number;
  novosSeguidores: number;
}

export interface ContentPillar {
  id: string;
  title: string;
  description: string;
  sharePercentage: number;
  avgEngagement: number;
  avgViews: number;
  topExample: string;
  iconName: string;
  badgeColor: string;
}

export interface TopPost {
  id: string;
  title: string;
  date: string;
  type: 'Reels' | 'Carrossel' | 'Foto' | 'Story';
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagement: number;
  reach: number;
  description: string;
}

export interface AudienceDemographics {
  gender: { name: string; percentage: number }[];
  ageGroups: { range: string; percentage: number }[];
  topLocations: { city: string; state: string; percentage: number }[];
  peakHours: { hour: string; activePercentage: number }[];
}

export interface ProfileSummary {
  username: string;
  name: string;
  instagramUrl: string;
  avatarUrl: string;
  bio: string;
  category: string;
  location: string;
  followers: number;
  following: number;
  postsCount: number;
  totalImpressionsPeriod: number;
  totalReachPeriod: number;
  totalInteractionsPeriod: number;
  averageEngagementRate: number;
  averageFeedViews: number;
  averageStoriesViews: number;
  averageReelsViews: number;
  growthRate: number;
}

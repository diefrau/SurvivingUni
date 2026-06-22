export type SpotCategory = 'food' | 'study' | 'rest' | 'print' | 'convenience' | 'admin';
export type PlaceCategory = SpotCategory;
export type CongestionLevel = 'low' | 'medium' | 'high' | 'unknown';
export type SpotStatus = 'verified' | 'needs_check' | 'closed' | 'unknown';
export type ReportStatus = 'draft' | 'received' | 'reviewing' | 'resolved' | 'rejected';

export interface Tag {
  id: string;
  label: string;
  category?: SpotCategory;
}

export interface Building {
  id: string;
  name: string;
  shortName: string;
  description: string;
  floors: string[];
  coordinate: { latitude: number; longitude: number };
}

export interface Spot {
  id: string;
  buildingId: Building['id'];
  name: string;
  category: SpotCategory;
  floor: string;
  locationDescription: string;
  summary: string;
  description: string;
  tips: string[];
  tagIds: Tag['id'][];
  tags: string[];
  hours: string;
  congestion: CongestionLevel;
  status: SpotStatus;
  lastVerifiedAt: string;
  verificationCount: number;
}

export type SurvivalPlace = Spot;

export interface Favorite {
  id: string;
  spotId: Spot['id'];
  createdAt: string;
}

export interface Report {
  id: string;
  spotId?: Spot['id'];
  buildingId: Building['id'];
  category: SpotCategory;
  title: string;
  description: string;
  status: ReportStatus;
  createdAt: string;
}

export interface ReportDraft {
  spotId?: Spot['id'];
  buildingId: Building['id'];
  category: SpotCategory;
  title: string;
  description: string;
}

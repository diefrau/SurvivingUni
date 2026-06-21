export type PlaceCategory = 'food' | 'study' | 'rest' | 'print' | 'convenience' | 'admin';

export type CongestionLevel = 'low' | 'medium' | 'high' | 'unknown';

export interface Building {
  id: string;
  name: string;
  shortName: string;
  description: string;
  floors: string[];
  coordinate: { latitude: number; longitude: number };
}

export interface SurvivalPlace {
  id: string;
  buildingId: string;
  name: string;
  category: PlaceCategory;
  floor: string;
  description: string;
  tags: string[];
  hours: string;
  congestion: CongestionLevel;
  isSaved?: boolean;
}

export interface ReportDraft {
  placeName: string;
  buildingId: string;
  category: PlaceCategory;
  description: string;
}

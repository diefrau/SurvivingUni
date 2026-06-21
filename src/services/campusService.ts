import { mockBuildings, mockFavorites, mockPlaces, mockReports, mockTags } from '../data/mockData';
import { Building, Favorite, Report, ReportDraft, Spot, Tag } from '../types/domain';

const wait = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CampusRepository {
  listBuildings(): Promise<Building[]>;
  listSpots(): Promise<Spot[]>;
  listTags(): Promise<Tag[]>;
  listSpotsByBuilding(buildingId: Building['id']): Promise<Spot[]>;
  getSpotById(spotId: Spot['id']): Promise<Spot | undefined>;
  listFavorites(): Promise<Favorite[]>;
  listFavoriteSpots(): Promise<Spot[]>;
  listReports(): Promise<Report[]>;
  createReport(report: ReportDraft): Promise<Report>;
}

export const campusService: CampusRepository = {
  async listBuildings(): Promise<Building[]> {
    await wait();
    return mockBuildings;
  },
  async listSpots(): Promise<Spot[]> {
    await wait();
    return mockPlaces;
  },
  async listTags(): Promise<Tag[]> {
    await wait();
    return mockTags;
  },
  async listSpotsByBuilding(buildingId: Building['id']): Promise<Spot[]> {
    await wait();
    return mockPlaces.filter((spot) => spot.buildingId === buildingId);
  },
  async getSpotById(spotId: Spot['id']): Promise<Spot | undefined> {
    await wait();
    return mockPlaces.find((spot) => spot.id === spotId);
  },
  async listFavorites(): Promise<Favorite[]> {
    await wait();
    return mockFavorites;
  },
  async listFavoriteSpots(): Promise<Spot[]> {
    await wait();
    const favoriteSpotIds = new Set(mockFavorites.map((favorite) => favorite.spotId));
    return mockPlaces.filter((spot) => favoriteSpotIds.has(spot.id));
  },
  async listReports(): Promise<Report[]> {
    await wait();
    return mockReports;
  },
  async createReport(report: ReportDraft): Promise<Report> {
    await wait(200);
    return {
      id: `report-${Date.now()}`,
      spotId: report.spotId,
      buildingId: report.buildingId,
      category: report.category,
      title: report.title,
      description: report.description,
      status: 'received',
      createdAt: new Date().toISOString(),
    };
  },
};

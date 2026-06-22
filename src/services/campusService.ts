import { mockBuildings, mockFavorites, mockPlaces, mockReports, mockTags } from '../data/mockData';
import { Building, Favorite, Report, ReportDraft, Spot, Tag } from '../types/domain';

const wait = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CampusRepository {
  listBuildings(): Promise<Building[]>;
  getBuildingById(buildingId: Building['id']): Promise<Building | undefined>;
  listSpots(): Promise<Spot[]>;
  listTags(): Promise<Tag[]>;
  listSpotsByTag(tagId: Tag['id']): Promise<Spot[]>;
  listSpotsByBuilding(buildingId: Building['id']): Promise<Spot[]>;
  getSpotById(spotId: Spot['id']): Promise<Spot | undefined>;
  listFavorites(): Promise<Favorite[]>;
  listFavoriteSpots(favoriteSpotIds?: Spot['id'][]): Promise<Spot[]>;
  listReports(): Promise<Report[]>;
  createReport(report: ReportDraft): Promise<Report>;
}

export const campusService: CampusRepository = {
  async listBuildings() { await wait(); return mockBuildings; },
  async getBuildingById(buildingId) { await wait(); return mockBuildings.find((building) => building.id === buildingId); },
  async listSpots() { await wait(); return mockPlaces; },
  async listTags() { await wait(); return mockTags; },
  async listSpotsByTag(tagId) { await wait(); return mockPlaces.filter((spot) => spot.tagIds.includes(tagId)); },
  async listSpotsByBuilding(buildingId) { await wait(); return mockPlaces.filter((spot) => spot.buildingId === buildingId); },
  async getSpotById(spotId) { await wait(); return mockPlaces.find((spot) => spot.id === spotId); },
  async listFavorites() { await wait(); return mockFavorites; },
  async listFavoriteSpots(favoriteSpotIds) {
    await wait();
    const ids = new Set(favoriteSpotIds ?? mockFavorites.map((favorite) => favorite.spotId));
    return mockPlaces.filter((spot) => ids.has(spot.id));
  },
  async listReports() { await wait(); return mockReports; },
  async createReport(report) {
    await wait(200);
    if (report.title.toLowerCase().includes('fail')) throw new Error('Mock report failure');
    return { id: `report-${Date.now()}`, ...report, status: 'received', createdAt: new Date().toISOString() };
  },
};

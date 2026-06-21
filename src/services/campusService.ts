import { mockBuildings, mockPlaces } from '../data/mockData';
import { Building, ReportDraft, SurvivalPlace } from '../types/domain';

const wait = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export const campusService = {
  async getBuildings(): Promise<Building[]> {
    await wait();
    return mockBuildings;
  },
  async getPlaces(): Promise<SurvivalPlace[]> {
    await wait();
    return mockPlaces;
  },
  async getPlacesByBuilding(buildingId: string): Promise<SurvivalPlace[]> {
    await wait();
    return mockPlaces.filter((place) => place.buildingId === buildingId);
  },
  async getSavedPlaces(): Promise<SurvivalPlace[]> {
    await wait();
    return mockPlaces.filter((place) => place.isSaved);
  },
  async submitReport(report: ReportDraft): Promise<{ id: string; status: 'received' }> {
    await wait(200);
    console.log('Mock report submitted', report);
    return { id: `report-${Date.now()}`, status: 'received' };
  },
};

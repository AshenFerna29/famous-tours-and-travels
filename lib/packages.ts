import allPackages from "@/data/packages.json";
import type { TourPackage } from "@/types/package";

export const packages = allPackages as TourPackage[];

export function getPackageById(id: string) {
  return packages.find(p => p.id === id);
}
export function getAllPackageIds() {
  return packages.map(p => p.id);
}

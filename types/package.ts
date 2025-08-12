export type ItineraryItem = { day: number; title: string; details: string };

export type TourPackage = {
  id: string;
  title: string;
  days: number;
  type: string;
  description: string;
  image: string;

  overview?: string;
  badges?: {
    type?: string;
    duration?: string;
    vehicle?: string;
    hotelCategory?: string;
  };
  gallery?: string[];
  highlights?: string[];
  itinerary?: ItineraryItem[];
};

export interface FoodRequest {
    id: number;
    status: string;
    userId: number;
    items: string[];
    quantities: number[];
    requestDate: Date;
    approvedBy: number | null;
  };
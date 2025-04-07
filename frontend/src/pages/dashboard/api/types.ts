export interface DashboardSummaryResponse {
    recentRequests: {
        requestedBy: string;
        requestType: string;
        status: string;
        notes: string;
        dateRequested: string;
        createdAt: string;
        updatedAt: string;
        id: string;
    }[];
    totalInventoryItems: number;
    totalPendingRequests: number;
    totalCompleteRequests: number;
    inventorySummary: {
        totalQuantity: number;
        itemName: string;
    }[];
}
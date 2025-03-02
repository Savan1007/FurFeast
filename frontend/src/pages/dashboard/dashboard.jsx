import React from "react";

const Dashboard = () => {
  const mockData = {
    totalItems: 2451,
    lowStock: 18,
    pendingOrders: 64,
    activeUsers: 832,
    recentActivity: [
      { id: 1, title: "New inventory added", details: "SKU-234 added by John Doe", time: "2 hours ago" },
      { id: 2, title: "Stock transfer", details: "Warehouse A to Warehouse B", time: "5 hours ago" },
      { id: 3, title: "Order fulfilled", details: "Order #156879 completed", time: "8 hours ago" },
    ],
    pendingRequests: [
      { id: 1, type: "Stock Request", from: "Sarah Johnson" },
      { id: 2, type: "Purchase Approval", from: "Mike Chen" },
      { id: 3, type: "Access Request", from: "Lisa Park" },
    ],
  };

  return (
    <div className="p-6 px-32 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Items", value: mockData.totalItems },
          { label: "Low Stock", value: mockData.lowStock },
          { label: "Pending Orders", value: mockData.pendingOrders },
          { label: "Active Users", value: mockData.activeUsers },
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500 text-sm">{item.label}</p>
            <p className="text-xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          {mockData.recentActivity.map((activity) => (
            <div key={activity.id} className="mb-2 border-b pb-2">
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.details} • {activity.time}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Pending Requests</h2>
          {mockData.pendingRequests.map((request) => (
            <div key={request.id} className="mb-2 flex justify-between items-center border-b pb-2">
              <p className="font-medium">{request.type}</p>
              <p className="text-sm text-gray-500">From: {request.from}</p>
              <button className="bg-blue-500 text-white px-3 py-1 rounded">Review</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

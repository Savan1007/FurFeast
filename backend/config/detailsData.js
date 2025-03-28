const mongoose = require('mongoose');

module.exports = (requestIds, inventoryItems) => {
  const findInventoryId = (itemName) => {
    const item = inventoryItems.find(i => i.itemName === itemName);
    if (!item) {
      throw new Error(`❌ Inventory item not found: "${itemName}"`);
    }
    return item._id;
  };

  return [
    // Request 1: One detail
    {
      requestId: requestIds[0],
      inventoryId: findInventoryId('Dog Dry Food'),
      quantity: 40
    },
    // Request 2: One detail (donation)
    {
      requestId: requestIds[1],
      inventoryId: findInventoryId('Toy'),
      quantity: 60
    },
    // Request 3: Multiple items
    {
      requestId: requestIds[2],
      inventoryId: findInventoryId('Collar'),
      quantity: 30
    },
    {
      requestId: requestIds[2],
      inventoryId: findInventoryId('Collar'),
      quantity: 25
    },
    // Request 4: One item
    {
      requestId: requestIds[3],
      inventoryId: findInventoryId('Dog Wet Food'),
      quantity: 80
    },
    // Request 5: Invalid or duplicate request
    {
      requestId: requestIds[4],
      inventoryId: findInventoryId('Cat Wet Food'),
      quantity: 20
    },
    // Request 6: Multiple items
    {
      requestId: requestIds[5],
      inventoryId: findInventoryId('Cat Dry Food'),
      quantity: 50
    },
    {
      requestId: requestIds[5],
      inventoryId: findInventoryId('Collar'),
      quantity: 10
    },
    // Request 7: One donation
    {
      requestId: requestIds[6],
      inventoryId: findInventoryId('Cat Wet Food'),
      quantity: 70
    },
    // Request 8: Multiple types for an event
    {
      requestId: requestIds[7],
      inventoryId: findInventoryId('Dog Dry Food'),
      quantity: 35
    },
    {
      requestId: requestIds[7],
      inventoryId: findInventoryId('Toy'),
      quantity: 50
    },
    // Request 9: Retail toy donation
    {
      requestId: requestIds[8],
      inventoryId: findInventoryId('Toy'),
      quantity: 90
    },
    // Request 10: Emergency supplies
    {
      requestId: requestIds[9],
      inventoryId: findInventoryId('Dog Wet Food'),
      quantity: 60
    },
    {
      requestId: requestIds[9],
      inventoryId: findInventoryId('Cat Dry Food'),
      quantity: 40
    },
    {
      requestId: requestIds[9],
      inventoryId: findInventoryId('Collar'),
      quantity: 15
    }
  ];
};

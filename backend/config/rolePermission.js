module.exports = {
  roles: [
    {
    name: 'superAdmin',
    description: 'Has all system privileges',
    permissions: ['manageUsers', 'manageInventory', 'viewLogs', 'approveRequests', 'createRequest', 'viewInventory','viewUsers']
    },
    {
    name: 'admin',
    description: 'Manages requests and user access',
    permissions: ['approveRequests', 'viewInventory', 'viewUsers']
    },
    {
    name: 'supplier',
    description: 'Supplier user (can submit requests)',
    permissions: ['createRequest']
    },
    {
    name: 'community',
    description: 'community user (can submit requests)',
    permissions: ['createRequest']
    }
  ],
  permissions: [
    { name: 'manageUsers', description: 'Manage users and roles' },
    { name: 'manageInventory', description: 'Create/update inventory records' },
    { name: 'viewLogs', description: 'Access to logs and audits' },
    { name: 'approveRequests', description: 'Approve or reject submitted requests' },
    { name: 'createRequest', description: 'Submit a request (donation/distribution)' },
    { name: 'viewInventory', description: 'View available inventory' },
    { name: 'viewUsers', description: 'View user list and details' }
  ]
  };

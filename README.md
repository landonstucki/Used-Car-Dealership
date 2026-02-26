# Used-Car-Dealership
Public Pages:
• Home page with featured vehicles
• Browse vehicles by category (Trucks, Vans, Cars, SUVs)
• Individual vehicle detail pages with images, specs, and price
• Contact form (saves to database)
User Features (must be logged in):
• Leave reviews on vehicles
• Edit/delete own reviews
• Submit service requests for their vehicle (oil change, inspection, etc.)
• View history of service requests and their status
Employee Dashboard:
• Edit vehicle details (price, description, availability)
• Moderate/delete inappropriate reviews
• View and manage service requests
• Update service request status (Submitted, In Progress, Completed)
• Add notes to service requests
• View contact form submissions
Owner Dashboard (Full Admin):
• Everything employees can do, plus:
• Add, edit, and delete vehicle categories
• Add, edit, and delete vehicles from inventory
• Manage employee accounts (optional, can be hardcoded)
• View all system activity and user data
Database Requirements:
• Users table (with role field)
• Vehicles table
• Categories table (linked to vehicles)
• Reviews table (linked to users and vehicles)
• Service requests table (linked to users, with status tracking)
• Contact messages table
• Vehicle images table (one-to-many with vehicles)

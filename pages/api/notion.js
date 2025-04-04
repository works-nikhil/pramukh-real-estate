import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check if environment variables are set
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_PROPERTY_LISTINGS_DATABASE_ID || !process.env.NOTION_UPCOMING_PROJECT_DATABASE_ID) {
    console.error('Missing environment variables:', {
      hasApiKey: !!process.env.NOTION_API_KEY,
      hasPropertyListingsDb: !!process.env.NOTION_PROPERTY_LISTINGS_DATABASE_ID,
      hasUpcomingProjectDb: !!process.env.NOTION_UPCOMING_PROJECT_DATABASE_ID
    });
    return res.status(500).json({ error: 'Missing Notion configuration' });
  }

  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    // Fetch data from both databases
    const [propertyListings, upcomingProjects, servicesListings] = await Promise.all([
      notion.databases.query({
        database_id: process.env.NOTION_PROPERTY_LISTINGS_DATABASE_ID,
      }),
      notion.databases.query({
        database_id: process.env.NOTION_UPCOMING_PROJECT_DATABASE_ID,
      }),
      notion.databases.query({
        database_id: process.env.NOTION_SERVICES_DATABASE_ID,
      })
    ]);

    console.log('Successfully fetched Notion data from both databases');
    
    res.status(200).json({
      propertyListings: propertyListings.results,
      upcomingProjects: upcomingProjects.results,
      servicesListings: servicesListings.results,
    });
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      code: error.code,
      status: error.status,
      body: error.body
    });
    res.status(500).json({ 
      error: 'Failed to fetch Notion data',
      details: error.message 
    });
  }
} 
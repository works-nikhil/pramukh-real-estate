import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Function to fetch database data
export async function getNotionData() {
  try {
    const response = await fetch('/api/notion');
    if (!response.ok) {
      throw new Error('Failed to fetch Notion data');
    }
    const data = await response.json();
    return {
      propertyListings: data.propertyListings,
      upcomingProjects: data.upcomingProjects,
      servicesListings: data.servicesListings,
    };
  } catch (error) {
    console.error('Error fetching Notion data:', error);
    return {
      propertyListings: [],
      upcomingProjects: []
    };
  }
} 
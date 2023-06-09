import { Duration } from "@mui/material";

export type PropertyType = {
  "Add Ons Monthly": number;
  "Add on Tasks": string[];
  Address: string[];
  City: string[];
  Customer: string[];
  "Customer Name": string[];
  Email: string[];
  "Essentials Monthly": number;
  "Essentials Tasks": string[];
  "Estimate #": number;
  "Estimate Link": string;
  Estimates: any[]; // Please specify the actual type for 'Estimates'
  "First Service": string[];
  "First Service Friendly": { error: string };
  "Healthy Home Monthly": number;
  "Healthy Home Tasks": string[];
  "Healthy Home Time Expected Quarter 1": number;
  "Healthy Home Time Expected Quarter 3": number;
  ID: string;
  ItemTaskJoin: string[];
  "Items to Maintain": string[];
  "Phone Number": string[];
  "Property Name": string;
  PropertyID: string;
  Quotes: string[];
  Services: string[];
  State: string[];
  "Total Monthly": number;
  Type: string[];
  recordId: string;
};

export type PropertyType = {
  "Add Ons Monthly": number;
  "Add on Tasks": string[];
  Address: string[];
  AssumeHealthyPlan: boolean;
  AssumeEssentialsPlan: boolean;
  City: string[];
  Customer: string[];
  "Customer Name": string[];
  Email: string[];
  "Essentials Annual": number;
  "Essentials Tasks": string[];
  "Estimate #": number;
  "Estimate Link": string;
  Estimates: any[]; // Please specify the actual type for 'Estimates'
  "First Service": string[];
  "First Service Friendly": { error: string };
  "Healthy Home Annual": number;
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

export type PropertyTaskType = {
  fields: TaskType;
  id: string;
};

type TaskType = {
  Task: string[];
  PlanName: string[];
  QuarterEffective: string[];
  FrequencyNumber: number;
  Qty: number[];
  TotalDuration: number;
  "Individual Service Price (with materials)": number[];
};

export type SelectedTaskType = {
  name: string;
  quantity: number;
  frequency: number;
  memberPrice: number;
  nonMemberPrice: number;
  result: number;
};

export type RawTaskType = {
  fields: {
    description: string;
    Duration: number;
    EssentialsPlan: boolean;
    Estimates: string[];
    "Explanatory Video": string;
    Frequency: string;
    Instructions: string;
    Inventory: string[];
    Items: string[];
    "Per Service Price": number;
    PlanName: string[];
    Plans: string[];
    "Property Type": string[];
    Quarter: string[];
    "Quarter 2": boolean;
    "Quarter 4": boolean;
    QuarterV1: string[];
    "Service Price With Materials Member Price": number;
    "Service Price With Materials Non-Member Price": number;
    Task: string;
    TasksVerbose: string;
    photoCaptions: string[];
    photoNames: string[];
    photos: string[];
    recordid: string;
    urlPhotos: string[];
    photoObjects: {
      fields: { Name: string; url: string; caption: string };
      id: string;
    }[];
  };
  id: string;
};

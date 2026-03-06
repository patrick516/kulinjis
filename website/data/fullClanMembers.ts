export interface FullClanMember {
  id: number;
  name: string;
  parentId?: number;
  birthYear?: number;
  deathYear?: number;
}

export const fullClanMembers: FullClanMember[] = [
  // Founder
  { id: 1, name: "Fabrany Kulinji", birthYear: 1800, deathYear: 1870 },

  // Sons of Fabrany
  { id: 2, name: "Fabrany Kulinji Jr.", parentId: 1 },
  { id: 3, name: "Thomson Kulinji", parentId: 1 },
  { id: 4, name: "Unknown Son", parentId: 1 },

  // Children of Fabrany Jr.
  { id: 5, name: "Robert", parentId: 2 },
  { id: 6, name: "Grace", parentId: 2 },
  { id: 7, name: "Andrea", parentId: 2 },
  { id: 8, name: "Elina", parentId: 2 },
  { id: 9, name: "David", parentId: 2 },
  { id: 10, name: "Idess", parentId: 2 },
  { id: 11, name: "Nolah", parentId: 2 },
  { id: 12, name: "Moses", parentId: 2 },

  // Children of Andrea
  { id: 13, name: "Nolah", parentId: 7 },
  { id: 14, name: "Piyson Chimwemwe", parentId: 7 },

  // Children of David
  { id: 15, name: "Sonya", parentId: 9 },
  { id: 16, name: "Joyce", parentId: 9 },
  { id: 17, name: "Grace", parentId: 9 },

  // Children of Robert
  { id: 18, name: "Miah", parentId: 5 },

  // Moses moved to Zimbabwe (no children listed in notes)
];

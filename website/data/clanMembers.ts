export interface ClanMember {
  id: number;
  name: string;
  birthYear?: number;
  deathYear?: number;
  photo?: string;
  parentId?: number;
  spouse?: string;
  origin?: string;
  notes?: string;
}

export const clanMembers: ClanMember[] = [
  {
    id: 1,
    name: "Kulinji (Founder)",
    birthYear: 1920,
    deathYear: 1985,
    photo: "john.jpg",
  },
  {
    id: 2,
    name: "February Kulinji",
    birthYear: 1950,
    parentId: 1,
    photo: "peter.jpg",
  },
  {
    id: 3,
    name: "Thomson Kulinji",
    birthYear: 1955,
    parentId: 1,
    photo: "sarah.jpg",
  },
  {
    id: 4,
    name: "Unknown Son",
    birthYear: 1953,
    parentId: 1,
    photo: "james.jpg",
  },
  { id: 5, name: "Robert", birthYear: 1958, parentId: 2, photo: "linda.jpg" },
  {
    id: 6,
    name: "Grace",
    birthYear: 1978,
    parentId: 2,
    photo: "michael.jpg",
  },
  { id: 7, name: "Andra", birthYear: 1982, parentId: 2, photo: "emily.jpg" },
  { id: 8, name: "David", birthYear: 1980, parentId: 4, photo: "david.jpg" },
  {
    id: 9,
    name: "Micah (Mrs Moyo)",
    birthYear: 1984,
    parentId: 8,
    photo: "anna.jpg",
  },
  { id: 10, name: "Moses", birthYear: 1986, parentId: 5, photo: "chris.jpg" },
];

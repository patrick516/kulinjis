export interface ClanMember {
  id: number;
  name: string;
  birthYear?: number;
  deathYear?: number;
  photo?: string; // file name in public/images
  parentId?: number; // reference to parent
}

export const clanMembers: ClanMember[] = [
  { id: 1, name: "John", birthYear: 1920, deathYear: 1985, photo: "john.jpg" },
  { id: 2, name: "Peter", birthYear: 1950, parentId: 1, photo: "peter.jpg" },
  { id: 3, name: "Sarah", birthYear: 1955, parentId: 1, photo: "sarah.jpg" },
  { id: 4, name: "James", birthYear: 1953, parentId: 1, photo: "james.jpg" },
  { id: 5, name: "Linda", birthYear: 1958, parentId: 1, photo: "linda.jpg" },
  {
    id: 6,
    name: "Michael",
    birthYear: 1978,
    parentId: 2,
    photo: "michael.jpg",
  },
  { id: 7, name: "Emily", birthYear: 1982, parentId: 2, photo: "emily.jpg" },
  { id: 8, name: "David", birthYear: 1980, parentId: 4, photo: "david.jpg" },
  { id: 9, name: "Anna", birthYear: 1984, parentId: 8, photo: "anna.jpg" },
  { id: 10, name: "Chris", birthYear: 1986, parentId: 5, photo: "chris.jpg" },
];

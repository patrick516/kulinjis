// components/gallery/galleryData.ts
export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  caption?: string;
}

export const galleryItems: GalleryItem[] = [
  // Family Portraits
  {
    id: 1,
    src: "/images/gallery/family1.jpg",
    alt: "Family Portrait 1",
    category: "Family Portraits",
    caption: "The Kulinji Family, 1990",
  },
  {
    id: 2,
    src: "/images/gallery/family2.jpg",
    alt: "Family Portrait 2",
    category: "Family Portraits",
    caption: "Celebrating together",
  },

  // Clan Ceremonies
  {
    id: 3,
    src: "/images/gallery/ceremony1.jpg",
    alt: "Ceremony 1",
    category: "Clan Ceremonies",
    caption: "Traditional ceremony",
  },
  {
    id: 4,
    src: "/images/gallery/ceremony2.jpg",
    alt: "Ceremony 2",
    category: "Clan Ceremonies",
    caption: "Wedding event",
  },

  // Historic Sites
  {
    id: 5,
    src: "/images/gallery/site1.jpg",
    alt: "Historic Site 1",
    category: "Historic Sites",
    caption: "Chitidzi village",
  },
  {
    id: 6,
    src: "/images/gallery/site2.jpg",
    alt: "Historic Site 2",
    category: "Historic Sites",
    caption: "Mngona settlement",
  },

  // Documents & Artifacts
  {
    id: 7,
    src: "/images/gallery/document1.jpg",
    alt: "Document 1",
    category: "Documents & Artifacts",
    caption: "Old clan records",
  },
  {
    id: 8,
    src: "/images/gallery/artifact1.jpg",
    alt: "Artifact 1",
    category: "Documents & Artifacts",
    caption: "Traditional tool",
  },

  // Tree Illustrations / Charts
  {
    id: 9,
    src: "/images/gallery/tree1.jpg",
    alt: "Tree Illustration 1",
    category: "Tree Illustrations / Charts",
    caption: "Kulinji Family Tree",
  },
  {
    id: 10,
    src: "/images/gallery/tree2.jpg",
    alt: "Tree Illustration 2",
    category: "Tree Illustrations / Charts",
    caption: "Detailed lineage chart",
  },
];

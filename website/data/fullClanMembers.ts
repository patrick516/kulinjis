export interface FullClanMember {
  id: number;
  name: string;
  parentId?: number;
  birthYear?: number;
  deathYear?: number;
  notes?: string;
  photo?: string;
}

export const fullClanMembers: FullClanMember[] = [
  // ── Founder (the original Kulinji from Mozambique) ──────────────────────
  { id: 1, name: "Kulinji (Founder)", notes: "Originally from Mozambique" },

  // ── Three sons who came to Malawi and settled in Chididi ────────────────
  { id: 2, name: "February Kulinji", parentId: 1, notes: "Hunter" },
  {
    id: 3,
    name: "Thomson Kulinji",
    parentId: 1,
    notes: "Fisherman — Chididi → Chazuka (Green Ntafia) → Ngona village",
  },
  { id: 4, name: "Unknown Son", parentId: 1, notes: "Name not recorded" },

  // ── Children of February Kulinji ────────────────────────────────────────
  { id: 5, name: "Robert", parentId: 2 },
  { id: 6, name: "Grace", parentId: 2 },
  { id: 7, name: "Andra", parentId: 2 },
  { id: 8, name: "Elina", parentId: 2 },
  { id: 9, name: "David", parentId: 2 },
  { id: 10, name: "Idess", parentId: 2 },
  { id: 11, name: "Nokh", parentId: 2 },
  {
    id: 12,
    name: "Moses",
    parentId: 2,
    notes: "Moved and settled in Zimbabwe",
  },

  // ── Children of Robert ──────────────────────────────────────────────────
  {
    id: 13,
    name: "Micah (Mrs Moyo)",
    parentId: 5,
    notes: "Only survivor — 13 of 14 children died",
  },

  // ── Children of Andra ───────────────────────────────────────────────────
  { id: 14, name: "Noliah", parentId: 7 },
  { id: 15, name: "Piyason", parentId: 7 },
  { id: 16, name: "Chimwemwe", parentId: 7 },

  // ── Children of David ───────────────────────────────────────────────────
  {
    id: 17,
    name: "Sonya",
    parentId: 9,
    notes: "Survivor — 8 children, most died",
  },
  { id: 18, name: "Joyce", parentId: 9 },
  { id: 19, name: "Grace", parentId: 9 },

  // ── Children of Thomson Kulinji ─────────────────────────────────────────
  { id: 20, name: "Mayilosi", parentId: 3 },
  { id: 21, name: "Lice", parentId: 3 },
  { id: 22, name: "Falesi", parentId: 3 },
  { id: 23, name: "Offesi", parentId: 3 },
  { id: 24, name: "Martha", parentId: 3 },
  { id: 25, name: "Agness", parentId: 3 },

  // ── Children of Mayilosi (first wife) ───────────────────────────────────
  { id: 26, name: "Harry", parentId: 20 },
  { id: 27, name: "Paul", parentId: 20 },
  { id: 28, name: "Fostino", parentId: 20 },
  { id: 29, name: "Doliya", parentId: 20 },
  { id: 30, name: "Falumesi", parentId: 20 },

  // ── Children of Mayilosi (second wife — Lucy/Mataka) ────────────────────
  {
    id: 31,
    name: "Lucy (Mataka)",
    parentId: 20,
    notes: "Child of second wife",
  },
  { id: 32, name: "Redison", parentId: 20, notes: "Died young" },

  // ── Children of Harry (wife 1 — Matalia) ────────────────────────────────
  { id: 33, name: "Chrisy", parentId: 26 },
  { id: 34, name: "Stevelia", parentId: 26 },
  { id: 35, name: "Falesi", parentId: 26 },

  // ── Children of Harry (wife 2) ──────────────────────────────────────────
  { id: 36, name: "Agness", parentId: 26, notes: "From second wife" },

  // ── Children of Harry (wife 3 — from Mulanje) ───────────────────────────
  { id: 37, name: "Thomson", parentId: 26, notes: "From wife from Mulanje" },

  // ── Children of Harry (wife 4 — from Lilongwe) ──────────────────────────
  {
    id: 38,
    name: "Ndiuzayani",
    parentId: 26,
    notes: "From wife from Lilongwe",
  },

  // ── Children of Matalia (married Chingaphonyg) ───────────────────────────
  { id: 39, name: "Esinala", parentId: 33, notes: "Died" },
  { id: 40, name: "Lenard", parentId: 33 },
  { id: 41, name: "Charmaine (Alex)", parentId: 33 },
  { id: 42, name: "Robin", parentId: 33 },
  { id: 43, name: "Fatima", parentId: 33, notes: "Died young" },
  { id: 44, name: "Edina", parentId: 33, notes: "Police Super" },

  // ── Children of Paul (wife 1 — Mary) ────────────────────────────────────
  { id: 45, name: "Magret", parentId: 27 },
  { id: 46, name: "Vayleti", parentId: 27 },
  { id: 47, name: "Towera", parentId: 27 },
  { id: 48, name: "Pilirani", parentId: 27 },
  { id: 49, name: "Maloto", parentId: 27 },
  { id: 50, name: "Ndaona", parentId: 27 },
  { id: 51, name: "Jamikani", parentId: 27 },
  { id: 52, name: "Lonjezo", parentId: 27 },

  // ── Children of Paul (wife 2 — Felister) ────────────────────────────────
  { id: 53, name: "Mabvuto", parentId: 27, notes: "From wife Felister" },
  { id: 54, name: "Regina", parentId: 27, notes: "From wife Felister" },
  { id: 55, name: "Innocent", parentId: 27, notes: "From wife Felister" },

  // ── Children of Paul (wife 3 — name unknown) ────────────────────────────
  {
    id: 56,
    name: "Stewart",
    parentId: 27,
    notes: "From third wife (name unknown)",
  },
  {
    id: 57,
    name: "Chrissy",
    parentId: 27,
    notes: "From third wife (name unknown)",
  },

  // ── Grandchildren of Paul (via his children) ────────────────────────────
  { id: 58, name: "James", parentId: 45 },
  { id: 59, name: "Faith", parentId: 46 },
  { id: 60, name: "Junior (Patrice)", parentId: 46 },
  { id: 61, name: "Ongani", parentId: 47 },
  { id: 62, name: "Diana", parentId: 47 },
  { id: 63, name: "Kenneth", parentId: 47 },
  { id: 64, name: "Leah", parentId: 48 },
  { id: 65, name: "Tadala", parentId: 49 },
  { id: 66, name: "Mayamiko", parentId: 49 },
  { id: 67, name: "Wezi", parentId: 50 },
  { id: 68, name: "Shamim", parentId: 50 },
  { id: 69, name: "Kelvin", parentId: 51 },
  { id: 70, name: "Jarcho", parentId: 51 },
  { id: 71, name: "Chipiliro", parentId: 51 },
  { id: 72, name: "Nthouzi", parentId: 52 },
  { id: 73, name: "Shoni", parentId: 27, notes: "Child of Paul" },
  { id: 74, name: "Faith", parentId: 27, notes: "Child of Paul" },

  // ── Children of Fostino ─────────────────────────────────────────────────
  { id: 75, name: "Telezia", parentId: 28 },
  { id: 76, name: "Mania", parentId: 28 },
  { id: 77, name: "Steliya", parentId: 28 },
  // Second wife of Fostino
  { id: 78, name: "Nkonkha", parentId: 28, notes: "Child of second wife" },

  // ── Children of Telezia ─────────────────────────────────────────────────
  { id: 79, name: "Chimwemwe", parentId: 75 },
  { id: 80, name: "Chikondi", parentId: 75 },

  // ── Children of Mania ───────────────────────────────────────────────────
  { id: 81, name: "Fostino", parentId: 76 },
  { id: 82, name: "Eliza", parentId: 76 },
  { id: 83, name: "Chikumbukutso", parentId: 76 },

  // ── Children of Steliya ─────────────────────────────────────────────────
  { id: 84, name: "Chrissy", parentId: 77 },
  { id: 85, name: "Catherine", parentId: 77 },
  { id: 86, name: "Ivy", parentId: 77 },
  { id: 87, name: "Mwayiwalo", parentId: 77 },
  { id: 88, name: "Hamanson", parentId: 77 },
  { id: 89, name: "Faith", parentId: 77 },

  // ── Children of Doliya (husband: Kamwingo — Thyolo, Khonjeni) ───────────
  { id: 90, name: "Gomola", parentId: 29 },
  { id: 91, name: "Pilirani", parentId: 29 },

  // ── Children of Falumesi (husband: Chipolopolo — at Bangula) ────────────
  { id: 92, name: "Jana", parentId: 30, notes: "Currently at Bangula" },

  // ── Children of Lucy (Mataka) ───────────────────────────────────────────
  { id: 93, name: "Samuel", parentId: 31, notes: "Died" },
  { id: 94, name: "Chabuka", parentId: 31 },
  { id: 95, name: "Malia", parentId: 31 },
  { id: 96, name: "Ndariona (Christo)", parentId: 31 },
  { id: 97, name: "Samuel", parentId: 31 },
  { id: 98, name: "Aubrey", parentId: 31 },
  { id: 99, name: "Hastings", parentId: 23 },
  { id: 100, name: "Christina", parentId: 23 },
  { id: 101, name: "Evason", parentId: 23, notes: "Boy" },
  { id: 102, name: "Lingstone", parentId: 23 },
  { id: 103, name: "Patrick", parentId: 23 },
  { id: 104, name: "Rozi", parentId: 23, notes: "Died while young" },
  { id: 105, name: "Charles", parentId: 23 },
  { id: 106, name: "Patricia", parentId: 23 },
  { id: 107, name: "Kulinji", parentId: 23 },
  { id: 108, name: "Lidia", parentId: 23 },

  // ── LICE (id:21 in fullClanMembers — child of Thomson id:3) ───────────────
  // Children of Lice
  { id: 109, name: "Kulima", parentId: 21 },
  { id: 110, name: "Steveliya", parentId: 21 },

  // ── HASTINGS (id:99 — child of Offesi) ───────────────────────────────────
  { id: 111, name: "Patricia", parentId: 99, notes: "Currently in Lilongwe" },

  // ── PATRICK (id:103 — child of Offesi) ───────────────────────────────────
  { id: 112, name: "Yamikani", parentId: 103 },
  { id: 113, name: "Paul", parentId: 103 },
  { id: 114, name: "Hastings", parentId: 103, notes: "Died while young" },

  // ── CHARLES (id:105 — child of Offesi) ───────────────────────────────────
  { id: 115, name: "Yohani (Fakeni)", parentId: 105 },

  // ── LINGSTONE (id:102 — child of Offesi) ─────────────────────────────────
  { id: 116, name: "Thomas", parentId: 102 },
  { id: 117, name: "James", parentId: 102 },
  { id: 118, name: "Patrick", parentId: 102 },
  { id: 119, name: "Gloria", parentId: 102 },
  { id: 120, name: "Catherine", parentId: 102 },
  { id: 121, name: "Ndaona", parentId: 102 },

  // ── JAMES (id:117 — child of Lingstone) ──────────────────────────────────
  { id: 122, name: "Elijah", parentId: 117 },
  { id: 123, name: "Beatrice", parentId: 117 },

  // ── GLORIA (id:119 — child of Lingstone) ─────────────────────────────────
  { id: 124, name: "Shanilla (Shakinah)", parentId: 119 },

  // ── CATHERINE (id:120 — child of Lingstone) ──────────────────────────────
  { id: 125, name: "Precious", parentId: 120 },

  // ── THOMSON (id:116 — child of Lingstone) ────────────────────────────────
  // NOTE: Thomson's children not y
];

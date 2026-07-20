export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  isGlobalConsultant: boolean; // if true, can be used in the normal CTA outside of blogs
}

export const teamMembers: TeamMember[] = [
  // Global Consultants (Legacy IDs 1 to 4)
  {
    id: "ozkan-tekce",
    name: "Özkan Tekçe",
    title: "TEKCE COO",
    image: "/Ozkan-Tekce-profile.png",
    isGlobalConsultant: true,
  },
  {
    id: "ihsan-erol",
    name: "İhsan Erol",
    title: "Partner Manager",
    image: "/ihsan-erol.png",
    isGlobalConsultant: true,
  },
  {
    id: "ozkan-yurdakul",
    name: "Özkan Yurdakul",
    title: "Dubai Office Manager",
    image: "/ozkan-yurdakul.png",
    isGlobalConsultant: true,
  },
  {
    id: "anastasia-akay",
    name: "Anastasia Akay",
    title: "Operations Manager",
    image: "/anastasia-akay.png",
    isGlobalConsultant: true,
  },
  // Blog Authors only
  {
    id: "leyla-zengin",
    name: "Leyla Zengin",
    title: "Marketing Services Manager",
    image: "/leyla-zengin.png",
    isGlobalConsultant: false,
  },
  {
    id: "bayram-tekce",
    name: "Bayram Tekçe",
    title: "CEO",
    image: "/bayram-tekce.png",
    isGlobalConsultant: false,
  },
  {
    id: "zuhal-deniz",
    name: "M. Zuhal Deniz",
    title: "Marketing Manager",
    image: "/zuhal-deniz.png",
    isGlobalConsultant: false,
  },
  {
    id: "aysun-tekce",
    name: "Aysun Tekçe",
    title: "CMO",
    image: "/aysun-tekce.png",
    isGlobalConsultant: false,
  }
];

export const legacyConsultantsMap = [
  "ozkan-tekce",
  "ihsan-erol",
  "ozkan-yurdakul",
  "anastasia-akay"
];

export const getTeamMember = (id: string | number): TeamMember => {
  if (typeof id === 'number') {
    const stringId = legacyConsultantsMap[Math.max(0, Math.min(id - 1, legacyConsultantsMap.length - 1))];
    return teamMembers.find(m => m.id === stringId) || teamMembers[0];
  }
  return teamMembers.find(m => m.id === id) || teamMembers[0];
};

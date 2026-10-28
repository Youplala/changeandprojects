export const site = {
  name: "Change & Projects",
  person: "Charles-Antoine Patarroni",
  description:
    "Comprendre le changement, mettre les équipes en mouvement et faire avancer les projets. Formation, conseil et accompagnement avec Charles-Antoine Patarroni.",
  linkedin: "https://fr.linkedin.com/in/charles-antoine-patarroni",
  email: null as string | null,
  portrait: {
    src: "/images/charles-antoine-patarroni.jpg",
    alt: "Portrait de Charles-Antoine Patarroni",
    width: 800,
    height: 800,
    source: "https://www.linkedin.com/in/charles-antoine-patarroni/",
  },
  company: {
    name: "CHANGE AND PROJECTS CONSULTING",
    siren: "849 056 759",
    siret: "849 056 759 00012",
    legalForm: "SASU",
    capital: "500 €",
    address: "7 chemin de la Berlandière, 79000 Niort, France",
    rcs: "849 056 759 RCS Niort",
    source:
      "https://www.pappers.fr/entreprise/change-and-projects-consulting-849056759",
  },
};

export const expertises = [
  {
    number: "01",
    title: "Accompagner le changement",
    description:
      "Donner du sens aux transformations. Comprendre les résistances, créer les conditions du dialogue et mettre les équipes en mouvement.",
    tag: "Conduite du changement",
  },
  {
    number: "02",
    title: "Faire avancer les projets",
    description:
      "Clarifier le cap, structurer l’action et mobiliser les bonnes énergies pour passer de l’intention à la réalisation.",
    tag: "Management de projets",
  },
  {
    number: "03",
    title: "Développer les équipes",
    description:
      "Faire grandir les compétences et les pratiques managériales. Renforcer la coopération pour progresser ensemble.",
    tag: "Management & coopération",
  },
];

export interface Training {
  slug: string;
  title: string;
  published: boolean;
  summary: string;
  audience: string[];
  objectives: string[];
  program: { title: string; items: string[] }[];
  prerequisites: string | null;
  duration: string | null;
  format: string | null;
  methods: string | null;
  assessment: string | null;
  accessibility: string | null;
  price: string | null;
}

// Pistes éditoriales uniquement : aucun programme commercial n'est validé.
export const trainings: Training[] = expertises.map((expertise, index) => ({
  slug: [
    "conduite-du-changement",
    "management-de-projets",
    "developpement-des-equipes",
  ][index],
  title: expertise.tag,
  published: false,
  summary: "",
  audience: [],
  objectives: [],
  program: [],
  prerequisites: null,
  duration: null,
  format: null,
  methods: null,
  assessment: null,
  accessibility: null,
  price: null,
}));

export function getPublishedTrainings(): Training[] {
  return trainings.filter((training) => {
    if (!training.published) return false;
    const required = [
      "summary",
      "prerequisites",
      "duration",
      "format",
      "methods",
      "assessment",
      "accessibility",
      "price",
    ] as const;
    if (
      required.some((key) => !training[key]?.trim()) ||
      !training.audience.length ||
      !training.objectives.length ||
      !training.program.length ||
      training.program.some(
        (section) => !section.title.trim() || !section.items.length,
      )
    ) {
      throw new Error(
        `La formation « ${training.title} » est publiée mais sa fiche est incomplète. Validez tous les champs ou remettez published à false.`,
      );
    }
    return true;
  });
}

export type Language = 'pt-BR' | 'en-US';
export type Theme = 'light' | 'dark';

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: {
    'pt-BR': string;
    'en-US': string;
  };
  shortDescription: {
    'pt-BR': string;
    'en-US': string;
  };
  outcome?: {
    'pt-BR': string;
    'en-US': string;
  };
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  image: string;
  imageAlt: {
    'pt-BR': string;
    'en-US': string;
  };
  caseStudyRoute: string;
  badge?: {
    'pt-BR': string;
    'en-US': string;
  };
}

export interface SkillItem {
  name: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  title: {
    'pt-BR': string;
    'en-US': string;
  };
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  area: {
    'pt-BR': string;
    'en-US': string;
  };
  period: {
    'pt-BR': string;
    'en-US': string;
  };
  description: {
    'pt-BR': string;
    'en-US': string;
  };
  responsibilities: {
    'pt-BR': string[];
    'en-US': string[];
  };
  technologies: string[];
}

export interface DiagramInfo {
  src: string;
  caption: {
    'pt-BR': string;
    'en-US': string;
  };
  alt: {
    'pt-BR': string;
    'en-US': string;
  };
}

export interface CodeSnippet {
  title: string;
  language: 'typescript' | 'javascript' | 'bash';
  code: string;
  description?: {
    'pt-BR': string;
    'en-US': string;
  };
}

export interface CaseStudyData {
  id: string;
  slug: string;
  title: string;
  subtitle: {
    'pt-BR': string;
    'en-US': string;
  };
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  previewImage: string;
  problem: {
    'pt-BR': string[];
    'en-US': string[];
  };
  technicalChallenges?: {
    'pt-BR': string[];
    'en-US': string[];
  };
  decision: {
    title: {
      'pt-BR': string;
      'en-US': string;
    };
    content: {
      'pt-BR': string[];
      'en-US': string[];
    };
  };
  diagrams: DiagramInfo[];
  pipelineOrSections?: {
    title: {
      'pt-BR': string;
      'en-US': string;
    };
    items: {
      subtitle: {
        'pt-BR': string;
        'en-US': string;
      };
      text: {
        'pt-BR': string;
        'en-US': string;
      };
    }[];
  };
  codeSnippets: CodeSnippet[];
  tradeOffs: {
    'pt-BR': string[];
    'en-US': string[];
  };
  result?: {
    'pt-BR': string[];
    'en-US': string[];
  };
  demonstrates: {
    'pt-BR': string[];
    'en-US': string[];
  };
}

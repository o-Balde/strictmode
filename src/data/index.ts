import {
  QuizQuestion,
  QuestionCategory,
  QuestionSubject,
  QuestionLevel,
  QuestionType,
  TopicMetadata,
  TopicStat,
  DailyDrill,
  UserDrillProgress
} from './types';

import { REACT_HOOKS_QUESTIONS } from './questions/react-hooks';
import { REACT_RENDERING_QUESTIONS } from './questions/react-rendering';
import { TYPESCRIPT_QUESTIONS } from './questions/typescript';
import { NEXTJS_RSC_QUESTIONS } from './questions/nextjs-rsc';
import { JAVASCRIPT_CORE_QUESTIONS } from './questions/javascript-core';
import { PERFORMANCE_QUESTIONS } from './questions/performance';
import { SYSTEM_DESIGN_QUESTIONS } from './questions/system-design';
import { LIVE_CODING_QUESTIONS } from './questions/live-coding';
import { FIX_THE_BUG_QUESTIONS } from './questions/fix-the-bug';
import { PUZZLE_QUESTIONS } from './questions/puzzles';
import { ALGORITHMS_DSA_QUESTIONS } from './questions/algorithms-dsa';

export * from './types';
export * from './binary-types';
export * from './binary-cards';
export { REACT_HOOKS_QUESTIONS } from './questions/react-hooks';
export { REACT_RENDERING_QUESTIONS } from './questions/react-rendering';
export { TYPESCRIPT_QUESTIONS } from './questions/typescript';
export { NEXTJS_RSC_QUESTIONS } from './questions/nextjs-rsc';
export { JAVASCRIPT_CORE_QUESTIONS } from './questions/javascript-core';
export { PERFORMANCE_QUESTIONS } from './questions/performance';
export { SYSTEM_DESIGN_QUESTIONS } from './questions/system-design';
export { LIVE_CODING_QUESTIONS } from './questions/live-coding';
export { FIX_THE_BUG_QUESTIONS } from './questions/fix-the-bug';
export { PUZZLE_QUESTIONS } from './questions/puzzles';
export { ALGORITHMS_DSA_QUESTIONS } from './questions/algorithms-dsa';

/**
 * Master consolidated array of all questions (743 items organized across all modules)
 */
export const ALL_QUESTIONS: QuizQuestion[] = [
  ...REACT_HOOKS_QUESTIONS,
  ...REACT_RENDERING_QUESTIONS,
  ...TYPESCRIPT_QUESTIONS,
  ...NEXTJS_RSC_QUESTIONS,
  ...JAVASCRIPT_CORE_QUESTIONS,
  ...PERFORMANCE_QUESTIONS,
  ...SYSTEM_DESIGN_QUESTIONS,
  ...ALGORITHMS_DSA_QUESTIONS,
  ...LIVE_CODING_QUESTIONS,
  ...FIX_THE_BUG_QUESTIONS,
  ...PUZZLE_QUESTIONS
];

/**
 * Fast lookup map by unique ID
 */
export const QUESTIONS_BY_ID = new Map<string, QuizQuestion>(
  ALL_QUESTIONS.map(q => [q.id, q])
);

/**
 * Category-indexed lookup map
 */
export const QUESTIONS_BY_CATEGORY: Record<QuestionCategory, QuizQuestion[]> = {
  react: ALL_QUESTIONS.filter(q => q.category === 'react'),
  typescript: ALL_QUESTIONS.filter(q => q.category === 'typescript'),
  nextjs: ALL_QUESTIONS.filter(q => q.category === 'nextjs'),
  javascript: ALL_QUESTIONS.filter(q => q.category === 'javascript'),
  performance: ALL_QUESTIONS.filter(q => q.category === 'performance'),
  system_design: ALL_QUESTIONS.filter(q => q.category === 'system_design'),
  algorithms: ALL_QUESTIONS.filter(q => q.category === 'algorithms')
};

/**
 * Subject-indexed lookup map
 */
export const QUESTIONS_BY_SUBJECT: Record<QuestionSubject, QuizQuestion[]> = {
  hooks: ALL_QUESTIONS.filter(q => q.subject === 'hooks'),
  'rendering-keys': ALL_QUESTIONS.filter(q => q.subject === 'rendering-keys'),
  generics: ALL_QUESTIONS.filter(q => q.subject === 'generics'),
  narrowing: ALL_QUESTIONS.filter(q => q.subject === 'narrowing'),
  'state-management': ALL_QUESTIONS.filter(q => q.subject === 'state-management'),
  'server-components': ALL_QUESTIONS.filter(q => q.subject === 'server-components'),
  performance: ALL_QUESTIONS.filter(q => q.subject === 'performance'),
  closures: ALL_QUESTIONS.filter(q => q.subject === 'closures'),
  'event-loop': ALL_QUESTIONS.filter(q => q.subject === 'event-loop'),
  'async-await': ALL_QUESTIONS.filter(q => q.subject === 'async-await'),
  types: ALL_QUESTIONS.filter(q => q.subject === 'types'),
  'design-patterns': ALL_QUESTIONS.filter(q => q.subject === 'design-patterns'),
  'data-fetching': ALL_QUESTIONS.filter(q => q.subject === 'data-fetching'),
  concurrency: ALL_QUESTIONS.filter(q => q.subject === 'concurrency'),
  'system-architecture': ALL_QUESTIONS.filter(q => q.subject === 'system-architecture'),
  'data-structures': ALL_QUESTIONS.filter(q => q.subject === 'data-structures')
};

/**
 * Level-indexed lookup map
 */
export const QUESTIONS_BY_LEVEL: Record<QuestionLevel, QuizQuestion[]> = {
  junior: ALL_QUESTIONS.filter(q => q.level === 'junior'),
  intermediate: ALL_QUESTIONS.filter(q => q.level === 'intermediate'),
  senior: ALL_QUESTIONS.filter(q => q.level === 'senior')
};

/**
 * Type-indexed lookup map
 */
export const QUESTIONS_BY_TYPE: Record<QuestionType, QuizQuestion[]> = {
  concept: ALL_QUESTIONS.filter(q => q.type === 'concept'),
  output: ALL_QUESTIONS.filter(q => q.type === 'output'),
  puzzle: ALL_QUESTIONS.filter(q => q.type === 'puzzle'),
  live_code: ALL_QUESTIONS.filter(q => q.type === 'live_code'),
  fix: ALL_QUESTIONS.filter(q => q.type === 'fix')
};

/**
 * Topic Metadata taxonomy for UI cards & coverage rings
 */
export const TOPIC_METADATA: Record<QuestionSubject, TopicMetadata> = {
  hooks: {
    subject: 'hooks',
    title: 'Hooks & Lifecycles',
    category: 'react',
    description: 'useState snapshots, useEffect cleanups, custom hooks, and concurrent hooks',
    recommendedLevel: 'junior'
  },
  'rendering-keys': {
    subject: 'rendering-keys',
    title: 'Rendering & Keys',
    category: 'react',
    description: 'Virtual DOM, Fiber architecture, reconciliation, keys, and StrictMode',
    recommendedLevel: 'intermediate'
  },
  generics: {
    subject: 'generics',
    title: 'TypeScript Generics',
    category: 'typescript',
    description: 'Generic constraints, infer keyword, mapped types, and conditional distributions',
    recommendedLevel: 'intermediate'
  },
  narrowing: {
    subject: 'narrowing',
    title: 'Type Narrowing',
    category: 'typescript',
    description: 'Type predicates, discriminated unions, control flow analysis, and type guards',
    recommendedLevel: 'junior'
  },
  types: {
    subject: 'types',
    title: 'TypeScript Types & Config',
    category: 'typescript',
    description: 'satisfies operator, as const, unknown vs never, and tsconfig strict flags',
    recommendedLevel: 'intermediate'
  },
  'server-components': {
    subject: 'server-components',
    title: 'App Router & RSC',
    category: 'nextjs',
    description: 'React Server Components, Server Actions, streaming Suspense, and serialization',
    recommendedLevel: 'intermediate'
  },
  performance: {
    subject: 'performance',
    title: 'Vercel React Performance',
    category: 'performance',
    description: 'Waterfall elimination, bundle size, barrel imports, memoization traps, and Set lookups',
    recommendedLevel: 'intermediate'
  },
  closures: {
    subject: 'closures',
    title: 'Closures & Scope',
    category: 'javascript',
    description: 'Lexical environments, primitive vs reference capture, TDZ, and this context loss',
    recommendedLevel: 'intermediate'
  },
  'event-loop': {
    subject: 'event-loop',
    title: 'Event Loop & Concurrency',
    category: 'javascript',
    description: 'Microtasks (Promises) vs Macrotasks (setTimeout), queueMicrotask, and call stack',
    recommendedLevel: 'senior'
  },
  'state-management': {
    subject: 'state-management',
    title: 'State Management Taxonomy',
    category: 'system_design',
    description: 'URL state vs Server cache vs Global stores (Zustand/Redux) vs Local state',
    recommendedLevel: 'intermediate'
  },
  'data-fetching': {
    subject: 'data-fetching',
    title: 'Data Fetching & Cache',
    category: 'system_design',
    description: 'Optimistic UI with rollbacks, cursor pagination, AbortController, and caching layers',
    recommendedLevel: 'senior'
  },
  'system-architecture': {
    subject: 'system-architecture',
    title: 'Frontend System Design',
    category: 'system_design',
    description: 'Virtualized lists for 100k items, WebSockets vs SSE, and micro-frontend architecture',
    recommendedLevel: 'senior'
  },
  'data-structures': {
    subject: 'data-structures',
    title: 'DSA & Algorithms',
    category: 'algorithms',
    description: 'LRU Cache, sliding window, Boyer-Moore majority element, and interval merging',
    recommendedLevel: 'intermediate'
  },
  'async-await': {
    subject: 'async-await',
    title: 'Async/Await & Promises',
    category: 'javascript',
    description: 'Promise combinators, error propagation, and unhandled rejections',
    recommendedLevel: 'junior'
  },
  'design-patterns': {
    subject: 'design-patterns',
    title: 'Design Patterns',
    category: 'javascript',
    description: 'Observer pattern, EventEmitter, deepClone with WeakMap, and immutability',
    recommendedLevel: 'senior'
  },
  concurrency: {
    subject: 'concurrency',
    title: 'React Concurrency',
    category: 'react',
    description: 'useTransition, useDeferredValue, useSyncExternalStore, and tearing prevention',
    recommendedLevel: 'senior'
  }
};

/**
 * Generate a curated 5-item daily drill matching StrictMode design rules:
 * - 3 quick questions (concept / output / puzzle)
 * - 1-2 coding puzzles or bug fixes (live_code / fix)
 * - Skips questions already in seenQuestionIds (until exhausted, then recycles)
 * - Prioritizes user's weak topics
 */
export function generateDailyDrill(options: {
  seenIds?: string[];
  weakSubjects?: QuestionSubject[];
  targetDay?: number;
}): DailyDrill {
  const seenSet = new Set(options.seenIds ?? []);
  const weakSubjects = options.weakSubjects ?? [];
  const day = options.targetDay ?? 1;

  // Split question bank into unseen vs seen
  const unseen = ALL_QUESTIONS.filter(q => !seenSet.has(q.id));
  const pool = unseen.length >= 5 ? unseen : ALL_QUESTIONS;

  // Filter candidates by type
  const quickPool = pool.filter(q => ['concept', 'output', 'puzzle'].includes(q.type));
  const codePool = pool.filter(q => ['live_code', 'fix'].includes(q.type));

  // Sort helper to prioritize weak subjects
  const sortByWeakness = (a: QuizQuestion, b: QuizQuestion) => {
    const aWeak = weakSubjects.includes(a.subject) ? 1 : 0;
    const bWeak = weakSubjects.includes(b.subject) ? 1 : 0;
    return bWeak - aWeak;
  };

  const prioritizedQuick = [...quickPool].sort(sortByWeakness);
  const prioritizedCode = [...codePool].sort(sortByWeakness);

  const selected: QuizQuestion[] = [];

  // Pick 3 quick items
  for (const q of prioritizedQuick) {
    if (selected.length < 3 && !selected.some(s => s.id === q.id)) {
      selected.push(q);
    }
  }

  // Pick 2 coding items (or 1 live_code + 1 fix)
  for (const q of prioritizedCode) {
    if (selected.length < 5 && !selected.some(s => s.id === q.id)) {
      selected.push(q);
    }
  }

  // Fallback to fill up to 5 items if necessary
  if (selected.length < 5) {
    for (const q of pool) {
      if (selected.length < 5 && !selected.some(s => s.id === q.id)) {
        selected.push(q);
      }
    }
  }

  const estimatedTotalMinutes = selected.reduce((acc, q) => acc + q.estimatedMinutes, 0);
  const focusTopics = Array.from(new Set(selected.map(q => q.subject)));

  return {
    day,
    items: selected,
    estimatedTotalMinutes,
    focusTopics
  };
}

/**
 * Calculate coverage rings and mastery percentages by topic
 */
export function calculateTopicStats(progress: UserDrillProgress): TopicStat[] {
  const seenSet = new Set(progress.seenQuestionIds ?? []);
  const correctSet = new Set(progress.correctQuestionIds ?? []);

  return (Object.keys(TOPIC_METADATA) as QuestionSubject[]).map(subject => {
    const meta = TOPIC_METADATA[subject];
    const subjectQuestions = QUESTIONS_BY_SUBJECT[subject] ?? [];
    const totalCount = subjectQuestions.length;
    const seenCount = subjectQuestions.filter(q => seenSet.has(q.id)).length;
    const correctCount = subjectQuestions.filter(q => correctSet.has(q.id)).length;

    const masteryPercentage =
      seenCount > 0 ? Math.round((correctCount / seenCount) * 100) : 0;

    return {
      subject,
      title: meta.title,
      category: meta.category,
      totalCount,
      seenCount,
      correctCount,
      masteryPercentage
    };
  });
}

/**
 * Dynamic filtering utility for Free Play & Topic Explorer
 */
export function filterQuestions(filters: {
  category?: QuestionCategory | 'all';
  subject?: QuestionSubject | 'all';
  level?: QuestionLevel | 'all';
  type?: QuestionType | 'all';
  search?: string;
}): QuizQuestion[] {
  return ALL_QUESTIONS.filter(q => {
    if (filters.category && filters.category !== 'all' && q.category !== filters.category) {
      return false;
    }
    if (filters.subject && filters.subject !== 'all' && q.subject !== filters.subject) {
      return false;
    }
    if (filters.level && filters.level !== 'all' && q.level !== filters.level) {
      return false;
    }
    if (filters.type && filters.type !== 'all' && q.type !== filters.type) {
      return false;
    }
    if (filters.search && filters.search.trim()) {
      const term = filters.search.toLowerCase().trim();
      const matchTitle = q.title.toLowerCase().includes(term);
      const matchPrompt = q.prompt.toLowerCase().includes(term);
      const matchTags = q.tags.some(t => t.toLowerCase().includes(term));
      const matchExplanation = q.explanation.toLowerCase().includes(term);
      if (!matchTitle && !matchPrompt && !matchTags && !matchExplanation) {
        return false;
      }
    }
    return true;
  });
}

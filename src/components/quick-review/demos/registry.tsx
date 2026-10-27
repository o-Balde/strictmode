"use client";

/**
 * Every demo the quick review page can show, each in its own lazily loaded
 * chunk. Typed as a record over DemoId, so a question can't name a demo that
 * doesn't exist, and a demo can't be added without an id for it.
 *
 * `ssr: false` because demos read the browser (layout, matchMedia, WebGL)
 * and are only mounted once their question is open anyway.
 */
import dynamic from "next/dynamic";
import type { DemoId } from "@data";
import { DemoPlaceholder } from "./placeholder";

const BoxModel3D = dynamic(() => import("./box-model-3d").then((m) => m.BoxModel3D), { ssr: false, loading: DemoPlaceholder });
const EventPropagation3D = dynamic(() => import("./event-propagation-3d").then((m) => m.EventPropagation3D), { ssr: false, loading: DemoPlaceholder });
const PrototypeChain3D = dynamic(() => import("./prototype-chain-3d").then((m) => m.PrototypeChain3D), { ssr: false, loading: DemoPlaceholder });
const EventLoop = dynamic(() => import("./event-loop").then((m) => m.EventLoop), { ssr: false, loading: DemoPlaceholder });
const NodeEventLoop = dynamic(() => import("./node-event-loop").then((m) => m.NodeEventLoop), { ssr: false, loading: DemoPlaceholder });
const PromiseLab = dynamic(() => import("./promise-lab").then((m) => m.PromiseLab), { ssr: false, loading: DemoPlaceholder });
const DebounceThrottle = dynamic(() => import("./debounce-throttle").then((m) => m.DebounceThrottle), { ssr: false, loading: DemoPlaceholder });
const EventEmitterDemo = dynamic(() => import("./event-emitter").then((m) => m.EventEmitterDemo), { ssr: false, loading: DemoPlaceholder });
const EqualityTable = dynamic(() => import("./values").then((m) => m.EqualityTable), { ssr: false, loading: DemoPlaceholder });
const ValueInspector = dynamic(() => import("./values").then((m) => m.ValueInspector), { ssr: false, loading: DemoPlaceholder });
const ShortCircuit = dynamic(() => import("./values").then((m) => m.ShortCircuit), { ssr: false, loading: DemoPlaceholder });
const FloatBits = dynamic(() => import("./float-bits").then((m) => m.FloatBits), { ssr: false, loading: DemoPlaceholder });
const CodeStepper = dynamic(() => import("./code-stepper").then((m) => m.CodeStepper), { ssr: false, loading: DemoPlaceholder });
const ThisBinding = dynamic(() => import("./this-binding").then((m) => m.ThisBinding), { ssr: false, loading: DemoPlaceholder });
const RecursionTree = dynamic(() => import("./recursion-tree").then((m) => m.RecursionTree), { ssr: false, loading: DemoPlaceholder });
const PipeBuilder = dynamic(() => import("./pipe-builder").then((m) => m.PipeBuilder), { ssr: false, loading: DemoPlaceholder });
const BigOChart = dynamic(() => import("./big-o-chart").then((m) => m.BigOChart), { ssr: false, loading: DemoPlaceholder });
const BatchesLab = dynamic(() => import("./function-lab").then((m) => m.BatchesLab), { ssr: false, loading: DemoPlaceholder });
const MaskLab = dynamic(() => import("./function-lab").then((m) => m.MaskLab), { ssr: false, loading: DemoPlaceholder });
const AnagramsLab = dynamic(() => import("./function-lab").then((m) => m.AnagramsLab), { ssr: false, loading: DemoPlaceholder });
const DomTree = dynamic(() => import("./dom-tree").then((m) => m.DomTree), { ssr: false, loading: DemoPlaceholder });
const VdomDiff = dynamic(() => import("./vdom-diff").then((m) => m.VdomDiff), { ssr: false, loading: DemoPlaceholder });
const CorsFlow = dynamic(() => import("./cors-flow").then((m) => m.CorsFlow), { ssr: false, loading: DemoPlaceholder });
const XssInspector = dynamic(() => import("./xss-inspector").then((m) => m.XssInspector), { ssr: false, loading: DemoPlaceholder });
const WebStorageDemo = dynamic(() => import("./web-storage").then((m) => m.WebStorageDemo), { ssr: false, loading: DemoPlaceholder });
const ScriptLoading = dynamic(() => import("./script-loading").then((m) => m.ScriptLoading), { ssr: false, loading: DemoPlaceholder });
const HtmlVsXhtml = dynamic(() => import("./html-vs-xhtml").then((m) => m.HtmlVsXhtml), { ssr: false, loading: DemoPlaceholder });
const FeatureDetect = dynamic(() => import("./feature-detect").then((m) => m.FeatureDetect), { ssr: false, loading: DemoPlaceholder });
const CacheBusting = dynamic(() => import("./cache-busting").then((m) => m.CacheBusting), { ssr: false, loading: DemoPlaceholder });
const RestExplorer = dynamic(() => import("./rest-explorer").then((m) => m.RestExplorer), { ssr: false, loading: DemoPlaceholder });
const SpecificityCalculator = dynamic(() => import("./css-demos").then((m) => m.SpecificityCalculator), { ssr: false, loading: DemoPlaceholder });
const FlexPlayground = dynamic(() => import("./css-demos").then((m) => m.FlexPlayground), { ssr: false, loading: DemoPlaceholder });
const SiblingSelectors = dynamic(() => import("./css-demos").then((m) => m.SiblingSelectors), { ssr: false, loading: DemoPlaceholder });
const SpriteSheet = dynamic(() => import("./css-demos").then((m) => m.SpriteSheet), { ssr: false, loading: DemoPlaceholder });
const FocusRing = dynamic(() => import("./css-demos").then((m) => m.FocusRing), { ssr: false, loading: DemoPlaceholder });
const EmRem = dynamic(() => import("./frame-demos").then((m) => m.EmRem), { ssr: false, loading: DemoPlaceholder });
const MediaQueries = dynamic(() => import("./frame-demos").then((m) => m.MediaQueries), { ssr: false, loading: DemoPlaceholder });
const ContrastChecker = dynamic(() => import("./a11y-demos").then((m) => m.ContrastChecker), { ssr: false, loading: DemoPlaceholder });
const PageOutline = dynamic(() => import("./a11y-demos").then((m) => m.PageOutline), { ssr: false, loading: DemoPlaceholder });
const AccessibilityTree = dynamic(() => import("./a11y-demos").then((m) => m.AccessibilityTree), { ssr: false, loading: DemoPlaceholder });
const RouteFocus = dynamic(() => import("./a11y-demos").then((m) => m.RouteFocus), { ssr: false, loading: DemoPlaceholder });
const AltText = dynamic(() => import("./a11y-demos").then((m) => m.AltText), { ssr: false, loading: DemoPlaceholder });
const ReactKeys = dynamic(() => import("./react-demos").then((m) => m.ReactKeys), { ssr: false, loading: DemoPlaceholder });
const LifecycleLog = dynamic(() => import("./react-demos").then((m) => m.LifecycleLog), { ssr: false, loading: DemoPlaceholder });
const LiftState = dynamic(() => import("./react-demos").then((m) => m.LiftState), { ssr: false, loading: DemoPlaceholder });
const ErrorBoundaryDemo = dynamic(() => import("./react-demos").then((m) => m.ErrorBoundaryDemo), { ssr: false, loading: DemoPlaceholder });
const PortalDemo = dynamic(() => import("./react-demos").then((m) => m.PortalDemo), { ssr: false, loading: DemoPlaceholder });
const ContextRenders = dynamic(() => import("./react-demos").then((m) => m.ContextRenders), { ssr: false, loading: DemoPlaceholder });
const RefsLab = dynamic(() => import("./react-demos").then((m) => m.RefsLab), { ssr: false, loading: DemoPlaceholder });

export const DEMOS: Record<DemoId, () => React.ReactNode> = {
  "box-model-3d": () => <BoxModel3D />,
  "event-propagation-3d": () => <EventPropagation3D />,
  "prototype-chain-3d": () => <PrototypeChain3D />,
  "event-loop-sync-async": () => <EventLoop scenario="sync-async" />,
  "event-loop-promises": () => <EventLoop scenario="promises" />,
  "event-loop-async-await": () => <EventLoop scenario="async-await" />,
  "node-event-loop": () => <NodeEventLoop />,
  "promise-lab": () => <PromiseLab />,
  "debounce-throttle": () => <DebounceThrottle />,
  "event-emitter": () => <EventEmitterDemo />,
  "equality-table": () => <EqualityTable />,
  "value-inspector": () => <ValueInspector />,
  "float-bits": () => <FloatBits />,
  "short-circuit": () => <ShortCircuit />,
  "stepper-hoisting": () => <CodeStepper scenario="hoisting" />,
  "stepper-var-let": () => <CodeStepper scenario="var-let" />,
  "stepper-closure": () => <CodeStepper scenario="closure" />,
  "stepper-references": () => <CodeStepper scenario="references" />,
  "stepper-clone": () => <CodeStepper scenario="clone" />,
  "stepper-increment": () => <CodeStepper scenario="increment" />,
  "this-binding": () => <ThisBinding />,
  "recursion-tree": () => <RecursionTree />,
  "pipe-builder": () => <PipeBuilder />,
  "big-o-chart": () => <BigOChart />,
  "function-lab-batches": () => <BatchesLab />,
  "function-lab-mask": () => <MaskLab />,
  "function-lab-anagrams": () => <AnagramsLab />,
  "dom-tree": () => <DomTree />,
  "vdom-diff": () => <VdomDiff />,
  "cors-flow": () => <CorsFlow />,
  "xss-inspector": () => <XssInspector />,
  "web-storage": () => <WebStorageDemo />,
  "script-loading": () => <ScriptLoading />,
  "html-vs-xhtml": () => <HtmlVsXhtml />,
  "feature-detect": () => <FeatureDetect />,
  "cache-busting": () => <CacheBusting />,
  "rest-explorer": () => <RestExplorer />,
  "specificity-calculator": () => <SpecificityCalculator />,
  "flex-playground": () => <FlexPlayground />,
  "em-rem": () => <EmRem />,
  "sibling-selectors": () => <SiblingSelectors />,
  "media-queries": () => <MediaQueries />,
  "sprite-sheet": () => <SpriteSheet />,
  "focus-ring": () => <FocusRing />,
  "contrast-checker": () => <ContrastChecker />,
  "page-outline": () => <PageOutline />,
  "accessibility-tree": () => <AccessibilityTree />,
  "route-focus": () => <RouteFocus />,
  "alt-text": () => <AltText />,
  "react-keys": () => <ReactKeys />,
  "lifecycle-log": () => <LifecycleLog />,
  "lift-state": () => <LiftState />,
  "error-boundary": () => <ErrorBoundaryDemo />,
  portal: () => <PortalDemo />,
  "context-renders": () => <ContextRenders />,
  "refs-lab": () => <RefsLab />,
};

"use client";

/**
 * Labels for the 3D demos, as ordinary DOM over the canvas.
 *
 * drei's <Html> renders each label through a React root of its own, and
 * closing a question unmounts the canvas and those roots in an order that
 * makes React DOM throw. Here the labels are plain elements owned by the
 * demo, and an invisible anchor in the scene moves its label every frame.
 */
import { useCallback, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, type Object3D } from "three";

/** Moves label `index` to (x, y) in a canvas `width` pixels wide. */
export type PlaceLabel = (index: number, point: { x: number; y: number; width: number; visible: boolean }) => void;

const GAP = 6;

/** The demo's side: refs for its label elements, and the function that moves them. */
export function useSceneLabels() {
  const elements = useRef<(HTMLElement | null)[]>([]);

  const place = useCallback<PlaceLabel>((index, { x, y, width, visible }) => {
    const element = elements.current[index];
    if (!element) return;
    // data-align="left" hangs the label to the left of its anchor instead of the right.
    // Either way it is clamped inside the canvas, so a narrow column never clips it.
    const labelWidth = element.offsetWidth;
    const left = element.dataset.align === "left" ? x - labelWidth - GAP : x + GAP;
    const clamped = Math.min(Math.max(left, GAP), Math.max(GAP, width - labelWidth - GAP));
    element.style.transform = `translate(${clamped}px, ${y}px) translateY(-50%)`;
    element.style.visibility = visible ? "visible" : "hidden";
  }, []);

  const labelRef = useCallback(
    (index: number) => (element: HTMLElement | null) => {
      elements.current[index] = element;
    },
    [],
  );

  return { place, labelRef };
}

export interface AnchorProps {
  position: [number, number, number];
  index: number;
  place: PlaceLabel;
}

/** A point in the scene that keeps its label pinned to it on screen. */
export function LabelAnchor({ position, index, place }: Readonly<AnchorProps>) {
  const anchor = useRef<Object3D>(null);
  const { camera, size } = useThree();
  const scratch = useRef<Vector3 | null>(null);

  useFrame(() => {
    if (!anchor.current) return;
    scratch.current ??= new Vector3();
    const point = anchor.current.getWorldPosition(scratch.current).project(camera);
    place(index, { x: ((point.x + 1) / 2) * size.width, y: ((1 - point.y) / 2) * size.height, width: size.width, visible: point.z < 1 });
  });

  return <object3D ref={anchor} position={position} />;
}

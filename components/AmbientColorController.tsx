"use client";
import { useAmbientColor } from "@/hooks/useAmbientColor";

// Renders nothing — exists only to call the ambient-color hook inside a client boundary.
export default function AmbientColorController() {
  useAmbientColor();
  return null;
}

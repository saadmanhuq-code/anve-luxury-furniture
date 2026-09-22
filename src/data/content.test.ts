import { describe, it, expect } from "vitest";
import { PIECES, CATEGORIES, PROJECTS, MATERIALS } from "./content";

describe("Atelier Content Data Integrity", () => {
  it("should contain exactly 12 signature pieces in the atelier book", () => {
    expect(PIECES).toHaveLength(12);
  });

  it("should ensure all pieces have valid architectural dimensions", () => {
    for (const piece of PIECES) {
      expect(piece.id).toBeDefined();
      expect(piece.name).toBeTruthy();
      expect(piece.dimensions).toBeDefined();
      expect(piece.dimensions.metric).toContain("cm");
      expect(piece.dimensions.imperial).toContain("in");
      expect(piece.numericPrice).toBeGreaterThan(0);
      expect(piece.leadTime).toBeTruthy();
      expect(piece.provenance).toBeTruthy();
    }
  });

  it("should ensure each piece has at least 2 finish options with valid color hex tones", () => {
    const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    for (const piece of PIECES) {
      expect(piece.finishes.length).toBeGreaterThanOrEqual(2);
      for (const finish of piece.finishes) {
        expect(finish.name).toBeTruthy();
        expect(["Fabric", "Wood", "Stone", "Metal"]).toContain(finish.type);
        expect(hexRegex.test(finish.tone)).toBe(true);
      }
    }
  });

  it("should verify all categories match recognized atelier types", () => {
    const validCategories = ["Seating", "Tables", "Lighting", "Storage", "Bedroom"];
    for (const piece of PIECES) {
      expect(validCategories).toContain(piece.category);
    }
    expect(CATEGORIES).toEqual(["All", ...validCategories]);
  });

  it("should verify all project references link to actual piece IDs", () => {
    const pieceIds = new Set(PIECES.map((p) => p.id));
    expect(PROJECTS.length).toBeGreaterThanOrEqual(3);

    for (const project of PROJECTS) {
      expect(project.title).toBeTruthy();
      expect(project.story).toBeTruthy();
      expect(project.featuredPieceIds.length).toBeGreaterThan(0);
      for (const id of project.featuredPieceIds) {
        expect(pieceIds.has(id)).toBe(true);
      }
    }
  });

  it("should verify all material references link to actual piece IDs", () => {
    const pieceIds = new Set(PIECES.map((p) => p.id));
    expect(MATERIALS).toHaveLength(4);

    for (const mat of MATERIALS) {
      expect(mat.origin).toBeTruthy();
      expect(mat.tactileDescription).toBeTruthy();
      expect(mat.featuredPieceIds.length).toBeGreaterThan(0);
      for (const id of mat.featuredPieceIds) {
        expect(pieceIds.has(id)).toBe(true);
      }
    }
  });
});

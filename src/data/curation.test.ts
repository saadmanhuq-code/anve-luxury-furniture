import { describe, it, expect } from "vitest";
import { PIECES, type Piece } from "./content";

function calculateTotal(pieces: Piece[]): number {
  return pieces.reduce((sum, p) => sum + p.numericPrice, 0);
}

function formatInvestmentEstimate(pieces: Piece[]): string {
  if (pieces.length === 0) return "$0";
  const total = calculateTotal(pieces);
  return `From $${total.toLocaleString("en-US")}`;
}

function deduplicateCuration(current: Piece[], nextPiece: Piece): Piece[] {
  if (current.some((p) => p.id === nextPiece.id)) {
    return current;
  }
  return [...current, nextPiece];
}

describe("Curation & Investment Calculation Logic", () => {
  it("should calculate correct total investment without floating precision errors", () => {
    const elan = PIECES.find((p) => p.id === "elan")!;
    const meridian = PIECES.find((p) => p.id === "meridian")!;
    const alba = PIECES.find((p) => p.id === "alba")!;

    expect(calculateTotal([elan, meridian, alba])).toBe(4800 + 12400 + 2150);
    expect(calculateTotal([elan, meridian, alba])).toBe(19350);
  });

  it("should format investment range gracefully for empty and multi-piece curations", () => {
    expect(formatInvestmentEstimate([])).toBe("$0");

    const single = [PIECES[0]];
    expect(formatInvestmentEstimate(single)).toBe(`From $${single[0].numericPrice.toLocaleString("en-US")}`);

    const all = PIECES;
    const allTotal = PIECES.reduce((acc, p) => acc + p.numericPrice, 0);
    expect(formatInvestmentEstimate(all)).toBe(`From $${allTotal.toLocaleString("en-US")}`);
  });

  it("should prevent duplicate entries when adding an already curated piece", () => {
    const piece = PIECES[0];
    let curated: Piece[] = [];

    curated = deduplicateCuration(curated, piece);
    expect(curated).toHaveLength(1);

    // Attempt adding again
    curated = deduplicateCuration(curated, piece);
    expect(curated).toHaveLength(1);
    expect(curated[0].id).toBe(piece.id);
  });

  it("should allow removing pieces cleanly by ID", () => {
    const list = [PIECES[0], PIECES[1], PIECES[2]];
    const filtered = list.filter((p) => p.id !== PIECES[1].id);

    expect(filtered).toHaveLength(2);
    expect(filtered.map((p) => p.id)).toEqual([PIECES[0].id, PIECES[2].id]);
  });
});

import { describe, it, expect } from "vitest";

function validateInquiryForm(form: {
  name: string;
  email: string;
  message: string;
}) {
  const errors: Record<string, string> = {};
  if (form.name.trim().length < 2) {
    errors.name = "Please share your full name";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "A valid email lets us reply";
  }
  if (form.message.trim().length < 10) {
    errors.message = "A few words about your project (min. 10 characters)";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function generateReferenceCode(id: number): string {
  return `ANVÉ-${String(id).padStart(4, "0")}`;
}

describe("Inquiry Validation and Reference Code Generator", () => {
  it("should validate a complete and correct form submission", () => {
    const valid = {
      name: "Jean-Paul Dupont",
      email: "jp.dupont@architectural-paris.fr",
      message: "We are designing a private duplex near Parc Monceau and would like to review the Colline table.",
    };
    const res = validateInquiryForm(valid);
    expect(res.isValid).toBe(true);
    expect(res.errors).toEqual({});
  });

  it("should reject short or whitespace-only names", () => {
    const invalid = {
      name: " A ",
      email: "valid@email.com",
      message: "We are designing a salon.",
    };
    const res = validateInquiryForm(invalid);
    expect(res.isValid).toBe(false);
    expect(res.errors.name).toBeTruthy();
  });

  it("should reject invalid email formats", () => {
    const badEmails = [
      "invalid-email",
      "user@",
      "@domain.com",
      "user@domain",
      "user @domain.com",
    ];

    for (const email of badEmails) {
      const res = validateInquiryForm({
        name: "Alexandra Moreau",
        email,
        message: "Commissioning furniture for a villa.",
      });
      expect(res.isValid).toBe(false);
      expect(res.errors.email).toBeTruthy();
    }
  });

  it("should reject messages under 10 characters", () => {
    const res = validateInquiryForm({
      name: "Alexandra Moreau",
      email: "alex@moreau.com",
      message: "Hello",
    });
    expect(res.isValid).toBe(false);
    expect(res.errors.message).toBeTruthy();
  });

  it("should format consistent atelier reference codes", () => {
    expect(generateReferenceCode(7)).toBe("ANVÉ-0007");
    expect(generateReferenceCode(42)).toBe("ANVÉ-0042");
    expect(generateReferenceCode(1234)).toBe("ANVÉ-1234");
    expect(/^ANVÉ-\d{4,}$/.test(generateReferenceCode(99))).toBe(true);
  });
});

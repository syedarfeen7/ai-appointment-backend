export type ParsedIdentifier = { email: string } | { phoneNumber: string };

export const parseIdentifier = (identifier: string): ParsedIdentifier => {
  const value = identifier.trim();

  if (value.includes("@")) {
    return { email: value.toLowerCase() };
  }

  // basic phone normalization (extend later)
  const phone = value.replace(/\s|-/g, "");

  return { phoneNumber: phone };
};

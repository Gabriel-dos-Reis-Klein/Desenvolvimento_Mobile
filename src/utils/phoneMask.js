export function formatPhone(value = '') {
  const cleaned = value.replace(/\D/g, '');

  const trimmed = cleaned.slice(0, 11);

  if (trimmed.length <= 2) {
    return trimmed;
  }

  if (trimmed.length <= 6) {
    return `(${trimmed.slice(0, 2)}) ${trimmed.slice(2)}`;
  }

  if (trimmed.length <= 10) {
    return `(${trimmed.slice(0, 2)}) ${trimmed.slice(2, 6)}-${trimmed.slice(6)}`;
  }

  return `(${trimmed.slice(0, 2)}) ${trimmed.slice(2, 7)}-${trimmed.slice(7)}`;
}
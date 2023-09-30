export function isFormValid(point) {
  return point.destination !== ''
    && point.basePrice > 0
    && point.dateFrom !== undefined
    && point.dateTo !== undefined;
}

export function isEscapeKeydown(key) {
  return key === 'Escape';
}

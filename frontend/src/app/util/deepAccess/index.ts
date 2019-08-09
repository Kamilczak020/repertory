export function deepAccess(func: Function, fallbackValue: any) {
  try {
      var value = func();
      return (value === null || value === undefined) ? fallbackValue : value;
  } catch (e) {
      return fallbackValue;
  }
}
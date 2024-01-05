export function recursiveAssign(a: any, b: any) {
  if (Object(b) !== b) return b;
  if (Object(a) !== a) a = {};
  for (let key in b) {
      a[key] = recursiveAssign(a[key], b[key]);
  }
  return a;
}
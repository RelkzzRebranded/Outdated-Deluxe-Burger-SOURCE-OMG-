export function validateVector3(vector3: Vector3): boolean {
  if (!typeIs(vector3, 'Vector3')) {
    return false;
  }

  if (vector3 !== vector3) {
    return false;
  }

  return true;
}

export function validateCFrame(cframe: CFrame): boolean {
  if (!typeIs(cframe, 'CFrame')) return false;

  if (!validateVector3(cframe.Position)) return false;
  if (!validateVector3(cframe.LookVector)) return false;

  return true;
}

export function validateInstance(instance: Instance, expectedClass: keyof Objects): boolean {
  if (!typeIs(instance, 'Instance')) return false;

  return instance.IsA(expectedClass);
}

export function validateNumber(number: number): boolean {
  if (!typeIs(number, 'number')) {
    return false;
  }

  if (number !== number) {
    return false;
  }

  return true;
}

export function validateSimpleTable(
  tbl: Map<any, any>,
  keyType: keyof CheckableTypes,
  validator: (arg0: any) => boolean,
): boolean {
  if (!typeIs(tbl, 'table')) return false;

  for (const [key, value] of tbl) {
    if (!typeIs(key, keyType)) return false;
    if (!validator(value)) return false;
  }
  return true;
}

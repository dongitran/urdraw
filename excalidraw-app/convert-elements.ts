export const keyOrder = [
  "type",
  "version",
  "versionNonce",
  "index",
  "isDeleted",
  "id",
  "fillStyle",
  "strokeWidth",
  "strokeStyle",
  "roughness",
  "opacity",
  "angle",
  "x",
  "y",
  "strokeColor",
  "backgroundColor",
  "width",
  "height",
  "seed",
  "groupIds",
  "frameId",
  "roundness",
  "boundElements",
  "updated",
  "link",
  "locked",
  "startBinding",
  "endBinding",
  "lastCommittedPoint",
  "startArrowhead",
  "endArrowhead",
  "points",
  "fontSize",
  "fontFamily",
  "text",
  "textAlign",
  "verticalAlign",
  "containerId",
  "originalText",
  "autoResize",
  "lineHeight",
  "name",
  "simulatePressure",
  "pressures"
];

type ObjectWithAnyValues = {
  [key: string]: any;
};

// Function to convert object to array based on specified key order
export function objectToArrayOrdered(obj: any): any[] {
  return keyOrder.map((key) => obj[key]);
}

// Function to convert array back to object based on specified key order
export function arrayToObjectOrdered(arr: any[]): ObjectWithAnyValues {
  const obj: ObjectWithAnyValues = {};
  keyOrder.forEach((key, index) => {
    obj[key] = arr[index];
  });
  return obj;
}

// Without interface
{
  const text: string = "hello";
  const num: number = 7;
  const list: string[] = [text, "world"];
  const obj: Record<string, unknown> = {
    fieldStr: "unknown",
    fieldNum: 9,
    fieldList: list,
  };
}

// Type Inference
{
  const text = "hello";
  const num = 7;
  const list = [text, "world"];

  const text2: string = text;
  const num2: number = num;
  const list2: string[] = list;

  // const numBad: number = text;
  // let tex = "hello";
  // tex = null;
}

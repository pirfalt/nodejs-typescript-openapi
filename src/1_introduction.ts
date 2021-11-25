function Declared_Types() {
  const text: string = "hello";

  const num: number = 7;

  const list1: string[] = [text, "world"];
  const list2: Array<string> = [text, "world"];

  const obj: Record<string, unknown> = {
    fieldStr: "unknown",
    fieldNum: 9,
    fieldList: list1,
  };
}

function Type_Inference() {
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

function printRequiredString(str: string) {
  console.log(str);
}

function printOptionalString(str?: string) {
  console.log(str);
}

function Type_Checks() {
  type StringOrNumber = string | number;
  const str: StringOrNumber = "text";
  const num: StringOrNumber = 9000;
  // const empty: StringOrNumber = null;
  // const empty: StringOrNumber = undefined;

  type OptionalString = string | undefined;
  const opt: OptionalString = Math.random() > 0.5 ? "Lucky" : undefined;
  // const opt1: OptionalString;
  // const opt2: OptionalString = null

  // printRequiredString(opt);
  // printOptionalString(opt);

  if (opt != null) {
    printRequiredString(opt);
  }

  if (opt == null) {
    return;
  }
  printRequiredString(opt);
}

function Constant_Types() {
  const getStatus = (): StatusCode => "200"; //Helper

  // StatusCode
  type StatusCode = "200" | "400" | "500";
  const status: StatusCode = getStatus();

  // Handle _every_ status case
  switch (status) {
    case "200":
      printRequiredString("OK");
      break;
    case "400":
      printRequiredString("BadRequest");
      break;
    case "500":
      printRequiredString("InternalError");
      break;
    default:
      impossible(status);
  }
}
function impossible(arg: never) {}

function Object_Required_Fields() {
  type HasId = {
    id: number;
  };
  type AnyObj = Record<string, unknown>;

  const obj: AnyObj = {
    id: 1,
    moreStuff: true,
  };

  // const inValid1: HasId = {
  //   id: 1,
  //   moreStuff: true,
  // };

  // Object merging
  type ObjectWithId = AnyObj & HasId;

  const valid: ObjectWithId = {
    id: 1,
    moreStuff: true,
  };

  // const inValid2: ObjectWithId = {
  //   moreStuff: true,
  // };
}

function Discriminating_Unions() {
  const getResponse = <T>(arg: T): Response<T> => ({
    status: "OK",
    value: arg,
  }); // Helper

  type Response<T> =
    | {
        status: "OK";
        value: T;
      }
    | {
        status: "BadRequest";
        error: Error;
      }
    | {
        status: "InternalError";
      };

  const resp = getResponse("Hello");

  // const value = resp.value;
  // const error = resp.error;

  // Handle _every_ status case
  switch (resp.status) {
    case "OK":
      printRequiredString(resp.value);
      break;
    case "BadRequest":
      printRequiredString(resp.error.message);
      break;
    case "InternalError":
      printRequiredString("Got nothing from 'resp'");
      break;
    default:
      impossible(resp);
  }
}

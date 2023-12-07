import { USER_ROLE } from "../constants";

export const checkRole = (values: Array<string>) => {
  let condition = false;

  values.forEach((val) => {
    if (USER_ROLE === val) {
      condition = true;
    }
  });
  return condition;
};
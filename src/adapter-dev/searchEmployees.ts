import { EmployeeListItem } from "../domain/EmployeeListItem";
import employees from "./employees.json";
import delay from "delay";

export default async function searchEmployees(
  name: string
): Promise<EmployeeListItem[]> {
  // Set delay so devs can see loading state.
  await delay(1000);

  const fullList = employees as EmployeeListItem[];

  if (!name) {
    return Promise.resolve(fullList);
  }

  // Dev repository methods do not need to be logical. i.e., results dont have to match search text.
  // Instead we just need some quick/simple code that allows us to see what the screen looks like with all/some/none results.
  return fullList.filter((_, index) => index < fullList.length - name.length);
}

import { EmployeeListItem } from "../domain/EmployeeListItem";
import employees from "./employees.json";

export default function searchEmployees(name: string): Promise<EmployeeListItem[]> {
    const fullList = employees as EmployeeListItem[];

    if (!name) {
        return Promise.resolve(fullList);
    }

    // Dev repository methods do not need to be logical. i.e., results dont have to match search text.
    // Instead we just need some quick/simple code that allows us to see what the screen looks like with all/some/none results.
    return Promise.resolve(fullList.filter((_, index) => index < fullList.length - name.length));
}

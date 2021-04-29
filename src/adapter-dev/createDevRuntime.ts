import { Runtime } from "../runtime/Runtime";
import getEmployeeRepository from "./getEmployeeRepository";

export default function createDevRuntime(): Runtime {
    return {getEmployeeRepository};
}
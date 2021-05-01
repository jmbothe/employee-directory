import { Runtime } from "../domain/Runtime";
import getAppConfig from "./getAppConfig";
import getEmployeeRepository from "./getEmployeeRepository";

export default function createDevRuntime(): Runtime {
    return {getEmployeeRepository, getAppConfig};
}
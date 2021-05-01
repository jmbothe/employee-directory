import { AppConfig } from "../domain/AppConfig";

export default function getAppConfig(): AppConfig {
    return {
        textInputDebounce: 500
    }
}

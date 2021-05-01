import { createContext } from 'react';
import { Runtime } from '../domain/Runtime';

// Runtime is defined dependent on host env, i.e. dev/prod.
// Prefer to ignore this one error, rather than turn off strict null checks everywhere.
// @ts-ignore
const RuntimeContext = createContext<Runtime>(undefined);

export default RuntimeContext;

import { createContext } from 'react';
import { Runtime } from '../domain/Runtime';

const RuntimeContext = createContext<Runtime | undefined>(undefined);

export default RuntimeContext;

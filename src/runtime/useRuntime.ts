import { useContext } from 'react';
import { Runtime } from '../domain/Runtime';
import RuntimeContext from './RuntimeContext';

export default function useRuntime(): Runtime {
    const runtime = useContext(RuntimeContext);

    if (!runtime) {
        throw new Error("No runtime was found in App context.");
    }

    return runtime;
}
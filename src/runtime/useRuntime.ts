import { useContext } from 'react';
import RuntimeContext from './RuntimeContext';

export default function useRuntime() {
    return useContext(RuntimeContext);
}
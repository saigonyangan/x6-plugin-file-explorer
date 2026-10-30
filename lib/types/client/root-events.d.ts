/** Notify explorer UI after the Host workspace root is re-pinned. */
type RootListener = () => void;
/** Subscribe to successful session/root pins. */
export declare function subscribeRootPinned(listener: RootListener): () => void;
/** Fire after `setRoot` succeeds so the tree reloads against the new cwd. */
export declare function notifyRootPinned(): void;
export {};
//# sourceMappingURL=root-events.d.ts.map
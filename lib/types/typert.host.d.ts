/**
 * Hand-written Host Typert face for packages outside the engine generator graph.
 * Loaded via package.json exports["./typert"].
 *
 * Must be self-contained: the loader imports this file alone from the packed
 * package (package.json `files` may omit other lib/types/*.js modules).
 */
/** Host Typert contribution consumed by typert-loader. */
export declare const TYPERT: {
    package: string;
    face: "host";
    schemas: never[];
    model: {
        services: never[];
        events: never[];
        objects: never[];
    };
    invocations: {
        id: string;
        service: string;
        namespace: string;
        method: string;
        invocation: {
            kind: "direct";
        };
        parameters: {
            name: string;
            wire: string;
            source: "json";
            codec: {
                mode: "strict";
                typeSymbol: string;
                create: () => any;
            };
        }[];
        result: {
            mode: "strict";
            typeSymbol: string;
            create: () => z.ZodType;
        };
        sourceLocation: {
            file: string;
            line: number;
            column: number;
        };
    }[];
};
export default TYPERT;
//# sourceMappingURL=typert.host.d.ts.map
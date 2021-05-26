export const signatureFields: string[];
export const extractors: {
    '(request-target)': (req: any) => string;
    '(created)': (req: any) => number;
    '(expires)': (req: any) => number;
    'Content-Type': (req: any) => any;
    'Content-Length': (req: any) => any;
    Digest: (req: any) => any;
    Date: (req: any) => any;
    Host: ({ url }: {
        url: any;
    }) => any;
};
export const transformers: {
    Digest: (key: any, value: any) => any[];
};
export const constructSignatureString: (request: any, opts: any) => string;
export const constructSignature: (secret: any, algorithm: any, input: any) => string;
export const outputHandler: (request: any, fields: any, signature: any) => any;
export declare const algorithm: string;
export declare const signingAlgorithm: string;

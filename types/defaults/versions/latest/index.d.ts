declare const _exports: {
    constructSignatureString: (request: any, opts: any) => string;
    constructSignature: (secret: any, algorithm: any, input: any) => string;
    outputHandler: (request: any, fields: any, signature: any) => any;
    transformers: {
        Digest: (key: any, value: any) => any[];
    };
    extractors: {
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
    signatureFields: string[];
};
export = _exports;

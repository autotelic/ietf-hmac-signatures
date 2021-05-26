declare const _exports: {
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
export = _exports;

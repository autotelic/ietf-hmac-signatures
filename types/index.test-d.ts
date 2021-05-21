import { SignatureOptions, RequestObject } from '.'
import { expectType, expectError } from 'tsd'

// should be able to construct an empty options object
expectType(<SignatureOptions>({}))

// should be able to construct a partial options object
expectType(<SignatureOptions>({
    secret: 'mock-secret',
    keyId: 'key-a',
    signatureFields: ['(request-target)', '(created)', '(expires)', 'Host', 'Digest', 'Content-Type']
}))

// should be able to construct an empty request object
expectType(<RequestObject>({}))

// should be able to construct a partial request object
expectType(<RequestObject>({
    url: 'http://test.com/endpoint',
    method: 'POST',
    body: JSON.stringify({ hello: 'world' }),
    headers: {
        foo: 'bar',
        biz: 5,
    }
}))

// should have a type error when a header is added of the incorrect type
expectError<RequestObject>({
    url: 'http://test.com/endpoint',
    method: 'POST',
    body: JSON.stringify({ hello: 'world' }),
    headers: {
        foo: {}
    }
})

// /**
//  * Options for the OpenTelemetry plugin.
//  */
// export interface OpenTelemetryPluginOptions {
//   readonly serviceName?: string,
//   readonly exposeApi?: boolean,
//   readonly formatSpanName?: (serviceName: string, raw: FastifyRequest['raw']) => string,
//   readonly formatSpanAttributes?: {
//     readonly request?: (request: FastifyRequest) => SpanAttributes,
//     readonly reply?: (reply: FastifyReply) => SpanAttributes,
//     readonly error?: (error: Error) => SpanAttributes,
//   },
//   readonly wrapRoutes?: boolean | string[],
//   readonly ignoreRoutes?: string[],
// }

// declare const fastifyOpenTelemetry: FastifyPluginCallback<OpenTelemetryPluginOptions>

// export default fastifyOpenTelemetry

declare module '@autotelic/ietf-hmac-signatures' {
    const noTypesYet: any
    export default noTypesYet
  }

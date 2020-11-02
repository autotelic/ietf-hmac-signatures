function defaultTransformer (key, value) {
  return [key, value]
}

module.exports = function processor (request, field, extractors, transformers) {
  const extractor = extractors[field]
  const transformer = transformers[field] || defaultTransformer
  const fieldValue = extractor(request)
  return transformer(field, fieldValue)
}

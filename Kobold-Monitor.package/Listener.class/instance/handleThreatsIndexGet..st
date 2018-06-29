route handlers
handleThreatsIndexGet: req
  ^NeoJSONWriter toStringPretty: reports 
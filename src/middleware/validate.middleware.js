const validate = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    // Replace validated body and params.
    if (validatedData.body) {
      req.body = validatedData.body;
    }

    if (validatedData.params) {
      req.params = validatedData.params;
    }

    // Do not assign to req.query in Express 5.
    // Validation has already been performed by schema.parse().
    next();
  } catch (error) {
    const issues = error.issues ?? error.errors ?? [];

    console.error("Request validation failed:", {
      method: req.method,
      path: req.originalUrl,
      issues,
    });

    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
        code: issue.code,
      })),
    });
  }
};

export default validate;
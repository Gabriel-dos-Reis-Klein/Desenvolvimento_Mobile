export function validateSchema(
  schema,
  data
) {

  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      errors: {},
      data: result.data,
    };
  }

  const errors = {};

  result.error.issues.forEach(
    (issue) => {

      const field = issue.path[0];

      if (!errors[field]) {
        errors[field] =
          issue.message;
      }

    }
  );

  return {
    success: false,
    errors,
  };
}
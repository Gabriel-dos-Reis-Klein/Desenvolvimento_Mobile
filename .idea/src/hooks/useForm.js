import { useState, useCallback } from 'react';
import { ZodError } from 'zod';

export function useForm(schema, initialValues) {
  const [values, setValues] = useState(() => initialValues);
  const [errors, setErrors] = useState({});

  const setField = useCallback((name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  }, []);

  const validate = useCallback(() => {
    try {
      const data = schema.parse(values);

      setErrors({});
      return data;
    } catch (err) {
      if (err instanceof ZodError) {
        const formatted = {};

        err.issues.forEach((issue) => {
          const field = issue.path[0];
          if (!formatted[field]) {
            formatted[field] = issue.message;
          }
        });

        setErrors(formatted);
      }

      return false;
    }
  }, [schema, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    setField,
    validate,
    reset,
  };
}
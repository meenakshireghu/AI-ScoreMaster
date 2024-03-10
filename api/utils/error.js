
export const errorHandler = (err) => {
    const { name, message, stack } = err;
    return { name, message, stack };
  };
export const isApiError = (
    error: unknown
  ): error is { response: { data: { message: string } } } => {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const response = (error as Record<string, unknown>).response;
      if (
        typeof response === "object" &&
        response !== null &&
        "data" in response
      ) {
        const data = (response as Record<string, unknown>).data;
        if (
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof data.message === "string"
        ) {
          return true;
        }
      }
    }
    return false;
  };
  
type EndpointParamValue = string | number | boolean | null | undefined;

export const endpointParamsBuilder = ({
  params,
  endpoint,
}: {
  params?: Record<string, EndpointParamValue>;
  endpoint: string;
}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    searchParams.set(key, String(value));
  });

  const queryString = searchParams.toString();

  return queryString ? `${endpoint}?${queryString}` : endpoint;
};

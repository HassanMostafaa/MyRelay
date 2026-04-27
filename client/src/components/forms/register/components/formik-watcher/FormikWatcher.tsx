import { useFormikContext } from "formik";
import { useEffect } from "react";

export const FormikWatcher = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values } = useFormikContext<any>();

  useEffect(() => {
    console.log("Formik values:", values);
  }, [values]);

  return null;
};

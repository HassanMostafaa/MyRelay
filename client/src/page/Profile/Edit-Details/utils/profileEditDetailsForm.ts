import type { EditableUserFields, User } from "@/src/services/users/utils/types";

export type ProfileEditDetailsValues = {
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  city: string;
  date_of_birth: string;
  address: string;
};

const editableFieldNames = [
  "first_name",
  "last_name",
  "phone",
  "country",
  "city",
  "date_of_birth",
  "address",
] as const;

const normalizeTextValue = (value: string | null | undefined) => value?.trim() ?? "";

const normalizeDateValue = (value: string | null | undefined) => {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
};

const normalizeComparableValues = (values: ProfileEditDetailsValues) => ({
  ...values,
  first_name: normalizeTextValue(values.first_name),
  last_name: normalizeTextValue(values.last_name),
  phone: normalizeTextValue(values.phone),
  country: normalizeTextValue(values.country),
  city: normalizeTextValue(values.city),
  address: normalizeTextValue(values.address),
  date_of_birth: normalizeDateValue(values.date_of_birth),
});

const normalizeOptionalValue = (value: string) => {
  const normalized = value.trim();

  return normalized.length > 0 ? normalized : null;
};

export const getProfileEditDetailsInitialValues = (
  user: User,
): ProfileEditDetailsValues => ({
  first_name: normalizeTextValue(user.first_name),
  last_name: normalizeTextValue(user.last_name),
  phone: normalizeTextValue(user.phone),
  country: normalizeTextValue(user.country),
  city: normalizeTextValue(user.city),
  date_of_birth: normalizeDateValue(user.date_of_birth),
  address: normalizeTextValue(user.address),
});

export const hasProfileEditDetailsChanges = (
  values: ProfileEditDetailsValues,
  user: User,
) => {
  const currentValues = normalizeComparableValues(
    getProfileEditDetailsInitialValues(user),
  );
  const nextValues = normalizeComparableValues(values);

  return editableFieldNames.some(
    (field) => currentValues[field] !== nextValues[field],
  );
};

export const getProfileEditDetailsChangedFields = (
  values: ProfileEditDetailsValues,
  user: User,
): Partial<EditableUserFields> => {
  const currentValues = normalizeComparableValues(
    getProfileEditDetailsInitialValues(user),
  );
  const nextValues = normalizeComparableValues(values);
  const changedFields: Partial<EditableUserFields> = {};

  editableFieldNames.forEach((field) => {
    if (currentValues[field] === nextValues[field]) {
      return;
    }

    switch (field) {
      case "first_name":
        changedFields.first_name = nextValues.first_name;
        return;
      case "last_name":
        changedFields.last_name = nextValues.last_name;
        return;
      case "phone":
        changedFields.phone = normalizeOptionalValue(nextValues.phone);
        return;
      case "country":
        changedFields.country = normalizeOptionalValue(nextValues.country);
        return;
      case "city":
        changedFields.city = normalizeOptionalValue(nextValues.city);
        return;
      case "date_of_birth":
        changedFields.date_of_birth = nextValues.date_of_birth || null;
        return;
      case "address":
        changedFields.address = normalizeOptionalValue(nextValues.address);
        return;
    }
  });

  return changedFields;
};

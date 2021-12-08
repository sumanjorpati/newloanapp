import Input from "@components/ui/input";
import { Control, FieldErrors, useForm } from "react-hook-form";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import Label from "@components/ui/label";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import * as categoriesIcon from "@components/icons/category";
import { getIcon } from "@utils/get-icon";
import { useRouter } from "next/router";
import { getErrorMessage } from "@utils/form-error";
import ValidationError from "@components/ui/form-validation-error";
import { useTranslation } from "next-i18next";
import SelectInput from "@components/ui/select-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyValidationSchema } from "./company-validation-schema";
import { useCreateCompanyMutation } from "@data/company/use-company-create.mutation";
import { useUpdateCompanyMutation } from "@data/company/use-company-update.mutation";

// function SelectTypes({
//   control,
//   errors,
// }: {
//   control: Control<FormValues>;
//   errors: FieldErrors;
// }) {
//   const { t } = useTranslation();
//   const { data: types, isLoading: loading } = useTypesQuery();
//   return (
//     <div className="mb-5">
//       <Label>{t("form:input-label-types")}</Label>
//       <SelectInput
//         name="type"
//         control={control}
//         getOptionLabel={(option: any) => option.name}
//         getOptionValue={(option: any) => option.slug}
//         options={types?.types!}
//         isLoading={loading}
//       />
//       <ValidationError message={t(errors.type?.message)} />
//     </div>
//   );
// }


type FormValues = {
  name: string;
  address: string;
  phoneNumber: string;
  description: string;
  createdBy: string
};

const defaultValues = {
  name: "",
  address: "",
  description: "",
  phoneNumber:"",
  createdBy: 1,
};

type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdateCompanyForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : defaultValues,

    resolver: yupResolver(companyValidationSchema),
  });

  const { mutate: createCompany, isLoading: creating } = useCreateCompanyMutation();
  const { mutate: updateCompany, isLoading: updating } = useUpdateCompanyMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name,
      address: values.address,
      phoneNumber: values.phoneNumber,
      description:values.description,
      createdBy: values.createdBy,
    };
    try {
      if (initialValues) {
        updateCompany({
          variables: {
            id: initialValues?.id!,
            input: {
              ...input,
            },
          },
        });
      } else {
        createCompany({
          variables: {
            input,
          },
        });
      }
    } catch (err) {
      getErrorMessage(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:input-label-description")}
          details={`${
            initialValues
              ? t("form:item-description-edit")
              : t("form:item-description-add")
          } ${t("form:tag-description-helper-text")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("form:input-label-name")}
            {...register("name")}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />

          <Input
          label={t("form:input-label-address")}
          {...register("address")}
          error={t(errors.address?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t("form:input-label-phone-number")}
          {...register("phoneNumber")}
          error={t(errors.phoneNumber?.message!)}
          variant="outline"
          className="mb-5"
        />
          <TextArea
            label={t("form:input-label-details")}
            {...register("description")}
            variant="outline"
            className="mb-5"
          />

        </Card>
      </div>
      <div className="mb-4 text-end">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t("form:button-label-back")}
          </Button>
        )}

        <Button loading={creating || updating}>
          {initialValues
            ? t("form:button-label-update-company")
            : t("form:button-label-add-company")}
        </Button>
      </div>
    </form>
  );
}

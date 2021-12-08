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
import {Company as TCompany}  from "@ts-types/generated";
import PasswordInput from "@components/ui/password-input";
import { clockInValidationSchema } from "./clock-in-validation-schema";
import ValidationError from "@components/ui/form-validation-error";
import { useTranslation } from "next-i18next";
import SelectInput from "@components/ui/select-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateClockInMutation } from "@data/clock-in/use-clock-in-create.mutation";
import { useUpdateClockInMutation } from "@data/clock-in/use-clock-in-update.mutation";
import { useCompaniesActiveList } from "@data/company/use-companies-list.query";

function SelectCompanies({
  control,
  errors,
}: {
  control: Control<FormValues>;
  errors: FieldErrors;
}) {
  const { t } = useTranslation();
  
  const { data: companies, isLoading: loading } = useCompaniesActiveList();
  return (
    <div className="mb-5">
      <Label>{t("form:input-label-companies")}</Label>
      <SelectInput
        name="company"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        options={companies?.companies!}
        isLoading={loading}
      />
      <ValidationError message= {t(errors.type?.message)}  />
    </div>
  );
}


type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  description: string;
  userName: string;
  password: string;
  createdBy: string;
  company: any,
};

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  contact: '',
  description: '',
  userName: '',
  password: '',
  createdBy: '',
  company: null,
};

type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdateClockInForm({ initialValues }: IProps) {
  
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

    resolver: yupResolver(clockInValidationSchema),
  });

  const { mutate: createClockIn, isLoading: creating } = useCreateClockInMutation();
  const { mutate: updateClockIn, isLoading: updating } = useUpdateClockInMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      contact:values.contact,
      description: values.description,
      userName: values.userName,
      password: values.password,
      company: values.company,
    };
    try {
      if (initialValues) {
        updateClockIn({
          variables: {
            id: initialValues?.id!,
            input: {
              ...input,
              company: input.company.id
            },
          },
        });
      } else {
        createClockIn({
          variables: {
            input:{
              ...input,
              company: input.company.id
            },
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
        
          <SelectCompanies control={control} errors={errors} />
          <Input
            label={t("form:input-label-name")}
            {...register("firstName")}
            error={t(errors.firstName?.message!)}
            variant="outline"
            className="mb-5"
          />

          <Input
          label={t("form:input-label-address")}
          {...register("lastName")}
          error={t(errors.lastName?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t("form:input-label-contact")}
          {...register("contact")}
          error={t(errors.contact?.message!)}
          variant="outline"
          className="mb-5"
        /><Input
        label={t("form:input-label-email")}
        {...register("email")}
        error={t(errors.email?.message!)}
        variant="outline"
        className="mb-5"
      /><Input
      label={t("form:input-label-username")}
      {...register("userName")}
      error={t(errors.userName?.message!)}
      variant="outline"
      className="mb-5"
    />
              <PasswordInput
            label={t("form:input-label-confirm-password")}
            {...register("password")}
            variant="outline"
            error={t(errors.password?.message!)}
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
            ? t("form:button-label-update-clockIn")
            : t("form:button-label-add-clockIn")}
        </Button>
      </div>
    </form>
  );
}

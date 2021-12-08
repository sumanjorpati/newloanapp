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
import { customerValidationSchema } from "./customer-validation-schema";
import ValidationError from "@components/ui/form-validation-error";
import { useTranslation } from "next-i18next";
import SelectInput from "@components/ui/select-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateCustomerMutation } from "@data/customer/use-customer-create.mutation";
import { useUpdateCustomerMutation } from "@data/customer/use-customer-update.mutation";
import { useCompaniesActiveList } from "@data/company/use-companies-list.query";
import { getAdminId, getAuthCredentials, getCompanyId, getUserId } from "@utils/auth-utils";

// function SelectCompanies({
//   control,
//   errors,
// }: {
//   control: Control<FormValues>;
//   errors: FieldErrors;
// }) {
//   const { t } = useTranslation();
  
//   const { data: companies, isLoading: loading } = useCompaniesActiveList();
//   return (
//     <div className="mb-5">
//       <Label>{t("form:input-label-companies")}</Label>
//       <SelectInput
//         name="company"
//         control={control}
//         getOptionLabel={(option: any) => option.name}
//         getOptionValue={(option: any) => option.id}
//         options={companies?.companies!}
//         isLoading={loading}
//       />
//       <ValidationError message= {t(errors.type?.message)}  />
//     </div>
//   );
// }


type FormValues = {
  firstName: string;
  lastName: string;
  address: string;
  contact: string;
  notes: string;
  createdBy: string;
  company: any,
};

const defaultValues = {
  firstName: '',
  lastName: '',
  address: '',
  contact: '',
  notes: '',
  createdBy: '',
  company: null,
};

type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdateCustomerForm({ initialValues }: IProps) {
  const adminId = getAdminId();
  const companyId = getCompanyId();
  const userId = getUserId();
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

    resolver: yupResolver(customerValidationSchema),
  });

  const { mutate: createCustomer, isLoading: creating } = useCreateCustomerMutation();
  const { mutate: updateCustomer, isLoading: updating } = useUpdateCustomerMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      firstName: values.firstName,
      lastName: values.lastName,
      address: values.address,
      contact:values.contact,
      notes: values.notes,
      company: values.company,
      createdBy: values.createdBy,
    };
    try {
      if (initialValues) {
        updateCustomer({
          variables: {
            id: initialValues?.id!,
            input: {
              ...input,
              company: companyId,
              createdBy: userId
            },
          },
        });
      } else {
        createCustomer({
          variables: {
            input:{
              ...input,
              company: companyId,
              createdBy: userId,
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
        label={t("form:input-label-address")}
        {...register("address")}
        error={t(errors.address?.message!)}
        variant="outline"
        className="mb-5"
      />
          <TextArea
            label={t("form:input-label-details")}
            {...register("notes")}
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
            ? t("form:button-label-update-customer")
            : t("form:button-label-add-customer")}
        </Button>
      </div>
    </form>
  );
}

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
import { loanIssuedValidationSchema } from "./loan-issued-validation-schema";
import ValidationError from "@components/ui/form-validation-error";
import { useTranslation } from "next-i18next";
import SelectInput from "@components/ui/select-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateLoanIssueMutation } from "@data/loan-issue/use-loan-issue-create.mutation";
import { useUpdateLoanIssueMutation } from "@data/loan-issue/use-loan-issue-update.mutation";
import { getAuthCredentials } from "@utils/auth-utils";
import { useCustomersActiveList } from "@data/customer/use-customers-list.query";
import { useLoanDueQuery } from "@data/loan-issue/use-loan-due.query";

function SelectCustomers({
  control,
  errors,
}: {
  control: Control<FormValues>;
  errors: FieldErrors;
}) {
  const { t } = useTranslation();
  
  const { data: customers, isLoading: loading } = useCustomersActiveList();
  return (
    <div className="mb-5">
      <Label>{t("form:input-label-customers")}</Label>
      <SelectInput
        name="customer"
        control={control}
        getOptionLabel={(option: any) => option.firstName +' '+ option.lastName}
        getOptionValue={(option: any) => option.id}
        options={customers?.customers!}
        isLoading={loading}
      />
      <ValidationError message= {t(errors.type?.message)}  />
    </div>
  );
}


type FormValues = {
  customer: string;
  loanAmount: string;
  notes: string;
  createdBy: string;
  company: string;
  employee: string;
  shift: string;
};

const defaultValues = {
  customer: '',
  loanAmount: '',
  notes: '',
  employee: '',
  company: '',
  shift: ''
};


type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdateLoanIssuedForm({ initialValues }: IProps) {
  const {companyId,employeeId,userId,shiftId} = getAuthCredentials()
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

   // resolver: yupResolver(loanIssuedValidationSchema),
  });
  console.log('defaultValues',defaultValues.customer  )
  const {
    data,
    isLoading: loading,
    error,
  } = useLoanDueQuery( defaultValues.customer as string);
  const { mutate: createLoanIssued, isLoading: creating } = useCreateLoanIssueMutation();
  const { mutate: updateLoanIssued, isLoading: updating } = useUpdateLoanIssueMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      customer: values.customer,
      loanAmount: values.loanAmount,
      notes: values.notes,
      createdBy:values.createdBy,
      company: values.company,
      employee: values.employee,
      shift: values.shift,
    };
    try {
      if (initialValues) {
        updateLoanIssued({
          variables: {
            id: initialValues?.id!,
            input: {
              ...input,
              company: companyId,
              employee: employeeId,
              createdBy: userId,
              shift:shiftId,
              customer: input.customer.id,
            },
          },
        });
      } else {
        createLoanIssued({
          variables: {
            input:{
              ...input,
              company: companyId,
              employee: employeeId,
              createdBy: userId,
              shift:shiftId,
              customer: input.customer.id,
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
        <Label>Previous Remaining Due</Label>
        <Label>{data?.loanDue?.remainingBalance!}</Label>
        <Card className="w-full sm:w-8/12 md:w-2/3">
        
          <SelectCustomers control={control} errors={errors} />
          <Input
            label={t("form:input-loan-amount")}
            {...register("loanAmount")}
            error={t(errors.loanAmount?.message!)}
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
            ? t("form:button-label-update-loan-issued")
            : t("form:button-label-add-loan-issued")}
        </Button>
      </div>
    </form>
  );
}

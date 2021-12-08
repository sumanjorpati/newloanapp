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
import { paymentAccountValidationSchema } from "./payment-account-validation-schema";
import ValidationError from "@components/ui/form-validation-error";
import { useTranslation } from "next-i18next";
import SelectInput from "@components/ui/select-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePaymentAccountMutation } from "@data/payment-account/use-payment-account-create.mutation";
import { useUpdatePaymentAccountMutation } from "@data/payment-account/use-payment-account-update.mutation";
import { usePaymentGatewaysActiveList } from "@data/payment-gateway/use-payment-gateways-list.query";
import { getAuthCredentials } from "@utils/auth-utils";

function SelectGateways({
  control,
  errors,
}: {
  control: Control<FormValues>;
  errors: FieldErrors;
}) {
  const { t } = useTranslation();
  
  const { data: gateways, isLoading: loading } = usePaymentGatewaysActiveList();
  return (
    <div className="mb-5">
      <Label>{t("form:input-label-payment-gateway")}</Label>
      <SelectInput
        name="gateway"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        options={gateways?.paymentGateways!}
        isLoading={loading}
      />
      <ValidationError message= {t(errors.type?.message)}  />
    </div>
  );
}


type FormValues = {
  shortName: string;
  accountNo: string;
  accountSecret: string;
  notes: string;
  gateway: string;
  company: string;
  createdBy: string;
};

const defaultValues = {
  shortName: '',
  accountNo: '',
  accountSecret: '',
  notes: '',
  gateway: '',
  company: '',
  createdBy: ''
};

type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdatePaymentAccountForm({ initialValues }: IProps) {
  const {companyId,userId} = getAuthCredentials()
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

    resolver: yupResolver(paymentAccountValidationSchema),
  });

  const { mutate: createPaymentAccount, isLoading: creating } = useCreatePaymentAccountMutation();
  const { mutate: updatePaymentAccount, isLoading: updating } = useUpdatePaymentAccountMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      shortName: values.shortName,
      accountNo: values.accountNo,
      accountSecret: values.accountSecret,
      notes: values.notes,
      gateway:values.gateway,
      company: values.company,
      parent: 0,
    };
    try {
      if (initialValues) {
        updatePaymentAccount({
          variables: {
            id: initialValues?.id!,
            input: {
              ...input,
              gateway: input.gateway.id,
              createdBy: userId,
              company: companyId
            },
          },
        });
      } else {
        createPaymentAccount({
          variables: {
            input:{
              ...input,
              gateway: input.gateway.id,
              createdBy: userId,
              company: companyId
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
        
          <SelectGateways control={control} errors={errors} />
          <Input
            label={t("form:input-label-name")}
            {...register("shortName")}
            error={t(errors.shortName?.message!)}
            variant="outline"
            className="mb-5"
          />

          <Input
          label={t("form:input-label-account-no")}
          {...register("accountNo")}
          error={t(errors.accountNo?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t("form:input-label-account-secret")}
          {...register("accountSecret")}
          error={t(errors.accountSecret?.message!)}
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
            ? t("form:button-label-update-payment-account")
            : t("form:button-label-add-payment-account")}
        </Button>
      </div>
    </form>
  );
}

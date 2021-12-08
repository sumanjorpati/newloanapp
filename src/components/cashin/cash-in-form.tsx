import Input from "@components/ui/input";
import { useEffect} from "react";
import { Control, FieldErrors, useForm, useFormState, useWatch } from "react-hook-form";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import Label from "@components/ui/label";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useRouter } from "next/router";
import { getErrorMessage } from "@utils/form-error";
import ValidationError from "@components/ui/form-validation-error";
import { useTranslation } from "next-i18next";
import SelectInput from "@components/ui/select-input";
import { useCreateCashInMutation } from "@data/cash-in/use-cash-in-create.mutation";
import { useUpdateCashInMutation } from "@data/cash-in/use-cash-in-update.mutation";
import { getAuthCredentials } from "@utils/auth-utils";
import { useCustomersActiveList } from "@data/customer/use-customers-list.query";
import { usePaymentGatewaysActiveList } from "@data/payment-gateway/use-payment-gateways-list.query";
import { usePaymentAccountsListQuery } from "@data/payment-account/use-payment-acccounts-list.query";
import { PaymentAccountsActiveListFilterOptionType } from "@ts-types/custom.types";
import company from "@repositories/company";

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


function SelectPaymentAccounts({
  control,
  companyId,
  setValue
}: {
  control: Control<FormValues>;
  setValue: any;
  companyId: any;
}) {
  const { t } = useTranslation();
  const gateway = useWatch({
    control,
    name: "gateway",
  });const { dirtyFields } = useFormState({
    control,
  });
  useEffect(() => {
    if (gateway?.id && dirtyFields?.gateway) {
      setValue("paymentAccount", []);
    }
  }, [gateway?.id]);
  const { data: paymentAccounts, isLoading: loading } = usePaymentAccountsListQuery({
    companyId: companyId,
    gatewayId: gateway?.id,
  });
  console.log('listOfPaymentAccounts',paymentAccounts)
  return (
    <div className="mb-5">
      <Label>{t("form:input-label-payment-account")}</Label>
      <SelectInput
        name="paymentAccount"
        control={control}
        getOptionLabel={(option: any) => option.shortName + option.accountNo}
        getOptionValue={(option: any) => option.id}
        options={paymentAccounts?.paymentAccounts.data!}
        isLoading={loading}
        isClearable={true}
      />
      </div>
  );
}


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
  amount: string;
  notes: string;
  createdBy: string;
  company: string;
  employee: string;
  shift: string;
  paymentAccount: any;
  gateway: any;

};

const defaultValues = {
  customer: '',
  amount: '',
  notes: '',
  employee: '',
  company: '',
  shift: '',
  paymentAccount: null,
  gateway: null
};


type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdateCashInForm({ initialValues }: IProps) {
  const {companyId,employeeId,userId,shiftId} = getAuthCredentials()
  const router = useRouter();
  
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    setValue,
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

  const { mutate: createCashIn, isLoading: creating } = useCreateCashInMutation();
  const { mutate: updateCashIn, isLoading: updating } = useUpdateCashInMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      customer: values.customer,
      amount: values.amount,
      notes: values.notes,
      createdBy:values.createdBy,
      company: values.company,
      employee: values.employee,
      shift: values.shift,
      gateway: values.gateway,
      paymentAccount: values.paymentAccount,
    };
    try {
      if (initialValues) {
        updateCashIn({
          variables: {
            id: initialValues?.id!,
            input: {
              ...input,
              company: companyId,
              employee: employeeId,
              createdBy: userId,
              shift:shiftId,
              customer: input.customer.id,
              gateway: input.gateway.id,
              paymentAccount: input.paymentAccount.id,
            },
          },
        });
      } else {
        createCashIn({
          variables: {
            input:{
              ...input,
              company: companyId,
              employee: employeeId,
              createdBy: userId,
              shift:shiftId,
              customer: input.customer.id,
              gateway: input.gateway.id,
              paymentAccount: input.paymentAccount.id,
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
        
          <SelectCustomers
           control={control}

            errors={errors} />
          <Input
            label={t("form:input-cash-in-amount")}
            {...register("amount")}
            error={t(errors.amount?.message!)}
            variant="outline"
            className="mb-5"
          />

          <TextArea
            label={t("form:input-label-details")}
            {...register("notes")}
            variant="outline"
            className="mb-5"
          />
        <SelectGateways control={control} errors={errors} />
        <SelectPaymentAccounts control={control} companyId={companyId} setValue={setValue}/>
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
            ? t("form:button-label-update-cash-in")
            : t("form:button-label-add-cash-in")}
        </Button>
      </div>
    </form>
  );
}

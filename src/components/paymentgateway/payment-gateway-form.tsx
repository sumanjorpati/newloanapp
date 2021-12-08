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
import { paymentGatewayValidationSchema } from "./payment-gateway-validation-schema";
import ValidationError from "@components/ui/form-validation-error";
import { useTranslation } from "next-i18next";
import SelectInput from "@components/ui/select-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePaymentGatewayMutation } from "@data/payment-gateway/use-payment-gateway-create.mutation";
import { useUpdatePaymentGatewayMutation } from "@data/payment-gateway/use-payment-gateway-update.mutation";
import { useCompaniesActiveList } from "@data/company/use-companies-list.query";
import { usePaymentGatewaysActiveList } from "@data/payment-gateway/use-payment-gateways-list.query";
import internal from "stream";
import { getAdminId, getAuthCredentials, getSuperAdminId } from "@utils/auth-utils";

function SelectPaymentGateway({
  control,
  errors,
}: {
  control: Control<FormValues>;
  errors: FieldErrors;
}) {
  const { t } = useTranslation();
  
  const { data: paymentGateways, isLoading: loading } = usePaymentGatewaysActiveList();
  return (
    <div className="mb-5">
      <Label>{t("form:input-label-payment-gateways")}</Label>
      <SelectInput
        name="parent"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        options={paymentGateways?.paymentGateways!}
        isLoading={loading}
      />
      <ValidationError message= {t(errors.parent?.message)}  />
    </div>
  );
}


type FormValues = {
  name: string;
  description: string;
  isParent: boolean;
  parent: any;
  createdBy: string;
};

const defaultValues = {
  name: '',
  description: '',
  isParent: false,
  parent: 0,
  createdBy: '',
};

type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdatePaymentGatewayForm({ initialValues }: IProps) {
  
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

    resolver: yupResolver(paymentGatewayValidationSchema),
  });

  const { mutate: createPaymentGateway, isLoading: creating } = useCreatePaymentGatewayMutation();
  const { mutate: updatePaymentGateway, isLoading: updating } = useUpdatePaymentGatewayMutation();

  const onSubmit = async (values: FormValues) => {
  const superadminId  = getSuperAdminId();
  console.log('superadminId',superadminId)
    const input = {
      name: values.name,
      isParent: values.isParent,
      parent: values.parent,
      parentId: values.parent == undefined ? 0 : values.parent.id,
      description:values.description,
      createdBy: values.createdBy,
    };
    try {
      if (initialValues) {
        updatePaymentGateway({
          variables: {
            id: initialValues?.id!,
            input: {
              ...input,
              parentId: input.parent == undefined ? 0: input.parent.id,
              isParent: input.parent == undefined ? true: false,
              createdBy:superadminId,
            },
          },
        });
      } else {
        createPaymentGateway({
          variables: {
            input:{
              ...input,
              parentId: input.parent == undefined ? input.parent.id : 0,
              isParent: input.parent == undefined ? true: false,
              createdBy:superadminId,
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
        
          <SelectPaymentGateway control={control} errors={errors} />
          <Input
            label={t("form:input-label-name")}
            {...register("name")}
            error={t(errors.name?.message!)}
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
            ? t("form:button-label-update-payment-gateway")
            : t("form:button-label-add-payment-gateway")}
        </Button>
      </div>
    </form>
  );
}

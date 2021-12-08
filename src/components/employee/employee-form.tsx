import Input from "@components/ui/input";
import {useState} from "react";
import { Control, FieldErrors, useForm } from "react-hook-form";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import Label from "@components/ui/label";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useRouter } from "next/router";
import { getErrorMessage } from "@utils/form-error";
import {Shift as TShift}  from "@ts-types/generated";
import PasswordInput from "@components/ui/password-input";
import { employeeValidationSchema } from "./employee-validation-schema";
import ValidationError from "@components/ui/form-validation-error";
import { useTranslation } from "next-i18next";
import SelectInput from "@components/ui/select-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateEmployeeMutation } from "@data/employee/use-employee-create.mutation";
import { useUpdateEmployeeMutation } from "@data/employee/use-employee-update.mutation";
import { useShiftActiveList } from "@data/shift/use-shifts-list";
import { getCompanyId,getAdminId } from "@utils/auth-utils";
import shift from "@repositories/shift";
import { DatePicker } from "@components/ui/date-picker";
import ShiftList from "@components/shift/shift-list";

function SelectShifts({
  control,
  errors,
}: {
  control: Control<FormValues>;
  errors: FieldErrors;
}) {
  const { t } = useTranslation();
  
  const { data: shifts, isLoading: loading } = useShiftActiveList();
  return (
    <div className="mb-5">
      <Label>{t("form:input-label-shifts")}</Label>
      <SelectInput
        name="shift"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        options={shifts?.shifts!}
        isLoading={loading}
      />
      <ValidationError message= {t(errors.shift?.message)}  />
    </div>
  );
}


type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  contactDetails: string;
  notes: string;
  userName: string;
  password: string;
  dob: string;
  shift: string;
  createdBy: string;
  company: any,
};

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  contactDetails: '',
  notes: '',
  userName: '',
  password: '',
  dob: '1996/12/21',
  shift: '',
  createdBy: '',
  company: null,
};

type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdateEmployeeForm({ initialValues }: IProps) {
  
var nv = initialValues?{...initialValues}:defaultValues

var strDob = initialValues? ''+nv.dob : nv.dob
 console.log('strDbo',strDob)
 var dobDateOfBirth = new Date(strDob)
  const companyId = getCompanyId();
  const adminId = getAdminId();
  const [dob, setDob] = useState(dobDateOfBirth);
  console.log('companyId and adminId', companyId,dob)
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

    resolver: yupResolver(employeeValidationSchema),
  });

  const { mutate: createEmployee, isLoading: creating } = useCreateEmployeeMutation();
  const { mutate: updateEmployee, isLoading: updating } = useUpdateEmployeeMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      contactDetails:values.contactDetails,
      notes: values.notes,
      dob: values.dob,
      userName: values.userName,
      password: values.password,
      shift: values.shift,
    };
    var date = new Date(dob);
    const [month, day, year] = [date.getMonth()+1, date.getDate(), date.getFullYear()];
    var dateOfBirth = year+"-"+month+"-"+day;
    try {
      if (initialValues) {
        updateEmployee({
          variables: {
            id: initialValues?.id!,
            input: {
              ...input,
              shift: input.shift.id,
              createdBy: adminId,
              company: companyId,
              dob: dateOfBirth,
            },
          },
        });
      } else {
        createEmployee({
          variables: {
            input:{
              ...input,
              shift: input.shift.id,
              createdBy:adminId,
              company: companyId,
              dob: dateOfBirth,
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
        
          <SelectShifts control={control} errors={errors} />
          <Input
            label={t("form:input-label-first-name")}
            {...register("firstName")}
            error={t(errors.firstName?.message!)}
            variant="outline"
            className="mb-5"
          />

          <Input
          label={t("form:input-label-last-name")}
          {...register("lastName")}
          error={t(errors.lastName?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t("form:input-label-contact")}
          {...register("contactDetails")}
          error={t(errors.contactDetails?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
        label={t("form:input-label-email")}
        {...register("email")}
        error={t(errors.email?.message!)}
        variant="outline"
        className="mb-5"
      />
      <Label title={t("form:input-label-dob")}> {t("form:input-lable-dob")}</Label>
      <DatePicker 
      {...register("dob")}
      selected={dob}
      dateFormat={"yyyy/MM/dd"}
       onChange={(date) => setDob(date)} 
       />
      <Input
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
            ? t("form:button-label-update-employee")
            : t("form:button-label-add-employee")}
        </Button>
      </div>
    </form>
  );
}

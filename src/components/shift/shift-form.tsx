import Input from "@components/ui/input";
import {useState} from 'react';
import { Control, FieldErrors, useForm } from "react-hook-form";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import Label from "@components/ui/label";
import Timekeeper from 'react-timekeeper';
import Card from "@components/common/card";
import Description from "@components/ui/description";
import * as categoriesIcon from "@components/icons/category";
import { getIcon } from "@utils/get-icon";
import { useRouter } from "next/router";
import { getErrorMessage } from "@utils/form-error";
import {Shift as TShift}  from "@ts-types/generated";
import PasswordInput from "@components/ui/password-input";
import { shiftValidationSchema } from "./shift-validation-schema";
import ValidationError from "@components/ui/form-validation-error";
import { useTranslation } from "next-i18next";
import SelectInput from "@components/ui/select-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateShiftMutation } from "@data/shift/use-shift-create.mutation";
import { useUpdateShiftMutation } from "@data/shift/use-shift-update.mutation";
import { useCompaniesActiveList } from "@data/company/use-companies-list.query";
import { getCompanyId } from "@utils/auth-utils";
import company from "@repositories/company";
import TimeKeeper from "react-timekeeper";
import { tmpdir } from "os";
import shift from "@repositories/shift";


type FormValues = {
  name: string;
  shiftStart: string;
  shiftEnd: string;
  notes: string;
  company: any,
};

const defaultValues = {
  name: '',
  shiftStart: '09:00 am',
  shiftEnd: '05:00 pm',
  notes: '',
  company: null
};

type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdateShiftForm({ initialValues }: IProps) {

var nv = initialValues?{...initialValues}:defaultValues

var shiftStr =''+ initialValues? ''+nv.shiftStart.substr(0,nv.shiftStart.length-3): nv.shiftStart
var strEnd = ''+initialValues? ''+nv.shiftEnd.substr(0,nv.shiftEnd.length-3): nv.shiftEnd

const [shiftStart, onShiftStartChange] = useState(shiftStr);
const [shiftEnd, onShiftEndChange] = useState(strEnd);
const [showStart, setShowStartTime] = useState(true)
const [showEnd, setShowEndTime] = useState(true)
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

    resolver: yupResolver(shiftValidationSchema),
  });

  const { mutate: createShift, isLoading: creating } = useCreateShiftMutation();
  const { mutate: updateShift, isLoading: updating } = useUpdateShiftMutation();

  const onSubmit = async (values: FormValues) => {
    const companyId = getCompanyId()
    console.log('CompanyId from shiftcreate',companyId)
    const input = {
      name: values.name,
      shiftStart: values.shiftStart,
      shiftEnd: values.shiftEnd,
      notes:values.notes,
      company: values.company,
    };
    try {
      if (initialValues) {
        updateShift({
          variables: {
            id: initialValues?.id!,
            input: {
              ...input,
              shiftStart: shiftStart,
              shiftEnd: shiftEnd,
              company: companyId,
            },
          },
        });
      } else {
        createShift({
          variables: {
            input:{
              ...input,
              shiftStart: shiftStart,
              shiftEnd: shiftEnd,
              company: companyId,
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
            {...register("name")}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />

         {showStart && 
         <TimeKeeper
          onChange={(startTime)=>onShiftStartChange(startTime.formatted24)}
           time={shiftStart}
           onDoneClick={() => setShowStartTime(false)}
           switchToMinuteOnHourSelect
       />
      }
      <span>StartTime is {shiftStart}</span>
      {!showStart &&
          <button onClick={() => setShowStartTime(true)}>Show Start Selector</button>
      }
        
       {showEnd &&   <TimeKeeper
          onChange={(endTime)=>onShiftEndChange(endTime.formatted24)}
           time={shiftEnd} 
           onDoneClick={() => setShowEndTime(false)}
           switchToMinuteOnHourSelect
       />
      }
      <span>EndTime is {shiftEnd}</span>
      {!showEnd &&
          <button onClick={() => setShowEndTime(true)}>Show End Selector</button>
      }

        <Input
        label={t("form:input-label-notes")}
        {...register("notes")}
        error={t(errors.notes?.message!)}
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
            ? t("form:button-label-update-shift")
            : t("form:button-label-add-shift")}
        </Button>
      </div>
    </form>
  );
}

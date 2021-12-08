import { CreateCompanyInput } from "@ts-types/generated";
import Company from "@repositories/company";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { SUPERADMIN_ROUTES } from "@utils/loanoutes";

export interface ICompanyCreateVariables {
  variables: { input: CreateCompanyInput };
}

export const useCreateCompanyMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: ICompanyCreateVariables) =>
      Company.create(LOAN_API_ENDPOINTS.SUPERADMIN_COMPANIES_CREATE, input),
    {
      onSuccess: () => {
        router.push(SUPERADMIN_ROUTES.COMPANY);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.SUPERADMIN_COMPANIES_VIEW);
      },
    }
  );
};

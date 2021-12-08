import { useQuery } from "react-query";
import Shift from "@repositories/type";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchRecentShifts = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.RECENT_SHIFTS}`;
  const {
    data: { data },
  } = await Shift.all(url);
  return { shift: { data}};
};

const useRecentShiftsQuery = () => {
  return useQuery<any, Error>([LOAN_API_ENDPOINTS.RECENT_SHIFTS],
     fetchRecentShifts, 
     {
    keepPreviousData: true,
  });
};

export { useRecentShiftsQuery, fetchRecentShifts };

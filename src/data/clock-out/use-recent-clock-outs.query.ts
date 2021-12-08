import { useQuery } from "react-query";
import ClockOut from "@repositories/type";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchRecentClockOuts = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.RECENT_CLOCK_OUTS}`;
  const {
    data: { data },
  } = await ClockOut.all(url);
  return { clockOut: { data}};
};

const useRecentClockOutsQuery = () => {
  return useQuery<any, Error>([LOAN_API_ENDPOINTS.RECENT_CLOCK_OUTS],
     fetchRecentClockOuts, 
     {
    keepPreviousData: true,
  });
};

export { useRecentClockOutsQuery, fetchRecentClockOuts };

import { useQuery } from "react-query";
import ClockIn from "@repositories/type";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchRecentClockIns = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.RECENT_CLOCK_INS}`;
  const {
    data: { data },
  } = await ClockIn.all(url);
  return { clockIn: { data}};
};

const useRecentClockInsQuery = () => {
  return useQuery<any, Error>([LOAN_API_ENDPOINTS.RECENT_CLOCK_INS],
     fetchRecentClockIns, 
     {
    keepPreviousData: true,
  });
};

export { useRecentClockInsQuery, fetchRecentClockIns };

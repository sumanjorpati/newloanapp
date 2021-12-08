import { CartIconBig } from "@components/icons/cart-icon-bag";
import StickerCard from "@components/widgets/sticker-card";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useSuperAdminAnalyticsQuery } from "@data/superadmin-analytics/use-superadmin-analytics.query"
import { useTranslation } from "next-i18next";
import { DollarIcon } from "@components/icons/shops/dollar";
import RecentAdmins from "@components/admin/recent-admins";
import { useRecentAdminsQuery } from "@data/admin/use-recent-admins.query";

export default function SuperAdminDashboard() {
  const { t } = useTranslation();
  const { data, isLoading: loading } = useSuperAdminAnalyticsQuery();
  

  const {
    data: recentAdmins,
    isLoading: recentAdminsLoading,
    error: recentAdminsError,
  } = useRecentAdminsQuery();


  if (loading || recentAdminsLoading ) {
    return <Loader text={t("common:text-loading")} />;
  }
  if (recentAdminsError ) {
    return (
      <ErrorMessage
        message={recentAdminsError?.message }
      />
    );
  }
  
  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-total-companies"
            
            icon={<DollarIcon className="w-7 h-7" color="#047857" />}
            iconBgStyle={{ backgroundColor: "#A7F3D0" }}
            price={data?.totalCompanies}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-total-employees"
            
            icon={<CartIconBig />}
            price={data?.totalAdmins}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-total-employees"
            
            icon={<CartIconBig />}
            price={data?.totalPaymentGateways}
          />
        </div>
      </div>

      

      <div className="w-full flex flex-wrap mb-6">
        <div className="w-full sm:w-1/2 xl:w-1/2 sm:px-3 sm:pl-0 mb-6 xl:mb-0">
          <RecentAdmins
            admins={recentAdmins?.admins?.data}
            title={t("table:recent-companies-table-title")}
          />
        </div>
        <div className="w-full sm:w-1/2 xl:w-1/2 sm:px-3 sm:pl-0 mb-6 xl:mb-0">
          <RecentAdmins
            admins={recentAdmins?.admins?.data}
            title={t("table:recent-companies-table-title")}
          />
        </div>
      </div>
      {/* <div className="w-full sm:pe-0 mb-6 xl:mb-0">
        <PopularProductList
          products={popularProductData}
          title={t("table:popular-products-table-title")}
        />
      </div> */}
    </>
  );
}

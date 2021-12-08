import { CartIconBig } from "@components/icons/cart-icon-bag";
import { CoinIcon } from "@components/icons/coin-icon";
import ColumnChart from "@components/widgets/column-chart";
import StickerCard from "@components/widgets/sticker-card";
import ErrorMessage from "@components/ui/error-message";
import usePrice from "@utils/use-price";
import Loader from "@components/ui/loader/loader";
import RecentOrders from "@components/order/recent-orders";
import PopularProductList from "@components/product/popular-product-list";
import { useOrdersQuery } from "@data/order/use-orders.query";
import { usePopularProductsQuery } from "@data/analytics/use-popular-products.query";
import { useTenantAnalyticsQuery } from "@data/tenant/use-tenant-analytics";
import { useTranslation } from "next-i18next";
import { useWithdrawsQuery } from "@data/withdraw/use-withdraws.query";
import WithdrawTable from "@components/withdraw/withdraw-table";
import { ShopIcon } from "@components/icons/sidebar";
import { DollarIcon } from "@components/icons/shops/dollar";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { data, isLoading: loading } = useTenantAnalyticsQuery();
  
  if (loading ) {
    return <Loader text={t("common:text-loading")} />;
  }
  
  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-total-cashin"
            subtitleTransKey="sticker-card-subtitle-total-cashin"
            icon={<DollarIcon className="w-7 h-7" color="#047857" />}
            iconBgStyle={{ backgroundColor: "#A7F3D0" }}
            price={data?.totalCashInsAmount}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-total-cashout"
            subtitleTransKey="sticker-card-subtitle-total-customers"
            icon={<CartIconBig />}
            price={data?.totalCashOutsAmount}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-remaining-loans-to-be-paid"
            icon={<CoinIcon />}
            price={data?.remainingLoansToBePaid}
          />
        </div>
        
      </div>

      <div className="w-full flex flex-wrap mb-6">
       
      </div>

      <div className="w-full flex flex-wrap mb-6">
        <div className="w-full sm:w-1/2 xl:w-1/2 sm:px-3 sm:pl-0 mb-6 xl:mb-0">
          {/* <RecentOrders
            orders={orderData?.orders?.data}
            title={t("table:recent-order-table-title")}
          /> */}
        </div>

        <div className="w-full sm:w-1/2 xl:w-1/2 sm:px-3 sm:pr-0 mb-6 xl:mb-0">
          {/* <WithdrawTable
            //@ts-ignore
            withdraws={withdrawsData?.withdraws}
            title={t("table:withdraw-table-title")}
          /> */}
        </div>
      </div>
      <div className="w-full sm:pe-0 mb-6 xl:mb-0">
        {/* <PopularProductList
          products={popularProductData}
          title={t("table:popular-products-table-title")}
        /> */}
      </div>
    </>
  );
}

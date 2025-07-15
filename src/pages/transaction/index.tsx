import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import HistoryTransaction from "@/components/views/HistoryTransaction";

const transaction = () => {
  return (
    <LandingPageLayout title="Transaction History">
      <HistoryTransaction />
    </LandingPageLayout>
  );
};

export default transaction;

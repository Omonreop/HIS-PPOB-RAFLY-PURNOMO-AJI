import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import HistoryTransaction from "@/components/views/HistoryTransaction";

const transaction = () => {
  return (
    <LandingPageLayout title="Top Up">
      <HistoryTransaction />
    </LandingPageLayout>
  );
};

export default transaction;

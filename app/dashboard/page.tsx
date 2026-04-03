import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";
import { SectionCards } from "@/components/ui/section-cards";
import { StockCard } from "@/components/ui/stock-card";

const page = () => {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <StockCard />
    </div>
  );
};

export default page;

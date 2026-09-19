import { LuArrowRight } from "react-icons/lu";
import TrasactionInfoCard from "../Cards/TrasactionInfoCard";
import moment from "moment";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-500" />

        <h5 className="text-lg">Income</h5>
    </div>

    <button className="card-btn" onClick={onSeeMore}>
        See All <LuArrowRight className="text-base" />
    </button>
</div>

      <div className="mt-6">
        {transactions?.slice(0, 5).map((item) => (
          <TrasactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
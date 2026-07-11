const StatsCard = ({ title, value, bgColor, icon: Icon }) => {
  return (
    <div className={`${bgColor} text-white rounded-xl p-5 shadow-md flex-1`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>

          <p className="text-3xl font-bold mt-2">
            {value}
          </p>
        </div>

        <Icon className="text-4xl opacity-80" />
      </div>
    </div>
  );
};

export default StatsCard;
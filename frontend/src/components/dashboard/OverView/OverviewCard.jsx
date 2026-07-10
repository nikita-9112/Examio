

const OverviewCard = ({
  title,
  value,
  icon,
  iconBg,
  iconColor,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border border-gray-200
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
        p-6
      "
    >
      {/* Icon */}
      <div
        className={`
          w-12 h-12
          rounded-xl
          flex items-center justify-center
          ${iconBg}
        `}
      >
        <span className={`text-xl ${iconColor}`}>
          {icon}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-5 text-sm font-medium text-gray-500">
        {title}
      </h3>

      {/* Value */}
      <p className="mt-1 text-3xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
};

export default OverviewCard;
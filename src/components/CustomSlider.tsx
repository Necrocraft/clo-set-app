import React from "react";

type CUstomSliderProps = {
  minPrice: number;
  maxPrice: number;
  onChange: (min: number, max: number) => void;
  disabled: boolean;
};

const MIN = 0;
const MAX = 999;

export const Slider: React.FC<CUstomSliderProps> = ({
  minPrice,
  maxPrice,
  onChange,
  disabled,
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), maxPrice - 1);
    onChange(newMin, maxPrice);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), minPrice + 1);
    onChange(minPrice, newMax);
  };

  return (
    <div
      className={`space-y-2 w-[200px] relative ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="flex justify-between absolute w-[280px] ml-[-30px] text-sm font-medium text-gray-700">
        <span>₹{minPrice}</span>
        <span>₹{maxPrice}</span>
      </div>
      <div className="relative h-6 flex items-center">
        {/* Track */}
        <div className="absolute left-0 right-0 h-1 bg-[#69d79b] rounded" />
        {/* Range */}
        <div
          className="absolute h-1 bg-primary rounded"
          style={{
            left: `${(minPrice / MAX) * 100}%`,
            right: `${100 - (maxPrice / MAX) * 100}%`,
          }}
        />
        {/* Min Handle */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={minPrice}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent z-10 pointer-events-auto"
        />
        {/* Max Handle */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={maxPrice}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent z-20 pointer-events-auto"
        />
      </div>
    </div>
  );
};

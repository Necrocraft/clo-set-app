import { useDispatch, useSelector } from "react-redux";

import { PricingOption, type PricingOptionTypes } from "../models/pricing";

import type { RootState } from "../redux/store";
import { toggleFilter, setPriceRange, resetFilters } from "../redux/actions";

import { Slider } from "./CustomSlider";

export const Filters = () => {
  const dispatch = useDispatch();
  const { filters, minPrice, maxPrice } = useSelector(
    (state: RootState) => state
  );

  return (
    <div className="flex flex-wrap justify-between items-center bg-[#000] p-4 rounded-md">
      <div className="flex flex-wrap gap-4 items-center">
        <p className="text-[#B3B3B3]">Pricing Option:</p>
        {Object.entries(PricingOption).map(([label, value]) => (
          <label
            key={value}
            className="flex items-center gap-2 text-sm text-[#B3B3B3]"
          >
            <input
              type="checkbox"
              checked={filters.includes(value as PricingOptionTypes)}
              onChange={() =>
                dispatch(toggleFilter(value as PricingOptionTypes))
              }
            />
            {label}
          </label>
        ))}
        {filters.includes(PricingOption.Paid) && (
          <div className="ml-[100px]">
            <Slider
              minPrice={minPrice}
              maxPrice={maxPrice}
              onChange={(min, max) => dispatch(setPriceRange(min, max))}
              disabled={!filters.includes(PricingOption.Paid)}
            />
          </div>
        )}
      </div>
      <button
        onClick={() => dispatch(resetFilters())}
        className="text-sm ml-4 !bg-transparent hover:!border-[#69d79b]"
      >
        Reset Filters
      </button>
    </div>
  );
};

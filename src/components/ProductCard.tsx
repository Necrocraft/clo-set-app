import type { Item } from "../models/Item";
import { PricingLabel, PricingOption } from "../models/pricing";

export const ProductCard = ({ item }: { item: Item }) => (
  <div className="rounded-lg shadow-lg overflow-hidden h-[450px] cursor-pointer transform transition-all duration-200 hover:scale-105 hover:border-primary">
    <img
      src={item.imagePath}
      alt={item.title}
      className="w-full object-cover h-[350px]"
    />
    <div className="p-4 h-12 flex justify-between">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-sm text-gray-500 mb-1">{item.creator}</p>
      </div>
      <p className="text-sm font-medium">
        {item.pricingOption === PricingOption.Paid
          ? `₹${item.price}`
          : PricingLabel[item.pricingOption]}
      </p>
    </div>
  </div>
);

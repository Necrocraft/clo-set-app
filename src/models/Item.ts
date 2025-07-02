import type { PricingOptionTypes } from "./pricing"

export type Item = {
    id: string
    title: string
    creator: string
    imagePath: string
    price: number
    pricingOption: PricingOptionTypes
}

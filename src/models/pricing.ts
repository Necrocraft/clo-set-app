export const PricingOption = {
    Paid: 0,
    Free: 1,
    ViewOnly: 2,
} as const

export type PricingOptionTypes = (typeof PricingOption)[keyof typeof PricingOption]

export const PricingLabel: Record<PricingOptionTypes, string> = {
    [PricingOption.Paid]: 'Paid',
    [PricingOption.Free]: 'Free',
    [PricingOption.ViewOnly]: 'View Only',
}

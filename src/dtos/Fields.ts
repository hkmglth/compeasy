enum ICompanyFields  {
    ConsumerServices = "Consumer Services",
    HealthCare = "Health Care",
    Finance = "Finance",
    BasicIndustries = "Basic Industries",
    Energy = "Energy",
    ConsumerNonDurables = "Consumer Non-Durables",
    Miscellaneous = "Miscellaneous",
    CapitalGoods = "Capital Goods",
    NA = "n/a",
    Technology = "Technology",
    PublicUtilities = "Public Utilities",
    Transportation = "Transportation",
}

export const CompanyFieldsAsArray = [
    "Consumer Services",
    "Health Care",
    "Finance",
    "Basic Industries",
    "Energy",
    "Consumer Non-Durables",
    "Miscellaneous",
    "Capital Goods",
    "n/a",
    "Technology",
    "Public Utilities",
    "Transportation", 
]

export type IFieldStats = {
    type:string,
    value:number
}
export type IMultipleFieldStats = IFieldStats[]

export default ICompanyFields
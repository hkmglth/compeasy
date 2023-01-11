import { ICompanyDto } from 'dtos/Companies';
import ICompanyFields, { IMultipleFieldStats } from './../dtos/Fields';
import { ICompaniesDto } from 'dtos/Companies';
import allCompanies from 'fakeData/companies.json'


const getAllCompanies = async():Promise<ICompaniesDto> => {
    return allCompanies
}

const getLastActionCompanies = async():Promise<ICompaniesDto> => {
    let lastCompanies = allCompanies.slice(-5, -1)
    return lastCompanies
}

const getAllFieldStats = async():Promise<IMultipleFieldStats> => {
    let stats: IMultipleFieldStats = []
    allCompanies.map(company => {
        switch(company.fields){
            case ICompanyFields.ConsumerServices: stats[0] ? stats[0].value += 1 : stats[0] = { type: ICompanyFields.ConsumerServices, value:0}
                break;
            case ICompanyFields.HealthCare: stats[1] ? stats[1].value += 1 : stats[1] = { type: ICompanyFields.HealthCare, value:0}
                break;
            case ICompanyFields.Finance: stats[2] ? stats[2].value += 1 : stats[2] = { type: ICompanyFields.Finance, value:0}
                break;
            case ICompanyFields.BasicIndustries: stats[3] ? stats[3].value += 1 : stats[3] = { type: ICompanyFields.BasicIndustries, value:0}
                break;
            case ICompanyFields.Energy: stats[4] ? stats[4].value += 1 : stats[4] = { type: ICompanyFields.Energy, value:0}
                break;
            case ICompanyFields.ConsumerNonDurables: stats[5] ? stats[5].value += 1 : stats[5] = { type: ICompanyFields.ConsumerNonDurables, value:0}
                break;
            case ICompanyFields.Miscellaneous: stats[6] ? stats[6].value += 1 : stats[6] = { type: ICompanyFields.Miscellaneous, value:0}
                break;
            case ICompanyFields.CapitalGoods: stats[7] ? stats[7].value += 1 : stats[7] = { type: ICompanyFields.CapitalGoods, value:0}
                break;
            case ICompanyFields.NA: stats[8] ? stats[8].value += 1 : stats[8] = { type: ICompanyFields.NA, value:0}
                break;
            case ICompanyFields.Technology: stats[9] ? stats[9].value += 1 : stats[9] = { type: ICompanyFields.Technology, value:0}
                break;
            case ICompanyFields.PublicUtilities: stats[10] ? stats[10].value += 1 : stats[10] = { type: ICompanyFields.PublicUtilities, value:0}
                break;
            case ICompanyFields.Transportation: stats[11] ? stats[11].value += 1 : stats[11] = { type: ICompanyFields.Transportation, value:0}
                break;
        }
    })
    return stats
}

export {
    getAllCompanies,
    getLastActionCompanies,
    getAllFieldStats,
}
import type {
    IGenerationData,
    IGenerationResponse,
    ICleanEnergyData,
    IEnergyTypeItem,
    ICleanEnergyInterval
} from "../types.js";

export default function transformOptimal(payload: IGenerationResponse, chargeHours: number): ICleanEnergyInterval {
    const data: IGenerationData[] = payload.data.slice(1);

    const cleanEnergyData: ICleanEnergyData[] = [];
    for (let elem of data) {
        const items: IEnergyTypeItem[] = elem.generationmix;
        let cleanPerc: number = 0;

        for (let item of items) {
            if (["biomass", "nuclear", "hydro", "wind", "solar"].includes(item.fuel)) {
                cleanPerc += item.perc;
            }
        }

        cleanEnergyData.push(
            {from: elem.from, to: elem.to, perc: cleanPerc}
        )
    }
    // console.log("cleanEnergyData:", cleanEnergyData);

    const cleanEnergyIntervals: ICleanEnergyInterval[] = [];

    const chargeSegments: number = chargeHours * 2;
    for (let startIndex = 0; startIndex < cleanEnergyData.length - chargeSegments + 1; startIndex++) {
        const startTime: string = cleanEnergyData[startIndex]!.from
        const endTime: string = cleanEnergyData[startIndex + chargeSegments - 1]!.to
        let percentageSum: number = 0;
        for (let i = 0; i < chargeSegments; i++) {
            const el: ICleanEnergyData = cleanEnergyData[startIndex + i]!;
            percentageSum += el.perc;
        }
        const averagePercentage: number = percentageSum / chargeSegments;

        cleanEnergyIntervals.push(
            {from: startTime, to: endTime, perc: averagePercentage}
        )
    }

    // console.log("cleanEnergyIntervals:", cleanEnergyIntervals);

    const getCleanerIntervals = (a: ICleanEnergyInterval, b: ICleanEnergyInterval): ICleanEnergyInterval => {
        return a.perc >= b.perc ? a : b;
    }

    const cleanestInterval = cleanEnergyIntervals.reduce((acc, cur) => {return getCleanerIntervals(acc, cur)})
    // console.log(cleanestInterval);

    return cleanestInterval;


}

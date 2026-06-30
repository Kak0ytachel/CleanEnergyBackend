import type {
    IGenerationData,
    IGenerationResponse,
    ICleanEnergyData,
    IEnergyTypeItem,
    ICleanEnergyInterval
} from "../types.js";

function transformOptimal(payload: IGenerationResponse, chargeHours: number): ICleanEnergyInterval {
    const data: IGenerationData[] = payload.data.slice(1);

    const cleanEnergyData: ICleanEnergyData[] = [];
    for (let elem of data) {
        const items: IEnergyTypeItem[] = elem.generationmix;
        let cleanPerc: number = 0;

        for (let item of items) {
            if (item.fuel in ["biomass", "nuclear", "hydro", "wind", "solar"]) {
                cleanPerc += item.perc;
            }
        }

        cleanEnergyData.push(
            {from: elem.from, to: elem.to, perc: cleanPerc}
        )
    }

    const cleanEnergyIntervals: ICleanEnergyInterval[] = [];

    const chargeSegments: number = chargeHours * 2;
    for (let startIndex = 0; startIndex < cleanEnergyData.length - chargeSegments; startIndex++) {
        const startTime: string = cleanEnergyData[startIndex]!.from
        const endTime: string = cleanEnergyData[startIndex + chargeSegments - 1]!.from
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

    const getCleanerIntervals = (a: ICleanEnergyInterval, b: ICleanEnergyInterval): ICleanEnergyInterval => {
        return a.perc >= b.perc ? a : b;
    }

    const cleanestInterval = cleanEnergyIntervals.reduce(getCleanerIntervals)
    // console.log(cleanestInterval);

    return cleanestInterval;


}

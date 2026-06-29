import type {IGenerationData, IGenerationResponse, ICleanEnergyData, IEnergyTypeItem} from "../types.js";

function transformOptimal(payload: IGenerationResponse, chargeHours: number) {
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

    const chargeSegments = chargeHours * 2;

    for (let i = 0; i < cleanEnergyData.length - chargeSegments; i++) {
        // todo
    }


}

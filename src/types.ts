

export interface IGenerationResponse {
    data: Array<IGenerationData>
}


export interface IGenerationData {
    from: string;
    to: string;
    //noinspection SpellCheckingInspection
    generationmix: Array<IEnergyTypeItem>
}


export interface IEnergyTypeItem {
    fuel: string, // FuelType,
    //noinspection SpellCheckingInspection
    perc: number // left as "perc" to match API
}

// export type FuelType = "gas" | "coal" | "biomass" | "nuclear" | "hydro" | "imports" | "other" | "wind" | "solar";

export interface ICleanEnergyData {
    from: string,
    to: string,
    //noinspection SpellCheckingInspection
    perc: number // left as "perc" to match other types
}

export interface ICleanEnergyInterval {  // made as a separate interface for future upgradability
    from: string,
    to: string,
    perc: number
}

export interface IOptimalQuery{
    chargeHours: number
}

export interface IStats {
    today: IGenerationData,
    tomorrow: IGenerationData,
    afterTomorrow: IGenerationData,
}

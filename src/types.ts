

export interface IGenerationResponse {
    data: Array<IGenerationData>
}


export interface IGenerationData {
    from: string;
    to: string;
    //noinspection SpellCheckingInspection
    generationmix: Array<IGenerationMixItem>
}


export interface IGenerationMixItem {
    fuel: string,
    //noinspection SpellCheckingInspection
    perc: number
}
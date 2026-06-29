import type {IGenerationResponse} from "../types.js";

export async function getGeneration(): Promise<IGenerationResponse> {
    const daysBefore = 1;
    const daysAfter = 3;
    const from = (new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * daysBefore).toISOString());
    const to = (new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * daysAfter).toISOString());
    const response = await fetch(`https://api.carbonintensity.org.uk/generation/${from}/${to}`)
    const json: IGenerationResponse = await response.json()
    if (!response.ok || json?.data === undefined) {
        throw new Error('Failed to fetch data')
    }
    // todo: handle error
    console.log(json);
    return json
}


// async function test () {
//     const data = await getGeneration();
//     console.log(data);
//     console.log(data.data[0])
// }








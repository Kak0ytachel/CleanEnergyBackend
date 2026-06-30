import type {IGenerationData, IGenerationResponse} from "../types.js";

// takes ISO date strings and compares if they are the same day
function compareDay(datetimeA: string, datetimeB: string): boolean {
    // gets YYYY-MM-DD date
    const dateA = datetimeA.split('T')[0];
    const dateB = datetimeB.split('T')[0];
    return dateA === dateB;
}

async function filterAndMergeData(data: IGenerationData[], date: Date) {
    const filteredData = data.filter((elem: IGenerationData) => compareDay(elem.from, date.toISOString()));

    const fuelValues: Record<string, number> = {};

    let counter: number = 0;

    let from: Date | undefined = undefined;
    let to: Date | undefined = undefined;

    if (filteredData.length === 0) {
        throw new Error('No data found');
    }

    for (let elem of filteredData) {
        for (let item of elem.generationmix) {
            fuelValues[item.fuel] = (fuelValues[item.fuel] || 0) + item.perc;
        }
        counter++;

        // handles initial undefined values
        if (from === undefined || to === undefined) {
            from = new Date(elem.from);
            to = new Date(elem.to);
        } else {
            // finds from (min) and to (max) dates
            from = new Date(Math.min(from.getTime(), new Date(elem.from).getTime()));
            to = new Date(Math.max(to.getTime(), new Date(elem.to).getTime()));
        }
    }

    //noinspection SpellCheckingInspection
    const result: IGenerationData = {
        // undefined handled at filterData length check
        from: (from as Date).toISOString(),
        to: (to as Date).toISOString(),
        generationmix: Object.entries(fuelValues).map((
            [fuel, perc]) => ({fuel, perc: perc / counter} )
        )
    }
    return result;
}

export interface IStats {
    today: IGenerationData,
    tomorrow: IGenerationData,
    afterTomorrow: IGenerationData,
}

export default async function transformStats(data: IGenerationResponse): Promise<IStats> {
    const ans = {
        "today": await filterAndMergeData(data.data, new Date()),
        "tomorrow": await filterAndMergeData(data.data, new Date(new Date().getTime() + 1000 * 60 * 60 * 24)),
        "afterTomorrow": await filterAndMergeData(data.data, new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 2)),
    }
    return ans;
}
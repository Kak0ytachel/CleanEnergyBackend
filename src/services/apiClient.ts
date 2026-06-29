

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


async function test () {
    const data = await getGeneration();
    console.log(data);
    console.log(data.data[0])
}

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

async function processData() {
    const data = await getGeneration();
    console.log(123);

    const ans = {
        "today": await filterAndMergeData(data.data, new Date()),
        "tommorow": await filterAndMergeData(data.data, new Date(new Date().getTime() + 1000 * 60 * 60 * 24)),
        "afterTommorow": await filterAndMergeData(data.data, new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 2)),
    }

    console.log(ans);


}

processData()


interface IGenerationResponse {
    data: Array<IGenerationData>
}


interface IGenerationData {
    from: string;
    to: string;
    //noinspection SpellCheckingInspection
    generationmix: Array<IGenerationMixItem>
}

interface IGenerationDataReducer extends IGenerationData{
    count: number
}

interface IGenerationMixItem {
    fuel: string,
    //noinspection SpellCheckingInspection
    perc: number
}
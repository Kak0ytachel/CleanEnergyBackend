import {describe, it, expect} from "vitest";
import type {ICleanEnergyInterval, IGenerationResponse} from "../../src/types.ts";
import transformOptimal from "../../src/transformers/optimalTransformer.ts";


describe("optimalTransformer", () => {

    it("should return correct interval 1", () => {
        const payload: IGenerationResponse = {
            data: [
                { from: "123", to: "123", generationmix: [] }, // 0-th is ignored
                {
                    from: "2023-01-01T00:00:00.000Z",
                    to: "2023-01-01T00:30:00.000Z",
                    generationmix: [
                        { fuel: "coal", perc: 1 },
                    ]
                },
                {
                    from: "2023-01-01T00:30:00.000Z",
                    to: "2023-01-01T01:00:00.000Z",
                    generationmix: [
                        { fuel: "biomass", perc: 0.5 },
                        { fuel: "nuclear", perc: 0.5 },
                    ]
                },
                {
                    from: "2023-01-01T01:00:00.000Z",
                    to: "2023-01-01T01:30:00.000Z",
                    generationmix: [
                        { fuel: "biomass", perc: 0.5},
                        { fuel: "coal", perc: 0.5}
                    ]
                },
                {
                    from: "2023-01-01T01:30:00.000Z",
                    to: "2023-01-01T02:00:00.000Z",
                    generationmix: [
                        { fuel: "coal", perc: 0.5},
                        { fuel: "wind", perc: 0.5}
                    ]
                }
            ]
        }
        const interval: ICleanEnergyInterval = transformOptimal(payload, 1);
        expect(interval).toStrictEqual({
            from: "2023-01-01T00:30:00.000Z",
            to: "2023-01-01T01:30:00.000Z",
            perc: 0.75
        })
    });

    it("should return correct interval 2", () => {
        const payload: IGenerationResponse = {
            data: [
                { from: "123", to: "123", generationmix: [] }, // 0-th is ignored
                {
                    from: "2023-01-01T00:00:00.000Z",
                    to: "2023-01-01T00:30:00.000Z",
                    generationmix: [
                        { fuel: "coal", perc: 1 },
                    ]
                },
                {
                    from: "2023-01-01T00:30:00.000Z",
                    to: "2023-01-01T01:00:00.000Z",
                    generationmix: [
                        { fuel: "biomass", perc: 0.5 },
                        { fuel: "gas", perc: 0.5 },
                    ]
                },
                {
                    from: "2023-01-01T01:00:00.000Z",
                    to: "2023-01-01T01:30:00.000Z",
                    generationmix: [
                        { fuel: "biomass", perc: 0.5},
                        { fuel: "coal", perc: 0.5}
                    ]
                },
                {
                    from: "2023-01-01T01:30:00.000Z",
                    to: "2023-01-01T02:00:00.000Z",
                    generationmix: [
                        { fuel: "coal", perc: 0.5},
                        { fuel: "wind", perc: 0.5}
                    ]
                }
            ]
        }
        const interval: ICleanEnergyInterval = transformOptimal(payload, 1);
        expect(interval).toStrictEqual({
            from: "2023-01-01T00:30:00.000Z",
            to: "2023-01-01T01:30:00.000Z",
            perc: 0.5
        })
    });

    it("should return correct interval 3", () => {
        const payload: IGenerationResponse = {
            data: [
                { from: "123", to: "123", generationmix: [] }, // 0-th is ignored
                {
                    from: "2023-01-01T00:00:00.000Z",
                    to: "2023-01-01T00:30:00.000Z",
                    generationmix: [
                        { fuel: "coal", perc: 1 },
                    ]
                },
                {
                    from: "2023-01-01T00:30:00.000Z",
                    to: "2023-01-01T01:00:00.000Z",
                    generationmix: [
                        { fuel: "biomass", perc: 0.5 },
                        { fuel: "gas", perc: 0.5 },
                    ]
                },
                {
                    from: "2023-01-01T01:00:00.000Z",
                    to: "2023-01-01T01:30:00.000Z",
                    generationmix: [
                        { fuel: "coal", perc: 1}
                    ]
                },
                {
                    from: "2023-01-01T01:30:00.000Z",
                    to: "2023-01-01T02:00:00.000Z",
                    generationmix: [
                        { fuel: "coal", perc: 0.5},
                        { fuel: "wind", perc: 0.5}
                    ]
                },
                {
                    from: "2023-01-01T02:00:00.000Z",
                    to: "2023-01-01T02:30:00.000Z",
                    generationmix: [
                        { fuel: "coal", perc: 0.5},
                        { fuel: "nuclear", perc: 0.5}
                    ]
                }
            ]
        }
        const interval: ICleanEnergyInterval = transformOptimal(payload, 1);
        expect(interval).toStrictEqual({
            from: "2023-01-01T01:30:00.000Z",
            to: "2023-01-01T02:30:00.000Z",
            perc: 0.5
        })
    });

})
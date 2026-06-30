import buildApp from "../../src/app.ts";
import type {FastifyInstance} from "fastify";
import {describe, expect, beforeEach, afterEach, it} from "vitest";
import type {IEnergyTypeItem} from "../../src/types.ts";

// test('GET /stats returns 200', async () => {
//     const app = buildApp()
//     const res = await app.inject({ method: 'GET', url: '/stats' })
//     expect(res.statusCode).toBe(200)
// })

describe("GET /stats route", () => {
    let app: FastifyInstance;

    beforeEach(() => {
        app = buildApp();
    });

    afterEach(async () => {
        await app.close();
    });

    it('should return 200', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/stats'
        });

        expect(response.statusCode).toBe(200);
    })

    it ('should have today, tomorrow and afterTomorrow', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/stats'
        });

        const data = await response.json();
        expect(data).toEqual({
            today: expect.any(Object),
            tomorrow: expect.any(Object),
            afterTomorrow: expect.any(Object)
        });
    })

    it ('should have correct children keys', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/stats'
        });

        const data = await response.json();
        for (const child of Object.values(data)) {
            expect(child).toEqual({
                from: expect.any(String),
                to: expect.any(String),
                generationmix: expect.any(Array)
            })
        }
    })

    it ('should have correct generationmix children keys', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/stats'
        });

        const data = await response.json();
        for (const child of Object.values(data)) {
            const mix: IEnergyTypeItem[] = (child as any).generationmix!;
            for (const item of mix) {
                // console.log(item);
                expect(item).toEqual({
                    fuel: expect.any(String),
                    perc: expect.any(Number)
                })
            }
        }
    })



})
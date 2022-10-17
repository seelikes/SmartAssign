/**
 * Created by liutiantian on 2017/7/6.
 */

'use strict';

let smartAssign = require('../lib/index');

function closure() {
    let data = 'data';

    return smartAssign(
        {},
        {
            a: {
                a1: 'a1',
                a2: () => {
                    return 'a2';
                },
            },
            b: {
                b1: function () {
                    console.log('b1 enter.')
                },
                b2: function () {
                    return data;
                }
            },
        }
    );
}

describe('smartAssign', () => {
    console.log("smartAssign, enter.");

    test('JavaScript Closure!', () => {
        expect(closure().b.b2()).toBe('data');
    });

    test('Simple Assign Two!', () => {
        let a = smartAssign(
            {},
            {
                b: 'b1',
                c: true,
            }
        );
        expect(a.b).toBe('b1');
        expect(a.c).toBe(true);
    });

    test('Simple Assign Three!', () => {
        let a = smartAssign(
            {},
            {
                b: 'b1',
                c: true,
            },
            {
                b: 'b2',
                c: 1,
            }
        );
        expect(a.b).toBe('b2');
        expect(a.c).toBe(1);
    });

    test('Array Assign!', () => {
        let a = smartAssign(
            {},
            {
                a: 'a1',
                b: 'b1',
            },
            {
                b: [
                    'b1',
                    {
                        b2: 'b2',
                    },
                ]
            }
        );
        expect(a.a).toBe('a1');
        expect(a.b).toBeDefined();
        expect(a.b).toBeInstanceOf(Array);
        expect(a.b.length).toBe(2);
        expect(a.b[1].b2).toBe('b2');
    });

    test('Array Assign to Array', () => {
        let a = smartAssign(
            {},
            {
                ar: [
                    1,
                    2,
                    3,
                ]
            },
            {
                ar: [
                    '1',
                    2,
                    '3456',
                ]
            }
        );
        console.log(a);
        expect(a.ar).toBeInstanceOf(Array);
        expect(a.ar[0]).toBe('1');
        expect(a.ar[1]).toBe(2);
        expect(a.ar[2]).toBe('3456');
    });

    test('naked array assign to empty array', () => {
        let a = smartAssign(
            [],
            [
                1,
                2,
                3,
            ]
        )
        console.log(a);
        expect(a).toBeInstanceOf(Array);
        expect(a).toHaveLength(3)
        expect(a[0]).toBe(1);
        expect(a[1]).toBe(2);
        expect(a[2]).toBe(3);
    })

    test('null assign to simple property', () => {
        let a = smartAssign(
            {
                a: 'a',
                b: 1,
            },
            {
                a: null,
                b: null,
            }
        )
        console.log(a)
        expect(a).toHaveProperty('a', null)
        expect(a).toHaveProperty('b', null)
    })

    test('date assign', () => {
        const oldDate = new Date()
        let a = smartAssign(
            {
                date: oldDate,
            },
            {
                date: new Date(),
            }
        )
        console.log(a)
        expect(a.date).toBeDefined()
        expect(a.date).toBeInstanceOf(Date)
    })

    test('objects without prototype', () => {
        const oldData = Object.create(null, {
            a: {
                value: 'ha ha',
            }
        })
        console.log('oldData: %o', oldData)
        const newData = Object.create(null, {
            a: {
                value: 'ah ah',
            }
        })
        console.log('newData: %o', newData)
        const curlyBracesLead = smartAssign(
            {},
            oldData,
            newData
        )
        console.log('curlyBracesLead: %o', curlyBracesLead)
        expect(oldData.a).toBe('ha ha')
        // Objects without prototype can not be copied
        expect(curlyBracesLead.a).toBe(undefined)

        const new2Old = smartAssign(
            oldData,
            newData
        )
        // Objects without prototype can not be copied
        expect(new2Old.a).toBe('ha ha')
    })
});
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
});
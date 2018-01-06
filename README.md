# SmartAssign
a smarter version of Object.assign.
deep assign when Object.assign is defined, otherwise, it will deep copy every property iterately.

## install
npm install --save smart-assign

## require and attention
this library use es2015 to write its code, this may cause any project using this library also need to use es2015.

## usage example

<code>
    'use strict'; 

    import smartAssign from '../lib/index';  

    let data = 'data';  

    smartAssign(  
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
                },  
            },  
        }  
    ); 
</code>

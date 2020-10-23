/* 
Variables & DataTYpes
************

//Number
var age=28;
console.log(age);

//String
var firstName ='John';
console.log(firstName);

//Boolean
var fullAge = false;
console.log(fullAge);

//undefined
var teacher;
console.log(teacher);
 */

 /* 
/* Type Coercion & Variable Mutation 
************

var age=28;
var ageString='28';
var firstName ='John';

// Type Coercion <- the number & boolean is converted to string
console.log( firstName + ' '+ age);


var job, isMarried;
job='Teacher';
isMarried = false;

console.log(firstName +' is a '+ age +' years old ' + job +
'. Is he Married ?'+isMarried
)

//Variable Mutation <- contents/datatyes can be changed in JS
age ='twenty eight';
job = 'driver';

// alert window Example
alert( firstName +' is a '+ age +' years old ' + job +
'. Is he Married ?'+isMarried )

//prompt window example
var lastName = prompt('What is his Last Name ?');
console.log( firstName +' '+ lastName); */

/******
 * Truthy,Falsy values and equality operators
 * 
 * falsy values : undefined , null, 0, '',NaN
 * truthy values : NOT falsy values
 */

/* var height =23;
if( height || height === 0 )
console.log('Variable is defined')

else
console.log ('variable is not defined')

//equality operator
if( height =='23')
console.log('The == operator does type coercion, operands can be different type')

if( height === 23)
console.log('The === operator is stricter operands should have same type') */


/*
Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!

This time, John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42.
John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

Implement a tip calculator using objects and loops:
1. Create an object with an array for the bill values
2. Add a method to calculate the tip
3. This method should include a loop to iterate over all the paid bills and do the tip calculations
4. As an output, create 1) a new array containing all tips, and 2) an array containing final paid amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.


EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $375, $110, and $45.
Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is between $100 and $300, and 25% if the bill is more than $300 (different than John).

5. Implement the same functionality as before, this time using Mark's tipping rules
6. Create a function (not a method) to calculate the average of a given array of tips. HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). After you have the sum of the array, divide it by the number of elements in it (that's how you calculate the average)
7. Calculate the average tip for each family
8. Log to the console which family paid the highest tips on average*/

var john = {
    actualBill : [124,48,268,180,42],
    tips: [],
    finalBill:[],
    calcTip: function()
    {     
          for( var i = 0; i< this.actualBill.length ; i++ )
          {     var tipShare = 0
                var bill = this.actualBill[i]  
                if( bill < 50)
                {
                    tipShare = .2
                }

                else if (bill >= 50 && bill <= 200)
                {
                    tipShare = .2
                }

                else {
                    tipShare = .1
                }
               
                this.tips[i] = tipShare * bill
                this.finalBill[i] = this.tips[i] + bill
          }
    } 

}

john.calcTip()

console.log(john.tips,john.finalBill)


var mark = {
    actualBill : [77,375,110,45],
    tips: [],
    finalBill:[],
    calcTip: function()
    {     
          for( var i = 0; i< this.actualBill.length ; i++ )
          {     var tipShare = 0
                var bill = this.actualBill[i]  
                if( bill < 100)
                {
                    tipShare = .2
                }

                else if (bill >= 100 && bill <= 300)
                {
                    tipShare = .1
                }

                else {
                    tipShare = .25
                }
               
                this.tips[i] = tipShare * bill
                this.finalBill[i] = this.tips[i] + bill
          }
    } 

}
mark.calcTip()
console.log(mark.tips,mark.finalBill)
var johnAvgTip,markAvgTip;

johnAvgTip = avgTip(this.john.tips)

markAvgTip= avgTip(this.mark.tips)

if(johnAvgTip > markAvgTip)
{
    console.log(' John family give higher tips on average')
}

else if ( markAvgTip > johnAvgTip )
{
    console.log(' Mark family give higher tips on average')
}

else{
    console.log(' Both give same tips on avg')
}


function avgTip(tips)
{  var sum =0;
    for (i=0 ;i< tips.length ; i++ )
    {
        sum += tips[i]
    }

    return sum / tips.length
}
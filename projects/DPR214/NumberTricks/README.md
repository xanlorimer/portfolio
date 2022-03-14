# Number Tricks Project

Implements this number trick:

    1. Choose an integer and add 9 to it.
    2. Multiply the result by 2.
    3. Subtract 4.
    4. Divide this result by 2.
    5. Subtract the original integer.

The answer is always seven. It's not hard to change the result of the algorithm, though. The key to the trick is the number 9 in step 1 and the number 4 in step 3; 4/2 gets subtracted from 9, so by changing the number 9 to something else, and changing theh number 4 to double what you wish to subtract from 9, you can cause the algorithm to output whatever final number you want. For example, if I wanted an output of 8 instead, I would leave the number 9 as is and change 4 to 2, because 9-(2/2)=8. If I wanted to output 16, I might change the number 9 to 20 (this can be any number, it just has to be larger than the output you desire), and change the 4 to an 8: 20-(8/2)=16. More succinctly: a-(b/2)=c, where c is your desired output, a > c, and an even integer b makes the whole thing true. 
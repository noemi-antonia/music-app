let firstExercise = array => {
    for (const element of array) {
        console.log(`${element} + 15 * ${element} = ${element + 15 * element}`);
      }
}

let secondExercise = array => {

    function calculate([firstNum, ...rest]) {
        const restDuplicate = rest.length ? calculate(rest) : [];
        return [firstNum * 10 + firstNum , ...restDuplicate];
    }    

    console.log(array);
    console.log(calculate(array));

}


const test = [0,1,2,3,4,5,6,7,8,9,10];
firstExercise(test);
secondExercise(test);


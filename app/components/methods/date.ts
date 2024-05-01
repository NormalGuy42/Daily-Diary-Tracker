export function getDay(date:string){
     return parseInt(date.split('-')[2]);
}
export function getMonth(date:string){
     return parseInt(date.split('-')[1]);
}
export function getYear(date:string){
     return parseInt(date.split('-')[0]);
}

export function formatMonth(monthIndex:number){
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months[monthIndex-1];
}
export function formateDay(day:number){
   const adjectives = ['st','nd','rd','th'];
   let dayNumber = day.toString().split('');
   let lastNumber = parseInt(dayNumber[1]) ;
   if(day < 4 ){
        return adjectives[day-1];
   }
   if(day < 21){
        return 'th';
   }
   if(lastNumber<4 && lastNumber > 0 ){
        return adjectives[lastNumber-1];
   }
   return 'th';
}

//Turn timestamp data into date string ex: January 1st 2024
export function formatDate(date:string){
     // Remove 1 from the function to get the right index from formatMonth()
    let month = formatMonth(getMonth(date));
    let day = getDay(date);
    //Remove Day, Month and time to get the year
    let year = getYear(date);
    let result = `${month} ${day}${formateDay(day)} ${year}`;
    return result;
}


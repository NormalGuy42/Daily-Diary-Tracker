import { getMonth, getYear } from "./date";

export function truncate(textData:string){
    const chars = ['.',',',];
    var text = textData;

    text = text.replace(/\\/g, '')
    try{
        if(text != null ){
            if(text.length >= 330){
                var result = text.substring(0,320);
                result = result.trim();            

                var lastChar = result.charAt(result.length-1);
                if(chars.includes(lastChar)){
                    return result;
                }
                return result + '...';
            }
            return text;
        }
    }catch(e){
        console.log(e)
    }
}

//Layout for records sorted by month and year ex: January 2024
//Really proud of this one
export function getLibraryLayout(list:Array<RecordType>){
    let previousMonth;
    let previousYear;
    let month;
    let year;
    //Index to position the records in the right index
    let index = 0;
    let result:Array<LibraryLayoutData> = [];
    
    //Initialize variables with first results
    previousMonth = getMonth(list[0].created_at);
    previousYear = getYear(list[0].created_at)
    result.push({"month":previousMonth,"year":previousYear,"records":[]})

    for(var i = 0;i<list.length; i++){
        month = getMonth(list[i].created_at);
        year = getYear(list[i].created_at);

        //Push records into the first month
        if(month <= previousMonth && year <= previousYear){
            result[index].records.push(list[i]);
        }

        //Handle different months in the year
        else if(month > previousMonth && year <= previousYear){
            //Move forward in the list
            index++
            previousMonth = month;
            result.push({"month":previousMonth,"year":previousYear,"records":[list[i]]})
        }

        //Handle different year
        else{
            //Move forward in the list
            index++
            previousYear = year
            result.push({"month":previousMonth,"year":previousYear,"records":[list[i]]})
        }
    }
    return result;
}

//Layout for Emotion stuff
export function getEmotionLayout(list:Array<RecordType>){
    let previousYear;
    let year;
    //Index to position the records in the right index
    let index = 0;
    let result:Array<EmotionLayoutData> = [];
    
    //Initialize variables with first results
    previousYear = getYear(list[0].created_at)
    result.push({"year":previousYear,"records":[]})

    for(var i = 0;i<list.length; i++){
        year = getYear(list[i].created_at);

        //Push records into the first month
        if(year <= previousYear){
            result[index].records.push(list[i]);
        }

        //Handle different months in the year
        else if(year <= previousYear){
            index++
            //Move forward in the list
            previousYear = year;
            result.push({"year":previousYear,"records":[list[i]]})
        }

    }
    return result;
}
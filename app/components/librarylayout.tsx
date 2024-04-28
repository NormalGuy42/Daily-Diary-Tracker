import RecordBox from "./recordBox";
import '../types/customTypes'
import { formatMonth } from "./methods/date";
import FavoriteBox from "./favoriteBox";
import { useState } from "react";


export function LibraryLayout(props:{data:LibraryLayoutData,type:string}){
    const title = `${formatMonth(props.data.month)} ${props.data.year}`;
    const [records,setRecords] = useState<Array<RecordType>>(props.data.records);
    
    const handleRecords = (data:Array<RecordType>) =>{
        setRecords(data);
    }

    return(
        <div>
            <h2 className="sub-heading">{title}</h2>
            <div className="grid justify-items-center p-4 mb-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12">
                {
                    props.type == "favorite"?
                        records.map((record: RecordType,index)=><FavoriteBox key={index + 1} data={record} records={records} setRecords={handleRecords}/>)
                    :
                        records.map((record: RecordType,index)=><RecordBox key={index + 1} data={record}/>)
                }                
            </div>
        </div>
    );
}
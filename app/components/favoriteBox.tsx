import Link from 'next/link';
import '../types/customTypes'
import { formatDate } from './methods/date';
import { truncate } from './methods/methods';
import { updateLike } from '../api/actions';

export default function FavoriteBox(props:{data: RecordType,records:Array<RecordType>,setRecords:Function}){
    
    const date = formatDate(props.data.created_at)
    const title = props.data.title.replace(/\\/g, '')

    const deleteLike = (id:number)=>{
        const filteredRecords = props.records.filter(record => record.id !== id);
        props.setRecords(filteredRecords);
    }
    const FavoriteBtn = function(props:{recordID:number}){
        async function fetchLike(){
            let result = await updateLike(props.recordID,true);
            if(result == 200){
                deleteLike(props.recordID)
            }
        }
    
        return(
            <button onClick={fetchLike} className="absolute right-0 top-[-8px] bg-transparent h-16 w-16 border-none cursor-pointer flex justify-center items-center">           
                {
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='red' height={36} width={36}>
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                    </svg>
                }
            </button>
        );
    }   


    return(
        <div className='relative'>
            <FavoriteBtn recordID={props.data.id}/>
            <Link href={"library/"+props.data.id}>
                <div className='record-box max-h-300 max-w-280 cursor-pointer'>
                    <div className='record-inner-box component-bg rounded-md p-4 border border-black'>
                        <span className='font-bold'>{date}</span>
                        <p className='record-text max-h-280'>{truncate(props.data.text)}</p>
                    </div>
                    <h3 className='text-center'>{props.data.emoji}</h3>
                    <h3 className='text-balance text-center'>{title}</h3>
                </div>
            </Link>
        </div>
    );
}
import '../types/customTypes'
import Link from 'next/link'
import { formatDate } from './methods/date';
import { truncate } from './methods/methods';

export default function RecordBox(props:{data: RecordType}){
    
    const date = formatDate(props.data.created_at);
    const title = props.data.title.replace(/\\/g, '');
    
    // Store data in local storage
    
    return(
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
    );
}
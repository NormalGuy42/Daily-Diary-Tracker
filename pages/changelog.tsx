import ReturnBtn from '@/app/components/buttons/returnBtn';
import '../app/globals.css';
import Header from '@/app/components/header';

export default function Changelog(){
    // const text = `
    // # Daily-Diary-Tracker\ 

    // A NextJS project that allows me to keep data about my days and the overall emotion about the day through the year.

    // ## v.1.0.0 - 2024-04-

    // -**Added favorites**: Can save special records by liking records  
    // -**Added emotion tracker**: Added a page with a summary of all the emotion scores  
    // -**Added theme switcher**: I can now switch between light and dark theme  
    // -**Added changelog page**: Check the evolution of the project through updates  
    // -**Added authentication**: Protect the data with auth  
    // `;
    
    return(
        <div>
            <Header>
                <ReturnBtn/>
            </Header>
           <div>
            <h1 className='text-2xl bold m-5 font-bold'>Daily-Diary-Tracker</h1>
            <p className='mx-5'>A NextJS project that allows me to keep data about my days and the overall emotion about the day through the year.</p>


            <h2 className='text-xl bold m-5 font-bold'>v.1.0.0 - 2024-04-</h2>

            <p className='mx-5'>
            -<strong>Added favorites:</strong> Can save special records by liking records  <br />
            -<strong>Added emotion tracker:</strong> Added a page with a summary of all the emotion scores <br /> 
            -<strong>Added theme switcher:</strong> I can now switch between light and dark theme  <br />
            -<strong>Added changelog page:</strong> Check the evolution of the project through updates  <br />
            -<strong>Added authentication:</strong> Protect the data with auth  <br />
            </p>
           </div>
        </div>
    )
}
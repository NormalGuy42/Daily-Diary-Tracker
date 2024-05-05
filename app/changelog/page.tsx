'use client';

import ReturnBtn from '../components/buttons/returnBtn';
import '../globals.css';
import Header from '../components/header';
import { AuthProvider } from '../authprovider';

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
        <AuthProvider>
        <div>
                <Header>
                    <ReturnBtn/>
                </Header>
            <div>
                <h1 className='text-2xl bold m-5 font-bold'>Daily-Diary-Tracker</h1>
                <p className='mx-5'>A NextJS project that allows me to keep data about my days and the overall emotion about the day through the year.</p>


                <h2 className='text-xl bold m-5 font-bold'>v.1.1.0 - 2024-05-05</h2>

                <p className='mx-5'>
                -<strong>Added server actions:</strong> Removed client-side fetching for server actions due to security issues <br />
                -<strong>Updated project router:</strong> Changed from pages router to app router  <br />
                -<strong>Updated form layout:</strong> Centered the form on the page <br />
                -<strong>Theme Button:</strong> Theme Button finally works <br />


                
                </p>

                <h2 className='text-xl bold m-5 font-bold'>v.1.0.0 - 2024-04-30</h2>

                <p className='mx-5'>
                -<strong>Added favorites:</strong> Can save special records by liking records  <br />
                -<strong>Added emotion tracker:</strong> Added a page with a summary of all the emotion scores <br /> 
                -<strong>Added theme switcher:</strong> I can now switch between light and dark theme  <br />
                -<strong>Added changelog page:</strong> Check the evolution of the project through updates  <br />
                -<strong>Added authentication:</strong> Protect the data with auth  <br />
                </p>
            </div>
        </div>
        </AuthProvider>
    )
}
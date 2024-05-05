'use client';

import ColorPicker from "../../components/colorPicker";
import '../../globals.css';
import { useEffect, useState } from "react";
import { setCookie } from 'nookies';
import { Providers } from "../../providers";
import { AuthProvider } from "../../authprovider";
import { getFormDate, postData } from "@/app/api/actions";
import { usePathname } from "next/navigation";



export default function Form() {
  const router = usePathname();
  const id  = router.split('/')[2];
  
  const emptyForm: FormType = ({
    title: '',
    emoji: '',
    color: 0,
    text: '',
    favorite: 0,
    date: '',
  });

  const [formDate,setFormDate] = useState('')
  const [formData, setFormData] = useState<FormType>(emptyForm);
  const [isLoading, setIsLoading] = useState(false);
  //Check if form was saved in local storage
  const [restartValue,setRestartValue] = useState(false);

  //Get the date from the fetched data
  const getData = async()=>{
    const {data, isError, error} = await getFormDate(`${id}`);
    if(!isError){
      setFormDate(data[0].date)
    }else{
      console.log(error)
      window.location.replace('/not-found')
    }
  }

  
  
  useEffect(() => {
    getData();
    
    let savedForm = localStorage.getItem('savedForm');
    if(savedForm) {
      let newForm: FormType = JSON.parse(savedForm) || emptyForm;
      let value = newForm !== emptyForm? true : false
      // we explicitly get name and mobile value in case localStorage was manually modified. 
      setRestartValue(value)
      setFormData(newForm);
    }
    
  },[]) 

  const handleColorChange = (n:number)=>{
    formData.color = n;
    localStorage.setItem('savedForm', JSON.stringify(formData));
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newForm = {...formData, [e.target.name]: e.target.value,};
    setFormData(newForm)
    localStorage.setItem('savedForm', JSON.stringify(newForm));
  };

  

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){

    e.preventDefault();
    setIsLoading(true);

    //Set correct date
    formData.date = formDate
    
    
    const {data, isError, error} = await postData(formData,id);

    if(!isError){
      if(data == 200){
        localStorage.removeItem('savedForm');
        setCookie(null, 'flashMessage', 'Form submitted successfully', {
          maxAge: 300, // Cookie expires after 300 seconds
          path: '/', // Cookie is accessible across all pages
        });
        window.location.href = "/";
      }
    }else{
      setTimeout(()=>{
        setIsLoading(false);
      },2000)
      console.log(error)
    }
    
  };

  return (
    <AuthProvider>
      <main className="w-full h-full min-h-screen flex items-center justify-center">
        <form className="max-w-xs" onSubmit={handleSubmit} >
          <h1 className="text-2xl font-medium my-1 ">What is the title of today?</h1>
          <input className="shadow appearance-none my-2 border rounded w-full py-4 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                type="text" 
                placeholder="Enter a title" 
                name="title" 
                autoComplete="off"
                value={formData.title}
                onChange={handleChange}
                required
          />
          <h1 className="text-2xl font-medium my-1">Pick a color</h1>
          <ColorPicker changeColor={handleColorChange} value={formData.color} restartStatus={restartValue}/>
          <h1 className="text-2xl font-medium my-1 ">Pick an emoji</h1>
          <input className="shadow appearance-none border my-1 rounded w-full py-4 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                type="text" 
                placeholder="Choose an emoji" 
                name="emoji" 
                autoComplete="off"
                value={formData.emoji}
                onChange={handleChange}
                required
          />
          <h1 className="text-2xl font-medium my-1 ">How was your day?</h1>
          <textarea className="textarea my-1 shadow appearance-none border rounded w-full py-4 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                name="text" 
                id="textarea" 
                rows={5} 
                placeholder="Say something..."
                value={formData.text}
                onChange={handleChange}
                required
          >
          </textarea>
          <button className="px-4 my-1 py-4 font-bold text-2xl text-white w-full bg-blue-500 hover:bg-blue-700" type="submit">{isLoading ? 'Loading...' : 'Record this day'}</button>
        </form>
      </main>
    </AuthProvider>
  )
}


// I started the day watching "Spaceman", that movie with Adam Sandler playing a Czech astronaut. It was 3am and it felt kinda trippy because I was still kinda tired and there was a weird fucking talking spider in the movie, like wtf. I haven't finished the movie yet. I went to sleep.

// When I woke up, I had received an alert from Time saying that I had 2 days to pay my bills before they cut that shit off, so I immediately went to the app paid that shit. I think internet might the most important ressource I have. Like I feel more safe having internet than having food. Prolly because I have eaten enough to survive for like 10 days on water alone. But yeah, I payed that shit and went about my day.

// Drake dropped "Family Matters" and Kendrick dropped "Meet the Grahams" right after and it was crazy. This shit kinda tragic, I feel kinda bad for Drake because that track was really hard to listen to, so I can only imagine how it was for Drake. I don't really feel like talking more about this because this diary kinda about me, I AM THE MAIN CHARACTER OF THIS. My entire internet experience is getting flooded with this rap beef. Whether it is Youtube or Twitter, I can't escape it man.

// I wanted to put a beef emoji but they don't have this rn, so yeah you get this raw steak. The emoji was supposed to represent the rap beef and the beef I ate today when I ordered Burger King. I ate "Single Beefacon" and a "Mushroom Swiss Single" along with 2 "Hershey's pies", I am getting too good at memorizing these names bruh. Remember what I said about boycotting right? So yeah this is the last time you're eating KFC, Burger King, Pizza Hut or McDonald's. We getting serious bout this.

// I bought a couple chocolates and shit. Watched an interracial video of Sara Jay that was just as baller as I remember. I really liked that video and was filled with a strong urge to watch it, I still spilled my seed to that comic of MelkorMancin about Chloe summoning demons. You know I realize how weird it is to talk about beating my meat in my diaries cuz it's not like this is something you'd want to revisit, so Imma try to chill about it.

// I received a couple of messages and calls from my parents. Haven't responded yet.

// Yeah, see you tomorrow
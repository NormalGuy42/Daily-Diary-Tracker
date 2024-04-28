import ColorPicker from "../../app/components/colorPicker";
import '@/app/globals.css';
import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { setCookie } from 'nookies';
import { Providers } from "@/app/providers";
import { AuthProvider } from "@/app/authprovider";


interface FormCodeProps{
  codeData: [FormCode];
}

export const getStaticPaths:GetStaticPaths = async ()=>{
  const res = await fetch("https://m1000.me/diary/api/allFormID.php",{
      headers:{
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${process.env.API_KEY}`,
      }
  });
  const data = await res.json();
  const paths = data.map((formID:FormCode) =>{
      return{
          params: {formID: formID.code}
      }
  })
  return{
      paths: paths,
      fallback: false,
  }
}
export const getStaticProps:GetStaticProps = async (context)=>{
  const id = context.params!.formID;

  const res = await fetch("https://m1000.me/diary/api/getFormID.php?id=" + id,{
      headers:{
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${process.env.API_KEY}`,
      }
  });
  const data = await res.json();

  return{
      props: {
        codeData: data,
      }
  }
}




export default function Form(form:FormCodeProps) {
  //Get the date from the fetched data
  const data = form.codeData[0];
  const emptyForm: FormType = ({
    title: '',
    emoji: '',
    color: 0,
    text: '',
    favorite: 0,
    date: data.date,
  });
  const [formData, setFormData] = useState<FormType>(emptyForm);
  //Check if form was saved in local storage
  const [restartValue,setRestartValue] = useState(false);
  
  useEffect(() => {
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

    try{
      const res = await fetch("https://m1000.me/diary/api/api-diary.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify({...formData,code:data.code}),
      });
  
      const result = await res.json();
    
      if(result.code !== undefined){
        if(result.code == 200){
          localStorage.removeItem('savedForm');
          setCookie(null, 'flashMessage', 'Form submitted successfully', {
            maxAge: 300, // Cookie expires after 300 seconds
            path: '/', // Cookie is accessible across all pages
          });
          window.location.href = "/";
        }
        
      }
    }catch(error){
      console.error("Error submitting form",error)
    }
  };

  return (
    <Providers>
      <AuthProvider>
        <main className="w-full h-full flex items-center justify-center">
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
            <button className="px-4 my-1 py-4 font-bold text-2xl text-white w-full bg-blue-500 hover:bg-blue-700" type="submit">Record this day</button>
          </form>
        </main>
      </AuthProvider>
    </Providers>
  )
}

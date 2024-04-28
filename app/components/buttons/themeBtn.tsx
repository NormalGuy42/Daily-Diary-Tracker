'use client';

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"
import CustomButton from './customBtn';

function SunIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 50 50">
            <path fill="#FF9800" d="M11 11H37V37H11z"></path><path fill="#FF9800" d="M11.272 11.272H36.728V36.728H11.272z" transform="rotate(-45.001 24 24)"></path><path fill="#FFEB3B" d="M13,24c0,6.077,4.923,11,11,11c6.076,0,11-4.923,11-11s-4.924-11-11-11C17.923,13,13,17.923,13,24"></path>
        </svg>
    );
}
function MoonIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" version="1.1" id="Layer_1" viewBox="0 0 512 512">
        <path fill="#FFD500" d="M219.793,256c0-106.304,77.081-194.595,178.399-212.056c-36.48-21.438-78.971-33.745-124.344-33.745  C138.096,10.199,28.048,120.248,28.048,256s110.048,245.801,245.801,245.801c45.372,0,87.863-12.307,124.344-33.745  C296.874,450.595,219.793,362.304,219.793,256z"/>
        <g>
            <path fill="#3D3D3D;" d="M399.924,458.005C301.459,441.035,229.992,356.08,229.992,256S301.459,70.965,399.924,53.995   c4.218-0.727,7.534-4.011,8.302-8.223c0.768-4.211-1.176-8.453-4.866-10.622C364.227,12.155,319.443,0,273.849,0   C205.468,0,141.181,26.628,92.83,74.981C44.477,123.333,17.849,187.619,17.849,256S44.477,388.667,92.83,437.019   C141.181,485.372,205.468,512,273.849,512c45.595,0,90.378-12.155,129.511-35.151c3.69-2.169,5.634-6.411,4.866-10.622   C407.457,462.016,404.142,458.732,399.924,458.005z M273.849,491.602c-129.911,0-235.602-105.69-235.602-235.602   S143.937,20.398,273.849,20.398c32.902,0,65.338,6.873,95.167,20.039c-40.885,12.529-77.747,36.647-105.786,69.61   C228.643,150.71,209.594,202.543,209.594,256s19.049,105.29,53.636,145.953c28.039,32.963,64.902,57.081,105.786,69.61   C339.187,484.728,306.75,491.602,273.849,491.602z"/>
            <path fill="#3D3D3D;" d="M77.402,268.615c-0.264-4.17-0.398-8.415-0.398-12.615c0-5.632-4.567-10.199-10.199-10.199   S56.606,250.368,56.606,256c0,4.627,0.148,9.305,0.438,13.903c0.342,5.402,4.829,9.556,10.17,9.556c0.216,0,0.434-0.007,0.654-0.02   C73.487,279.083,77.756,274.238,77.402,268.615z"/>
            <path fill="#3D3D3D;" d="M163.315,418.906c-32.255-21.931-57.072-52.536-71.769-88.507c-2.13-5.214-8.08-7.714-13.299-5.584   c-5.214,2.131-7.714,8.085-5.584,13.299c16.218,39.696,43.599,73.466,79.182,97.66c1.756,1.194,3.751,1.765,5.726,1.765   c3.263,0,6.47-1.564,8.443-4.465C169.181,428.417,167.972,422.073,163.315,418.906z"/>
            <path fill="#3D3D3D;" d="M453.355,253.96v-16.319h16.319c5.632,0,10.199-4.567,10.199-10.199   c0-5.632-4.567-10.199-10.199-10.199h-16.319v-16.319c0-5.632-4.567-10.199-10.199-10.199c-5.632,0-10.199,4.567-10.199,10.199   v16.319h-16.319c-5.632,0-10.199,4.567-10.199,10.199c0,5.632,4.567,10.199,10.199,10.199h16.319v16.319   c0,5.632,4.567,10.199,10.199,10.199C448.787,264.159,453.355,259.592,453.355,253.96z"/>
            <path fill="#3D3D3D;" d="M351.873,351.873c5.632,0,10.199-4.567,10.199-10.199v-10.709h10.709   c5.632,0,10.199-4.567,10.199-10.199c0-5.632-4.567-10.199-10.199-10.199h-10.709v-10.709c0-5.632-4.567-10.199-10.199-10.199   c-5.632,0-10.199,4.567-10.199,10.199v10.709h-10.709c-5.632,0-10.199,4.567-10.199,10.199c0,5.632,4.567,10.199,10.199,10.199   h10.709v10.709C341.673,347.305,346.241,351.873,351.873,351.873z"/>
            <path fill="#3D3D3D;" d="M483.952,357.992h-5.1v-5.1c0-5.632-4.567-10.199-10.199-10.199   c-5.632,0-10.199,4.567-10.199,10.199v5.1h-5.1c-5.632,0-10.199,4.567-10.199,10.199c0,5.632,4.567,10.199,10.199,10.199h5.1v5.1   c0,5.632,4.567,10.199,10.199,10.199c5.632,0,10.199-4.567,10.199-10.199v-5.1h5.1c5.632,0,10.199-4.567,10.199-10.199   C494.151,362.559,489.584,357.992,483.952,357.992z"/>
        </g>
        </svg>
    )
}

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme ,setTheme} = useTheme()

  useEffect(() =>  setMounted(true), [])

  if (!mounted) return (
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      width={36}
      height={36}
      sizes="36x36"
      alt="Loading Light/Dark Toggle"
      priority={false}
      title="Loading Light/Dark Toggle"
    />
  )
  
  if (theme === 'dark') {
    return <CustomButton icon={<MoonIcon/>} action={()=>setTheme('light')}/>
  }

  if (theme === 'light') {
    return  <CustomButton icon={<SunIcon/>} action={()=>setTheme('dark')}/>
  }

}

export default ThemeSwitcher;
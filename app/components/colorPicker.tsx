"use client"

import { useEffect, useState } from "react";
import colorChoices from "./colors.json";


export default function ColorPicker(props:{changeColor: Function,value:number,restartStatus:boolean}){
    const [colors,setColors] = useState(colorChoices);
    const [colorValue,setColorValue] = useState(props.value);
    
    useEffect(()=>{
        setColorValue(props.value);
    },[props.value])
    
    const chooseColor = (id:number)=>{
        const currentColors = colors.map(color=>{
            if(color.id == id){
                return{...color,status: !color.status}
            }else{
                return {...color,status: false};
            }
        });
        setColors(currentColors);
        setColorValue(id);
        props.changeColor(id);
    }
    
    const ColorBtn = (props:{color:string,id:string,status:boolean})=>{
        return(
            <div className={"box w-1/5 cursor-pointer "+ props.color} id={props.id} onClick={()=>(chooseColor(parseInt(props.id)))}>
                {props.status?<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" className="check">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                </svg>:''}
            </div>
        )
    }
    return(
        <div className="flex w-full">
            <input type="hidden" placeholder="Choose one" name="color" id="color" value={colorValue}/>
            {colors.map((color,index)=><ColorBtn key={index + 1} color={color.color} id={index.toString()} status={index == colorValue && props.restartStatus? true : color.status}/>)}
        </div>
    )
}
'use client';

export default function CustomButton(props:{icon:JSX.Element,action:VoidFunction}){
    return(
        <button onClick={props.action} className="button-scheme h-16 w-16 border rounded-full component-bg cursor-pointer flex justify-center items-center">
            {props.icon}
        </button>
    );
}
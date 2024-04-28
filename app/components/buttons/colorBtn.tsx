export default function ColorBtn(props:{index:number}){
    const colors = ['red','orange','yellow','light-green','green'];

    return(
        <button className="h-16 w-16 flex justify-center items-center rounded-full component-bg cursor-pointer">
            <div className={"w-10 h-10 border border-black "+colors[props.index]}>
            </div>
        </button>
    )
}
export default function EmojiBtn(props:{icon:string}){
    return(
        <button className="h-16 w-16 rounded-full component-bg cursor-pointer">
            <span className="emojiBtn">{props.icon}</span>
        </button>
    );
}
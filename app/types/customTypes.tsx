//Record stuff start
type RecordType = {
    id: number;
    title:string;
    emoji: string;
    created_at: string;
    color: number;
    text: string;
    favorite: boolean;
};
//Record end

//Form stuff start
type FormCode = {
    id: number
    code: string;
    date: string;
};
type FormType = {
    title: string,
    emoji: string,
    color: number,
    text: string,
    favorite: number,
    date: string,
}
//Form stuff end

//Layout Data start
type LibraryLayoutData = {
    month: number;
    year: number;
    records: Array<RecordType>;
}
type EmotionLayoutData = {
    year: number;
    records: Array<RecordType>;
}
//Layout Data end

type RecordPageData = {
    recordData: [RecordType];
    idList: Array<string>;
}
interface RecordProps{
    record: [RecordType];
    idList: Array<string>;
}
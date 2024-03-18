import qs from "qs"
import axios, {ResDataType,ResQuestionType} from "./ajax"

type SearchOption={
    keyword:string
    isStar:number
    isDeleted:number
    page:number
    pageSize:number
}
export async function getQuestionService(id: string): Promise<ResDataType>{
    const url=`/api/question/${id}`;
    const data=(await axios.get(url)) as ResDataType;
    return data;
}

export async function createQuestionService():Promise<ResDataType>{
    const url='/api/question';
    const data=(await axios.post(url)) as ResDataType;
    return data;
}

export async function getQuestionListService(opt:Partial<SearchOption> = {}):Promise<ResDataType>{
    const url='/api/question';
    const data=(await axios.get(url,{params:opt})) as ResDataType;
    return data;
}

export async function updateQuestionService(id: number,opt:{[key:string]:any}): Promise<ResDataType>{
    const url=`/api/question/${id}`;
    const data=(await axios.patch(url,opt)) as ResDataType;
    return data;
}

export async function duplicateQuestionService(id:number):Promise<ResDataType>{
    const url=`/api/question/duplicate/${id}`;
    const data=(await axios.post(url)) as ResDataType;
    return data;
}

export async function deleteQuestionService(ids:number[]):Promise<ResDataType>{
    const url='/api/question';
    const body={data:ids};
    const data=(await axios.delete(url,body)) as ResDataType;
    return data;
}
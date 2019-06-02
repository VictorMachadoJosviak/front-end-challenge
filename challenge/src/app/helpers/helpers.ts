export const BASE_URL : string = "http://localhost:8080";

export function isNullOrEmpty(value:string):boolean{
    return value ==="" || value===null || value === undefined ? true : false
}

export const  STATUS  = [    
    { label : "Pendente" , value : false},
    { label : "Feito"    , value : true}
]
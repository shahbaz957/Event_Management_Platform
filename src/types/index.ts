export interface Event {
    id : string  , 
    organizer_id : string, 
    title: string, 
    description : string,
    total_seats : number , 
    rem_seats : number , 
    designation : string, 
    location : string , 
    img_url  : string,
    date : Date,
    st_time : Date ,
    end_time : Date
}
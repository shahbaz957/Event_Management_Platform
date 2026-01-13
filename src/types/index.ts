export interface Event {
    id : string | undefined , 
    organizer_id : string, 
    title: string, 
    description : string,
    total_seats : number , 
    rem_seats : number , 
    designation : string, 
    location : string , 
    img_url  : string,
    date : string,
    st_time : string ,
    end_time : string
}
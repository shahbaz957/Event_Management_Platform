// import EventPage from '@/components/main/EventPage';
import EventInterface from "@/components/main/EventInterface";

type Props = {
  params: Promise<{ id: string }>;
}

async function Event({ params }: Props) {
  const { id } = await params; 
  console.log(id)
  
  // const res = await fetch(`http://localhost:3000/api/events/${id}`, {
  //   cache: 'no-store'
  // });
  
  // if (!res.ok) {
  //   return <div className="text-white text-center p-8">Event not found</div>;
  // }
  
  // const event = await res.json();
  
  return (
    <div>
      <EventInterface id={id} />
    </div>
  );
}

export default Event;
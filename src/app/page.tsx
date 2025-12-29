import EventGrid from "@/components/main/EventGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <EventGrid />
      </div>
    </main>
  );
}
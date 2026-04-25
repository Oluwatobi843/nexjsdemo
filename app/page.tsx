import ExploreBtn from "@/components/ExploreBtn";

const Page = () => {
  return (
    <section>
      <h1 className="text-center">
        The Hub For Every Dev <br />
        Event You Cant Miss
      </h1>
      <p className="text-center mt-5 ">
        Hackathons, Meetups, and Conferences, All In One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {[1,2,3,4,5].map((item) =>(
            <li key={event}>Event{event}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Page

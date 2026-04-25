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
      </div>
    </section>
  );
}

export default Page

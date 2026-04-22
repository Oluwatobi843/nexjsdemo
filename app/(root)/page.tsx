import Hello from "../components/hello";

const Home = () => {
  console.log("What type of component am i");
  return (
    <main>
      <div className="text-5xl underline">Welcome to Nextjs</div>
      <Hello />
    </main>
  );
};

export default Home;

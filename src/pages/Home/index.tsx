import Hero from "./Hero";
import OfferTable from "./OfferTable";

const Home = () => {
  return (
    <div data-testid="home">
      <Hero />
      <OfferTable />
    </div>
  );
};
export default Home;

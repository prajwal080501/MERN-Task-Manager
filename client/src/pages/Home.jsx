import Layout from "../components/Layout";

const Home = () => {
  return (
    <div className="w-[90%] lg:w-1/2 mt-10  mx-auto flex items-center flex-col h-fit px-3 py-4 bg-gray-200 rounded-lg drop-shadow-lg">
      <div className="w-full flex items-center">
        <Layout />
      </div>
    </div>
  );
};

export default Home;

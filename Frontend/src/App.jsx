import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RoleCards from "./components/RoleCards";

function App() {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        <Hero />
        <RoleCards />
      </main>
    </>
  );
}

export default App;
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      <Button onPress={() => signOut()}>Logout</Button>
    </div>
  );
};

export default Home;

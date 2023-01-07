import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { useLogout } from "@thirdweb-dev/react/solana";
import type { GetServerSideProps } from "next";
import { getUser } from "../auth.config";
import { network } from "./_app";
import Link from "next/link";
import Image from "next/image";
import Musk from "../public/Musk.png";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const sdk = ThirdwebSDK.fromNetwork(network);
  const user = await getUser(req);

  if (!user)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  const program = await sdk.getNFTDrop(
    process.env.NEXT_PUBLIC_PROGRAM_ADDRESS!
  );

  const nfts = await program.getAllClaimed();
  const nft = nfts.find((nft) => nft.owner === user.address);

  if (!nft)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

const Home = () => {
  const logout = useLogout();

  return (
    <div className="flex items-center min-h-screen flex-col text-center bg-[#433E6D] -z-20 px-5 justify-center h-screen">
      <p className="fixed top-10 text-xs md:text-base bg-[#DC24FB] rounded-full px-4 md:px-8 py-3 font-bold text-white mx-10">
        EXCLUSIVE MEMBERS ONLY: This page is only accessible to users who have
        purchased & hold a Musk Space Party Membership Pass.
      </p>

      <div className="absolute top-50 left-0 w-full h-1/2 bg-transparent -skew-y-6 z-10 overflow-hidden">
        <div className="flex items-center w-full h-full opacity-30">
          <h1 className="font-extrabold text-white">
            EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY
            EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY
            EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY
            EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY
            EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY
            EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY
            EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY
            EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY
            EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY
            EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY EXCLUSIVE MEMBERS ONLY
          </h1>
        </div>
      </div>

      <h2 className="text-xl lg:text-3xl my-2 text-[#1A183D]">
        <span className="font-extrabold underline decoration-fuchsia-600">
          Hop in the spaceship. first stop - Mars.
        </span>{" "}
      </h2>
      
      <Image
        className="mt-5 z-10 mb-10"
        src={Musk}
        alt="image"
        width={400}
        height={400}
      />

      

      <button
        onClick={logout}
        className="bg-white text-fuchsia-600 py-4 px-10 border-2 border-fuchsia-600 rounded-md hover:bg-fuchsia-600 hover:text-white mt-10 uppercase font-bold transition duration-200"
      >
        logout
      </button>
    </div>
  );
};

export default Home;

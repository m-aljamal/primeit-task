import React, { FC, useState } from "react";
import Form from "../components/Form";
import User from "../components/User";
import { Inputs, IUsers } from "../Types";
import { prisma } from "../components/prisma";
import toast, { Toaster } from "react-hot-toast";
import SearchIcon from "../components/SearchIcon";

const Home: FC<IUsers> = ({ users }) => {
  const [usersState, setUsersState] = useState(users);
  const [loading, setLoading] = useState(false);

  const [submited, setSubmited] = useState(false);
  const [search, setSearch] = useState("");

  const formSubmit = async (data: Inputs) => {
    try {
      setSubmited(false);
      setLoading(true);
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        setLoading(false);
        throw new Error(res.statusText);
      }

      const userFromData = await res.json();
      setLoading(false);
      setSubmited(true);
      toast.success("User is add!");

      setUsersState([userFromData, ...usersState]);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="md:flex  ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="md:w-2/5 bg-dark pt-5 md:h-screen md:sticky top-0 pb-8 md:pb-0">
        <Form onSubmit={formSubmit} loading={loading} submited={submited} />
      </div>
      <div className="md:w-3/5 pt-5 pl-5 container ">
        <div className="border flex px-2 items-center py-2 rounded-lg mb-8">
          <input
            className="w-full outline-none text-gray-500 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for Name"
          />
          <SearchIcon />
        </div>
        <div>
          {usersState
            ?.filter((post) => post.name.toLocaleLowerCase().includes(search))
            .map((user) => (
              <User key={user.id} user={user} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: { users: JSON.parse(JSON.stringify(users)) },
  };
}

import React, { FC, useState } from "react";
import Form from "../components/Form";
import User from "../components/User";
import { Inputs, IUsers } from "../Types";
import { prisma } from "../components/prisma";
import toast, { Toaster } from "react-hot-toast";

const Home: FC<IUsers> = ({ users }) => {
  const [usersState, setUsersState] = useState(users);
  const [loading, setLoading] = useState(false);

  const [submited, setSubmited] = useState(false);

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
        toast.error("there is an error please try again later");
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
    <div className="flex  ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-2/5 bg-dark pt-5 h-screen sticky top-0">
        <Form onSubmit={formSubmit} loading={loading} submited={submited} />
      </div>
      <div className="w-3/5 pt-5 pl-5 container ">
        {usersState.map((user) => (
          <User key={user.id} user={user} />
        ))}
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

import { FC, useState } from "react";
import Form from "../components/Form";
import User from "../components/User";
import { Inputs, IUsers } from "../Types";
import { prisma } from "../components/prisma";

const Home: FC<IUsers> = ({ users }) => {
  const [usersState, setUsersState] = useState(users);

  const formSubmit = async (data: Inputs) => {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const userFromData = await res.json();
      setUsersState([...usersState, userFromData]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex  ">
      <div className="w-2/5 bg-dark pt-5 h-screen sticky top-0">
        <Form onSubmit={formSubmit} />
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
  const users = await prisma.user.findMany();

  return {
    props: { users },
  };
}

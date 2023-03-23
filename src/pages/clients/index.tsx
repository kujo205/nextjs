import Link from "next/link";

interface Cient<T extends string> {
  name: T;
  id: Lowercase<T>;
}

export default function Clients() {
  const data: Cient<string>[] = [
    {
      name: "Ivan",
      id: "ivan",
    },
    {
      name: "Andrew",
      id: "andrew",
    },
    {
      name: "John",
      id: "john",
    },
  ];

  return (
    <div>
      <h2>This is a page with all the clients</h2>
      <ul>
        {data.map((client) => (
          <li key={client.id}>
            <Link href={
              {
                pathname:`/clients/[id]`,
                query:{ id:client.id}
              }
            }>{client.name} page</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

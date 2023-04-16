import { useUsers } from './hooks/useUsers';

export const Users = () => {
  const users = useUsers();

  if (users.isLoading) return <div>Loading...</div>;
  if (!users.data) return <div>NOT FOUND</div>;

  return (
    <div>
      <ul>
        {users.data.map((user) => (
          <li key={user.name}>
            {user.name}: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

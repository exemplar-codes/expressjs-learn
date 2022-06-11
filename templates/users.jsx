const Layout = require("./layout");

<Layout>
  <ul>
    {users.map((user) => (
      <li key={user}>{user.name}</li>
    ))}
    {bingos.map((bingo) => (
      <li key={bingo}>{bingo}</li>
    ))}
  </ul>
</Layout>;

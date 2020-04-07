import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

useEffect(() => {
  api.get('/repositories').then(response => {
    setRepos(response.data);
  });
}, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `New repo ${Date.now()}`,
      url: 'http://www.github.com/rsjayme/goStack',
      techs: '[ReactJS, NodeJS]',
    });

    setRepos([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repoIndex = repos.findIndex(repo => repo.id === id);
    const reposMirror = [...repos];
    reposMirror.splice(repoIndex, 1);
    setRepos(reposMirror);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

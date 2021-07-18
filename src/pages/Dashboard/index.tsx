import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories, Error } from './styles';

import Loading from '../../components/Loading';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  function repositoryExists(repoName: string): boolean {
    return repositories.some((repo) => repo.full_name === repoName);
  }

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('You forget the repository name!');
      return;
    }

    if (repositoryExists(newRepo)) {
      setInputError('This repository was already exists!');
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.get(`/repos/${newRepo}`);

      setRepositories([...repositories, data]);

      toast.success('New repository added sucessfully!');

      setTimeout(() => {
        setInputError('');
        setNewRepo('');
        setLoading(false);
      }, 100);
    } catch (err) {
      setInputError('This repository not exists or you type a wrong name!');
      setLoading(false);
    }
  }

  return (
    <>
      <Title>Explore repositórios no Github</Title>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Form hasError={!!inputError.trim()} onSubmit={handleAddRepository}>
            <input
              type="text"
              placeholder="Digite o nome do repositório"
              onChange={(event) => setNewRepo(event.target.value)}
            />
            <button type="submit">Pesquisar</button>
          </Form>

          {inputError && <Error>{inputError}</Error>}

          <Repositories>
            {repositories.map((repository) => (
              <Link
                to={`/repositories/${repository.full_name}`}
                key={repository.full_name}
                href="teste"
              >
                <img
                  src={repository.owner.avatar_url}
                  alt={repository.owner.login}
                />
                <div>
                  <strong>{repository.full_name}</strong>
                  <p>{repository.description}</p>
                </div>
                <FiChevronRight size="22" />
              </Link>
            ))}
          </Repositories>
        </>
      )}
    </>
  );
};

export default Dashboard;

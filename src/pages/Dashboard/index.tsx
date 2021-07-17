import React, { useState, FormEvent } from 'react';

import { toast } from 'react-toastify';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './styles';

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
  const [isLoading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  function repositoryExists(data: Repository): boolean {
    return repositories.some((repo) => repo.full_name === data.full_name);
  }

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (newRepo === '') {
      toast.error('You forget the repository name!');
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.get(`/repos/${newRepo}`);

      if (repositoryExists(data)) {
        toast.error('You already added this repository!');
        setLoading(false);
        return;
      }

      setRepositories([...repositories, data]);
      toast.success('New repository added sucessfully!');

      setTimeout(() => {
        setNewRepo('');
        setLoading(false);
      }, 100);
    } catch (err) {
      toast.error(err.message);
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
          <Form onSubmit={handleAddRepository}>
            <input
              type="text"
              placeholder="Digite o nome do repositório"
              onChange={(event) => setNewRepo(event.target.value)}
            />
            <button type="submit">Pesquisar</button>
          </Form>

          <Repositories>
            {repositories.map((repository) => (
              <a key={repository.full_name} href="teste">
                <img
                  src={repository.owner.avatar_url}
                  alt={repository.owner.login}
                />
                <div>
                  <strong>{repository.full_name}</strong>
                  <p>{repository.description}</p>
                </div>
                <FiChevronRight size="22" />
              </a>
            ))}
          </Repositories>
        </>
      )}
    </>
  );
};

export default Dashboard;

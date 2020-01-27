import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Form, SubmitButton, List } from './styles';
import Container, { CustomError } from '../../components/Container';

import api from '../../services/api';

export default class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    repoExist: '',
    err: '',
  };

  // Carrega os dados do localstorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Escuta as mudanças e atualiza de acordo
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      this.setState({ loading: true });

      const { newRepo, repositories } = this.state;

      const verifyRepo = await repositories.filter(
        repo => repo.name === newRepo
      );

      if (verifyRepo.length !== 0) {
        throw new Error('Repositório duplicado!');
      }

      const response = await api.get(`repos/${newRepo}`);

      if (!response) {
        throw new Error('Nenhum repositório encontrado');
      }

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        repoExist: true,
      });
    } catch (err) {
      this.setState({ loading: false, repoExist: false, err: err.message });
    }
  };

  render() {
    const { newRepo, loading, repositories, repoExist, err } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} repoExist={repoExist}>
          <div>
            <input
              type="text"
              placeholder="Adicionar repositório"
              value={newRepo}
              onChange={this.handleInputChange}
            />
            <p>{repoExist === false && <CustomError>{err}</CustomError>}</p>
          </div>
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size="14" />
            ) : (
              <FaPlus color="#fff" size="14" />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

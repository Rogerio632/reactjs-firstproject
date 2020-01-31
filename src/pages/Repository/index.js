/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FaSpinner,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
} from 'react-icons/fa';

import { Loading, Owner, IssueList, Select } from './styles';
import IssueGroup from '../../components/Repository/IssueGroup';
import Container from '../../components/Container';

import api from '../../services/api';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    issueStates: ['open', 'closed', 'all'],
    issueState: '',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          per_page: 5,
          state: 'open',
          page,
        },
      }),
    ]);

    await this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      page: 1,
    });
  }

  async componentDidUpdate(_, prevState) {
    const { issueState, page } = this.state;

    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    if (prevState.issueState !== issueState || prevState.page !== page) {
      const newIssues = await api.get(`/repos/${repoName}/issues`, {
        params: {
          per_page: issueState === 'all' ? 10 : 5,
          state: issueState,
          page,
        },
      });
      this.setState({ issues: newIssues.data });
    }
  }

  handlePage = async direction => {
    const { page } = this.state;
    await this.setState({ page: direction === 'back' ? page - 1 : page + 1 });
  };

  handleSelectChange = e => {
    this.setState({ issueState: e.target.value });
  };

  render() {
    const { repository, issues, loading, issueStates, page } = this.state;

    if (loading) {
      return (
        <Loading loading={loading}>
          <FaSpinner size="25" color="#fff" />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>

          {issues.length !== 0 && (
            <p>
              <Select onChange={this.handleSelectChange}>
                {issueStates.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </p>
          )}
        </Owner>

        <IssueList issues={issues}>
          {issues.map(issue => (
            <IssueGroup
              key={String(issue.id)}
              avatar_url={issue.user.avatar_url}
              alt={issue.user.login}
              linkTo={issue.html_url}
              title={issue.title}
              user={issue.user.login}
              labels={issues.labels}
            />
          ))}

          <li>
            <FaArrowAltCircleLeft
              disabled={page < 2}
              onClick={() => this.handlePage('back')}
            />

            <FaArrowAltCircleRight
              disabled={page === page.length}
              onClick={() => this.handlePage('next')}
            />
          </li>
        </IssueList>
      </Container>
    );
  }
}

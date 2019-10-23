import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import React from 'react';
import MainContainer from './MainContainer.styled';
import api from 'Utils/api';

const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

class MainContainerComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      loading: true,
      search: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    api.get('/movie/popular').then((response) => {
      console.log(response.data.results);
      this.setState({ movies: response.data.results, loading: false });
    });
  }

  handleChange(event) {
    this.setState({
      search: event.target.value,
    });
  }

  handleSubmit() {
    this.setState({
      loading: true,
    });
    api.get(`/search/movie?query=${this.state.search}`).then((response) => {
      this.setState({ movies: response.data.results, loading: false });
    });
  }
  
  handleClick(id) {
    console.log(id);
    this.props.history.push(`movies/${id}`);
  }
  render() {
    const {
      movies,
      loading,
      search,
    } = this.state;

    const {
    } = this.props;

    return (
      <MainContainer.Container>
        <MainContainer.Search>
          <TextField
            id="name"
            label="Search"
            value={search}
            onChange={this.handleChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                this.handleSubmit();
              }
            }}
            margin="normal"
          />
        </MainContainer.Search>
        <MainContainer.List>
          {
            !loading ?
              <Table aria-label="Popular Movies">
                <TableBody>
                  {
                    movies.map(movie => (

                      <TableRow key={movie.id} onClick={() => this.handleClick(movie.id)} hover >
                          <TableCell component="th" scope="row">
                            {movie.title}
                          </TableCell>
                          <TableCell align="right"> {movie.vote_average} </TableCell>
                          <TableCell align="right"> {movie.popularity} </TableCell>
                        
                      </TableRow>

                    ))
                  }
                </TableBody>
              </Table> : <div> loading </div>
          }
        </MainContainer.List>
      </MainContainer.Container>
    );
  }
}

MainContainer.propTypes = propTypes;

export default withRouter(MainContainerComponent);

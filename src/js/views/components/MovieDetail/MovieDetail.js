import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import MovieDetail from './MovieDetail.styled';
import api from 'Utils/api';


class MovieDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      cast: null,
    };
    console.log(this.props);
  }
  componentWillMount() {
    api.get(`/movie/${this.props.match.params.movie_id}`).then((response) => {
      this.setState({ movie: response.data });
    });
    api.get(`/movie/${this.props.match.params.movie_id}/credits`).then((response) => {
      this.setState({ cast: response.data.cast });
    });
  }

  render() {
    const {
      movie,
      cast,
    } = this.state;
    console.log(cast);
    return (
      <div>
        {this.state.movie && this.state.cast ?
          <MovieDetail.Container>
            <MovieDetail.CapContainer>
              <MovieDetail.Poster>
                <img src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} />
              </MovieDetail.Poster>
              <MovieDetail.InfoContainer>
                <MovieDetail.Title>
                  { movie.title }
                </MovieDetail.Title>
                { movie.overview }
              </MovieDetail.InfoContainer>
              <MovieDetail.VotesContainer>
                { movie.vote_average }
              </MovieDetail.VotesContainer>
            </MovieDetail.CapContainer>
            <MovieDetail.Cast>
              <Table aria-label="Cast">
                <TableBody>
                  { cast.map( actor => (
                    <TableRow key={actor.id}>
                      <TableCell component="th" scope="row">
                        <img src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`} />
                      </TableCell>
                      <TableCell align="right"> {actor.name} </TableCell>
                      <TableCell align="right"> {actor.character} </TableCell>
                    </TableRow>
                    ))
                  }
                  </TableBody>
              </Table>
              
            </MovieDetail.Cast>

          </MovieDetail.Container>
          : null
        }
      </div>
    );
  }
}

export default MovieDetailComponent;

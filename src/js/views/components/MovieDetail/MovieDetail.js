import React from 'react';
import MovieDetail from './MovieDetail.styled';
import api from 'Utils/api';

class MovieDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
    };
    console.log(this.props);
  }
  componentWillMount() {
    api.get(`/movie/${this.props.match.params.movie_id}`).then((response) => {
      this.setState({ movie: response.data });
    });
  }

  render() {
    const {
      movie
    } = this.state;
    console.log(movie);
    return (
      <div>
        {this.state.movie ?
          <MovieDetail.Container>
            <MovieDetail.Brief>
              <MovieDetail.Poster>
                <img src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} />
              </MovieDetail.Poster>
              <MovieDetail.Info>
                <MovieDetail.Title>
                  { movie.title }
                </MovieDetail.Title>
              </MovieDetail.Info>
            </MovieDetail.Brief>
            <MovieDetail.Cast>

            </MovieDetail.Cast>

          </MovieDetail.Container>
          : null
        }
      </div>
    );
  }
}

export default MovieDetailComponent;

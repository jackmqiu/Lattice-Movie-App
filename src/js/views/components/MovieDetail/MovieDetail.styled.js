import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const CapContainer = styled.div`
  width: 60%;
  background: gray;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const Poster = styled.div`
  background: cyan;
  margin: 0 auto;
  grid-column: 1 / 2
`;

const InfoContainer = styled.div`
  background: yellow;
  grid-column: 2 / 5;
`;

const Title = styled.div`
  background: pink;
`;

const VotesContainer = styled.div`
  background: red;
  grid-column: 5 / 6;
`;

const Cast = styled.div`
  width: 60%;
  margin: 0 auto;
  background: blue;
`;

export default {
  Container,
  CapContainer,
  Poster,
  InfoContainer,
  VotesContainer,
  Title,
  Cast,
};

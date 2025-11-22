import { LoaderContainer, Spinner, LoaderText } from "../styles/LoaderStyles";

export default function Loader() {
  return (
    <LoaderContainer>
      <Spinner />
      <LoaderText>Cargando datos...</LoaderText>
    </LoaderContainer>
  );
}

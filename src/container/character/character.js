import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFela } from "react-fela";
import classnames from "classnames";
import { useFetchCharacter } from "./../../apis/useFetchCharacter";
import { TableView } from "./../../component/";
import { containerStyle } from "./style";

export const Character = () => {
  const { css } = useFela();
  const { id } = useParams();
  
  const [character, fetchCharacter] = useFetchCharacter();

  useEffect(() => {
    fetchCharacter(id);
  }, [id, fetchCharacter]);

  const headerClass = classnames("ui-container", css(containerStyle));

  return (
    <div className={headerClass}>
      <TableView obj={character} />
    </div>
  );
};

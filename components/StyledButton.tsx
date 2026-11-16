// shared button style, used by ShortenForm ("Shorten") and ShortenedUrlResult ("Copy")--
// kept in its own file so the style is only written once (DRY)

import styled from "styled-components";

const StyledButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #dd6da5ff;
  color: #ffffff;
  font-size: calc(2px + 0.93vw);
  font-weight: 700;   

  &:hover {
    background: #e891bdff;
  }
`;

export default StyledButton;
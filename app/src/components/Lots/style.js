import { pulse } from 'react-animations';
import styled, {keyframes, css} from 'styled-components';

const animationKeyframe = keyframes`${pulse}`;
const styles = css`animation: ${animationKeyframe} 1s linear none;`

export const CardPulse = styled.div`
  ${props => props.willAnimate === true ? styles : ""}  
`;
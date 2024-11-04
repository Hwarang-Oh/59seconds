'use client';
import { useState } from 'react';
import styled from '@emotion/styled';

const ToggleContainer = styled.div`
  cursor: pointer;
`;

export default function HeaderToggle() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <ToggleContainer onClick={handleToggle}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='56'
        height='22'
        viewBox='0 0 56 22'
        fill='none'>
        <g filter='url(#filter0_i_281_211)'>
          <rect y='0.5' width='53' height='20' rx='10' fill={toggle ? '#FFE4D5' : '#474972'} />
          <g filter='url(#filter1_dd_281_211)'>
            <rect x={toggle ? '25' : '38'} y='3.5' width='14' height='14' rx='7' fill='white' />
          </g>
        </g>
        <defs>
          <filter
            id='filter0_i_281_211'
            x='0'
            y='0.5'
            width='53'
            height='20.8551'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='0.855113' />
            <feGaussianBlur stdDeviation='0.427557' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0' />
            <feBlend mode='normal' in2='shape' result='effect1_innerShadow_281_211' />
          </filter>
          <filter
            id='filter1_dd_281_211'
            x='34.5796'
            y='0.934663'
            width='20.8409'
            height='20.8409'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='0.855113' />
            <feGaussianBlur stdDeviation='1.71022' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_281_211' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='0.855113' />
            <feGaussianBlur stdDeviation='0.427557' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0' />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow_281_211'
              result='effect2_dropShadow_281_211'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow_281_211'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    </ToggleContainer>
  );
}

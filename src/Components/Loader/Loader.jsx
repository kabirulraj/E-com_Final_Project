import 'ldrs/spiral'
import React from 'react'
import styled from 'styled-components'

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`

const Loader = () => {
    return (
        <LoaderWrapper>
            <l-spiral
                size="85"
                speed="0.9"
                color="#10B9B0"
            ></l-spiral>
        </LoaderWrapper>
    )
}

export default Loader


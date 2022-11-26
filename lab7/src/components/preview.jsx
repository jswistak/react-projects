import React from 'react';
import { useEffect, useState } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { matchState, countryDetailsState } from '../data/atom';

const Preview = (props) => {
    const [match, setMatch] = useRecoilState(matchState);
    const [details, setDetails] = useRecoilState(countryDetailsState);

    return (
        <div>
        <h1>Preview</h1>
        <div>
          First team:
          <h2>{details.nameFirst}</h2>
          <img src={details.flagFirst} alt={details.codeFirst} height="80px"/>
        </div>
        <div>
          Second team:
          <h2>{details.nameSecond}</h2>
          <img src={details.flagSecond} alt={details.nameSecond} height="80px"/>

        </div>
        
        
        
        Stadium: <h2>{match.stadium}</h2> <br/>
        <h2>{match.scoreFirst}:{match.scoreSecond}</h2>

        </div>

    );

}

export default Preview;
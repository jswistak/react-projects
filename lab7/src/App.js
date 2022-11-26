import logo from './logo.svg';
import './App.css';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import Editor from './components/editor';
import Preview from './components/preview';
function App() {
  return (
    <RecoilRoot>
      <div>
        <Editor />
        <Preview />
      </div>
    </RecoilRoot>
  );
}

export default App;

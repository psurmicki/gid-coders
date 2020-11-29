import './styles/App.css';
import DataViewerComponent from './jsx/DataViewerComponent.jsx';
import Store from './store.jsx';

function App() {
  return (
    <Store>
      <div className="App backGroundImage" >
        <DataViewerComponent />
      </div>
    </Store>
  );
}

export default App;
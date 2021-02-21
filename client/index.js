if (module.hot) {
	module.hot.accept();
}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './RecordScreen';


ReactDOM.render(<App />, document.getElementById('app'));
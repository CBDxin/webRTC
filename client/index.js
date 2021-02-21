if (module.hot) {
	module.hot.accept();
}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './MediaStream';


ReactDOM.render(<App />, document.getElementById('app'));
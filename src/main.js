import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './signin';
import SignUp from './signup'; 
import Search from './search';
import Create from './create';
import Home from './home'
import {Router, Route} from 'react-router';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return (
        <div>
        </div>
    )
  }
}


document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <div>
     <Router>
           <Route path="/" component={Home}/>
           <Route path="/signin" component={SignIn} />
           <Route path="/signup" component={SignUp} />
           <Route path="/create" component={Create}/>
           <Route path="/search" component={Search} />
     </Router>
    </div>,
    document.getElementById('mount')
  );
});


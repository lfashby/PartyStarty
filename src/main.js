import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './signin';
import SignUp from './signup';
import Search from './search';
import Create from './create';
import Home from './home'
import {BrowserRouter, Route, Switch, browserHistory} from 'react-router-dom';

// class App extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {

//     }
//   }
//   render(){
//     return (
//         <div>
//         </div>
//     )
//   }
// }
function isAuth(){
  console.log('hi');
}

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render((
    <BrowserRouter basename='/#' history={browserHistory}>
      <Switch>
          <Route exact path="/" component={Home} onEnter={isAuth}/>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/create" component={Create}/>
          <Route path="/search" component={Search} />
          <Route path="*" component={Home} />
      </Switch>
    </BrowserRouter>),
    document.getElementById('mount')
  );
});

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authentication from '../../actions/registerUser';

class Registraton extends React.Component {
    // this state is local state for the commponent
    state = {
      email: '',
      username: '',
      password: '',
    }
    // handle input of data as one inputs so as to update local state
    handleInput = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }
    // handle the singup when submit is clicked
    handleSignup = (e) => {
      e.preventDefault();
      const { email, username, password } = this.state;
      this.props.actions.signup(this.state)
        .then(
          () => { this.props.history.push('/login'); },
        );
    }
    render() {
      const { email, username, password } = this.state;
      return (
        <div id="background">
          <div className="card mt-5" id="signup">
            <h4 className="card-header text-center">Please SignUp</h4>
            <div className="card-body">

              <form onSubmit={this.handleSignup}>
                <div className="m-5">
                  <div className="form-group ">
                    <label>E-MAIL</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="jak@gmail.com"
                      className="form-control"
                      onChange={this.handleInput}
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label>USERNAME</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      className="form-control"
                      onChange={this.handleInput}
                      value={username}
                    />
                  </div>
                  <div className="form-group">
                    <label>PASSWORD</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      className="form-control"
                      onChange={this.handleInput}
                      value={password}
                    />

                  </div>
                  <button type="submit" className="btn btn-success ">CREATE AN ACCOUNT</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      );
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authentication, dispatch),
  };
}
export default connect(null, mapDispatchToProps)(Registraton);

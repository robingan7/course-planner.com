import React, { PureComponent } from "react";
import "../App.css";
import axios from "axios";

export default class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.onChangeUpdate = this.onChangeUpdate.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.state = {
      updateUsername: props.username,
      updateEmail: props.email,
      updateImageUrl: props.imageUrl,
      canEditEmail: props.canEditEmail,
      updateError: "",
      id: props.id
    };
  }

  onChangeUpdate(e) {
    const {
      target: { name, value }
    } = e;

    this.setState({
      [name]: value
    });
  }

  onUpdate(e){
    e.preventDefault();
    const {updateEmail, updateImageUrl, updateUsername, id, canEditEmail} = this.state;
    let user = {
      filter: {
        _id: id
      },
      update: {
        username: updateUsername,
        imageUrl: updateImageUrl
      }
    };

    if (canEditEmail){
        user.update.email = updateEmail;
    }
    axios
      .post(this.props.serverLink + "/signup-login/update", user)
      .then(res => {
        let mess = res.data.message;
        this.setState({
          updateError: mess
        });

        
        setTimeout(() => {
            if (mess == "Your info is updated!!") {
              this.props.sendUpdate({
                name: updateUsername,
                email: updateEmail,
                imageUrl: updateImageUrl
              });
            }
            this.setState({
                updateError: ""
            });
        }, 750);
      })
      .catch(err => {
        this.setState({ updateError: "Server error" });
        console.log(err);
      });
  }

  render() {
    const {
      updateEmail,
      updateUsername,
      updateImageUrl,
      updateError,
      canEditEmail
    } = this.state;
    return (
      <div className="form-container sign-in-container regular-container">
        <form onSubmit={this.onUpdate}>
          <h1>Settings</h1>
          <img className="updateImage" src={updateImageUrl} alt="avator" />
          <button type="button">Upload</button>
          <input
            type="email"
            placeholder="Email"
            name="updateEmail"
            value={updateEmail}
            onChange={this.onChangeUpdate}
            disabled={!canEditEmail}
          />
          <input
            type="text"
            placeholder="Username"
            name="updateUsername"
            value={updateUsername}
            onChange={this.onChangeUpdate}
          />
          <button>SAVE</button>
          <div id="updateError">{updateError}</div>
        </form>
      </div>
    );
  }
}

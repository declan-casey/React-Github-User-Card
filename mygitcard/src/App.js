import logo from './logo.svg';
import './App.css';
import React from "react"
import axios from "axios"
import styled from "styled-components"

const StyledPage = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;

  background-image: linear-gradient(black, darkslategrey, black);
  padding-bottom: 3rem;
  .card img{
    border-radius:10px;
    height: 20vh;
  }

  .card{
    background-color: hsl(10, 16%, 85%);
    padding: 2rem;
    border-radius:10px;
    box-shadow: 1px 3px 5px 6px;
    margin-top: 2rem;
  }
  .card:hover{
    transform:scale(1.02);
  }
  .search{
    border-radius: 10px;
  }
  .btn{
    border-radius: 10px;
  }
`

class App extends React.Component {
  state = {
    userName: "",
    avatarUrl: "",
    bio: "",
    followers: null,
    following: null,
    name: "",
    publicRepos: null
  }
  componentDidMount() {
    axios.get("https://api.github.com/users/declan-casey")
        .then((res) => {
          console.log(res);
          this.setState({
            userName: res.data.login,
            avatarUrl:res.data.avatar_url,
            bio: res.data.bio,
            followers: res.data.followers,
            following: res.data.following,
            name: res.data.name,
            publicRepos: res.data.public_repos
          })
        })
        .catch(err => {
          console.log(err)
        })
  }

  handleChange = e => {
    this.setState({
      username: e.target.value
    });
  }

  handleClick = e => {
    e.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.username}`)
    .then(res => {
      this.setState({
        userName: res.data.login,
        avatarUrl:res.data.avatar_url,
        bio: res.data.bio,
        followers: res.data.followers,
        following: res.data.following,
        name: res.data.name,
        publicRepos: res.data.public_repos
      })
    })
  }

  render() {
    return(
      <StyledPage>
        <form className = "form">
          <input className = "search" placeholder = "Search..." type = "text" onChange = {this.handleChange}></input>
          <button className = "btn" onClick = {this.handleClick}>Search</button>
        </form>
        <div className = "card">
          <h2>{this.state.name}</h2>
          <img src={this.state.avatarUrl}/>
          <p>Bio: {this.state.bio}</p>
          <p>Followers: {this.state.followers}</p>
          <p>Following: {this.state.following}</p>
          <p>Public Repos: {this.state.publicRepos}</p>
          <p> User Name: {this.state.userName}</p>
        </div>
      </StyledPage>
    )
  }
}

export default App;


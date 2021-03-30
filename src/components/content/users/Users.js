import React from 'react';
import styles from './Users.module.css';
import UserItem from "./useritem/UserItem";
import Preloader from "../../common/Preloader/Preloader";
import Pagination from "../../common/Pagination/Pagination";
import {connect} from "react-redux";
import {
  getFollow,
  getUsers,
  setCurrentPage,
  setIsFetching,
  unsetUsers
} from "../../../redux/users-reducer";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFriend: '',
      searchTerm: ''
    };
  }

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  componentWillUnmount() {
    this.props.unsetUsers()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentPage !== this.props.currentPage ||
        prevState.searchTerm !== this.state.searchTerm ||
        prevState.isFriend !== this.state.isFriend
    ) {
      this.props.getUsers(
          this.props.currentPage,
          this.props.pageSize,
          this.state.searchTerm,
          this.state.isFriend
      );
    }
  }

  // using such style of creating method prevent binding!!!
  // but troubles with debugging context "this" can happen
  setFollow = (userId, method) => {
    this.props.getFollow(userId, method);
  }

  isFriendCallback = (isFriend) => {
    this.setState({isFriend})
  }

  searchTermCallback = (searchTerm) => {
    this.setState({searchTerm})
  }

  render() {
    let renderElement;
    if (this.props.isFetching) {
      renderElement = <Preloader/>
    }
    else {
      renderElement = this.props.users.map(
          u => <UserItem key={u.id}
                         data={u}
                         setFollow={this.setFollow}
                         isFetchingFollow={this.props.isFetchingFollow}
          />
      )
    }

    return <div className={styles.container}>
      <Pagination {...this.props} />
      <SearchForm searchTerm={this.state.searchTerm}
                  isFriendParentCallback={this.isFriendCallback}
                  searchTermParentCallback={this.searchTermCallback}
                  isFriend={this.state.isFriend}
      />
      {renderElement}
    </div>
  }
}

const SearchForm = ({searchTerm, searchTermParentCallback, isFriendParentCallback, isFriend}) => {
  const handleChangeSearchText = (e) => {
    searchTermParentCallback(e.target.value)
  }

  const handleChangeSelect = (e) => {
    isFriendParentCallback(e.target.value);
  }

  return <div>
    <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChangeSearchText}
    />

    <select value={isFriend} onChange={handleChangeSelect}>
      <option value="">All</option>
      <option value="true">Followed</option>
      <option value="false">Unfollowed</option>
    </select>
  </div>
}

let mapStateToProps = state => {
  return {
    users: state.UsersPage.Users,
    totalCount: state.UsersPage.totalCount,
    pageSize: state.UsersPage.pageSize,
    currentPage: state.UsersPage.currentPage,
    isFetching: state.UsersPage.isFetching,
    isFetchingFollow: state.UsersPage.isFetchingFollow
  }
}

export default connect(mapStateToProps, {
  setIsFetching,
  unsetUsers,
  setCurrentPage,
  getUsers,
  getFollow
})(Users);

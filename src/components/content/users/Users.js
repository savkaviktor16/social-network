import React from 'react';
import styles from './Users.module.css';
import UserItem from "./useritem/UserItem";
import Preloader from "../../common/Preloader/Preloader";
import ReactPaginate from 'react-paginate';
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
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  componentWillUnmount() {
    this.props.unsetUsers()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }
  }

  // using such style of creating method prevent binding!!!
  // but troubles with debugging context "this" can happen
  setFollow = (userId, method) => {
    this.props.getFollow(userId, method);
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
      {/*<ReactPaginate*/}
      {/*    previousLabel={'previous'}*/}
      {/*    nextLabel={'next'}*/}
      {/*    breakLabel={'...'}*/}
      {/*    breakClassName={'break-me'}*/}
      {/*    pageCount={pageCount}*/}
      {/*    marginPagesDisplayed={2}*/}
      {/*    pageRangeDisplayed={5}*/}
      {/*    onPageChange={this.handlePageClick}*/}
      {/*    containerClassName={'pagination'}*/}
      {/*    subContainerClassName={'pages pagination'}*/}
      {/*    activeClassName={'active'}*/}
      {/*/>*/}
      {renderElement}
    </div>
  }

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
import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Navigation from "./components/navigation/Navigation";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import {connect} from "react-redux";
import {initApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {
  componentDidMount() {
    this.props.initApp()
  }

  render() {
    if (!this.props.appIsInitialized) {
      return <Preloader />
    }

    return <div className='App'>
      <div className='header'>
        <Header/>
      </div>
      <div className='navigation'>
        <Navigation/>
      </div>
      <div className='content'>
        <Content/>
      </div>
      <div className='footer'>
        <Footer/>
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    appIsInitialized: state.App.initialized
  }
}

export default connect(mapStateToProps, {initApp})(App);

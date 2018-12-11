//LambdaRoot(bookmarkObject[] data)
//data: initial data of bookmarkobjects
class LambdaRoot extends React.Component {
  constructor(props) {
    super(props);
    this.marksHandlerRef = React.createRef();
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement(ControlHandler, {
      marksHandler: this.marksHandlerRef,
      initialToast: {
        title: "/",
        id: "2"
      }
    }), React.createElement(MarksHandler, {
      data: this.props.data,
      ref: this.marksHandlerRef
    }));
  }

} //ControlHandler(component-ref marksHandler,bookmarkObject initialToast)
//marksHandler: the markshandler component ref
//initialToast: bookmark object to start with


class ControlHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: [this.props.initialToast]
    };
  }

  render() {
    return React.createElement("div", {
      className: "control"
    }, this.state.toasts.map((x, i) => {
      return React.createElement(NavToast, {
        data: x,
        marksHandler: this.props.marksHandler,
        key: i
      });
    }));
  }

} //NavToast(bookmarkObject data,component marksHandler)
//data: bookmark object for a folder that the toast corresponds to
//marksHandler: navigate folder function from MarksHandler


class NavToast extends React.Component {
  render() {
    return React.createElement("div", {
      className: "toast",
      onClick: () => {
        this.props.marksHandler.current.navigateFolder(this.props.data.id);
      }
    }, React.createElement("p", null, this.props.data.title));
  }

} //MarksHandler(bookmarkObject[] data)
//data: initial data of bookmark objects


class MarksHandler extends React.Component {
  constructor(props) {
    super(props);
    this.navigateFolder = this.navigateFolder.bind(this);
    this.state = {
      data: this.props.data
    };
  } //given a folder id, go to that folder


  navigateFolder(folderId) {
    chrome.bookmarks.getChildren(folderId, data => {
      this.setState({
        data
      });
    });
  }

  render() {
    return React.createElement("div", {
      className: "marks"
    }, this.state.data.map((x, i) => {
      return React.createElement(MarkEntry, {
        data: x,
        key: i,
        navigateFolder: this.navigateFolder
      });
    }));
  }

} //MarkEntry(bookmarkObject data,parent-function navigateFolder)
//data: bookmark object from chrome api (see data specs)
//navigateFolder: navigateFolder function from parent


class MarkEntry extends React.Component {
  render() {
    if (!this.props.data.url) {
      return React.createElement("div", {
        className: "mark folder",
        onClick: () => {
          this.props.navigateFolder(this.props.data.id);
        }
      }, React.createElement("img", {
        src: "material-folder.svg"
      }), React.createElement("p", null, this.props.data.title));
    }

    return React.createElement("a", {
      className: "mark",
      href: this.props.data.url
    }, React.createElement("img", {
      src: `chrome://favicon/${this.props.data.url}`
    }), React.createElement("p", null, this.props.data.title));
  }

}
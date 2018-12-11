//LambdaRoot(bookmarkObject[] data)
//data: initial data of bookmarkobjects
class LambdaRoot extends React.Component {
  render() {
    return React.createElement(React.Fragment, null, React.createElement(ControlHandler, null), React.createElement(MarksHandler, {
      data: this.props.data
    }));
  }

} //ControlHandler()


class ControlHandler extends React.Component {
  render() {
    return React.createElement("div", {
      className: "control"
    }, React.createElement("div", {
      className: "toast"
    }, React.createElement("p", null, "stuff")), React.createElement("div", {
      className: "toast"
    }, React.createElement("p", null, "stuffstuffstuffstuffstuffstuffstuffs")));
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
class ControlHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: [this.props.initialToast]
    };
    this.sankakuControl = React.createRef();
  }

  addToast(folderId, folderName) {
    this.state.toasts.push({
      title: folderName,
      id: folderId
    });
    this.setState({
      toasts: this.state.toasts
    });
  }

  modifyToast(index) {
    this.setState({
      toasts: this.state.toasts.slice(0, index + 1)
    });
  }

  bookmarkEditLoad(bookmark) {
    this.sankakuControl.current.loadBookmark(bookmark);
  }

  render() {
    return React.createElement("div", {
      className: "control"
    }, React.createElement("div", {
      className: "sankaku",
      onClick: () => {
        this.props.marksHandler.current.toggleControlMarks();
      }
    }, React.createElement("img", {
      src: "img/yellowtriangle.svg"
    })), this.state.toasts.map((x, i) => {
      return React.createElement(NavToast, {
        data: x,
        marksHandler: this.props.marksHandler,
        key: i,
        index: i
      });
    }), React.createElement(Sankaku, {
      ref: this.sankakuControl
    }));
  }

}

class NavToast extends React.Component {
  render() {
    return React.createElement("div", {
      className: "toast",
      onClick: () => {
        this.props.marksHandler.current.navigateFolder(this.props.data.id, this.props.data.title, this.props.index);
      }
    }, React.createElement("p", null, this.props.data.title));
  }

}

class Sankaku extends React.Component {
  constructor(props) {
    super(props);
    this.linkBookmarkManager = this.linkBookmarkManager.bind(this);
    this.state = {
      bookmark: {
        title: "",
        url: ""
      }
    };
  }

  loadBookmark(bookmark) {
    this.setState({
      bookmark,
      enabled: 1
    });
  }

  linkBookmarkManager() {
    chrome.tabs.create({
      url: `chrome://bookmarks/?q=${encodeURI(this.state.bookmark.title)}`,
      active: true
    });
  }

  render() {
    var disabledClass = "disabled";

    if (this.state.enabled) {
      disabledClass = "";
    }

    return React.createElement("div", {
      className: `sankaku-control ${disabledClass}`
    }, React.createElement("img", {
      src: `chrome://favicon/${this.state.bookmark.url}`
    }), React.createElement("div", {
      className: "input-areas"
    }, React.createElement("input", {
      type: "text",
      className: "bookmark-title",
      value: this.state.bookmark.title,
      readOnly: true
    }), React.createElement("input", {
      type: "text",
      value: this.state.bookmark.url,
      readOnly: true
    }), React.createElement("div", {
      className: "in-dark-button",
      title: "Show in bookmark manager",
      onClick: this.linkBookmarkManager
    }, React.createElement("img", {
      src: "img/tobookmarks.svg"
    }))));
  }

}
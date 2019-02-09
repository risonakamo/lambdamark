class ControlHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: [this.props.initialToast]
    };
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
    }), React.createElement(Sankaku, null));
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
    this.state = {
      bookmark: {
        title: "",
        url: ""
      }
    };
  }

  loadBookmark(bookmark) {
    this.setState({
      bookmark
    });
  }

  render() {
    return React.createElement("div", {
      className: "sankaku-control disabled"
    }, React.createElement("img", {
      src: "img/testicon.png"
    }), React.createElement("div", {
      className: "input-areas"
    }, React.createElement("input", {
      type: "text",
      className: "bookmark-title",
      value: this.state.bookmark.title,
      readOnly: true
    }), React.createElement("input", {
      type: "text",
      value: this.state.url,
      readOnly: true
    }), React.createElement("div", {
      className: "in-dark-button",
      title: "Show in bookmark manager"
    }, React.createElement("img", {
      src: "img/tobookmarks.svg"
    }))));
  }

}
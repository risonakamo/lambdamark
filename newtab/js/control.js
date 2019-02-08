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
  render() {
    return React.createElement("div", {
      className: "sankaku-control"
    });
  }

}
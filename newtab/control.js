//ControlHandler(component-ref marksHandler,bookmarkObject initialToast)
//marksHandler: the markshandler component ref
//initialToast: bookmark object to start with
class ControlHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: [this.props.initialToast]
    };
  } //add a toast with the specified stuff


  addToast(folderId, folderName) {
    this.state.toasts.push({
      title: folderName,
      id: folderId
    });
    this.setState({
      toasts: this.state.toasts
    });
  } //give toast index to pop off all toasts past that index
  //(so the index is NOT removed)


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
      src: "yellowtriangle.svg"
    })), this.state.toasts.map((x, i) => {
      return React.createElement(NavToast, {
        data: x,
        marksHandler: this.props.marksHandler,
        key: i,
        index: i
      });
    }), React.createElement(Sankaku, null));
  }

} //NavToast(bookmarkObjectToast data,component marksHandler,int index)
//data: smaller version of a bookmark object for a folder that the toast corresponds to
//marksHandler: navigate folder function from MarksHandler
//index: toast index given during render


class NavToast extends React.Component {
  render() {
    return React.createElement("div", {
      className: "toast",
      onClick: () => {
        this.props.marksHandler.current.navigateFolder(this.props.data.id, this.props.data.title, this.props.index);
      }
    }, React.createElement("p", null, this.props.data.title));
  }

} //Sankaku()


class Sankaku extends React.Component {
  render() {
    return React.createElement("div", {
      className: "sankaku-control"
    });
  }

}
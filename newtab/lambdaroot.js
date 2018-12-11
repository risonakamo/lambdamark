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
    this.state = {
      data: this.props.data
    };
  }

  render() {
    return React.createElement("div", {
      className: "marks"
    }, this.state.data.map((x, i) => {
      return React.createElement(MarkEntry, {
        data: x,
        key: i
      });
    }));
  }

} //MarkEntry(bookmarkObject data)
//data: bookmark object from chrome api (see data specs)


class MarkEntry extends React.Component {
  render() {
    if (!this.props.data.url) {
      return null;
    }

    return React.createElement("a", {
      className: "mark",
      href: this.props.data.url
    }, React.createElement("img", {
      src: `chrome://favicon/${this.props.data.url}`
    }), React.createElement("p", null, this.props.data.title));
  }

}
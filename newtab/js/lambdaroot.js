class LambdaRoot extends React.Component {
  constructor(props) {
    super(props);
    this.marksHandlerRef = React.createRef();
    this.controlHandlerRef = React.createRef();
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement(ControlHandler, {
      marksHandler: this.marksHandlerRef,
      initialToast: {
        title: "/",
        id: "2"
      },
      ref: this.controlHandlerRef
    }), React.createElement(MarksHandler, {
      data: this.props.data,
      controlHandler: this.controlHandlerRef,
      ref: this.marksHandlerRef
    }));
  }

}
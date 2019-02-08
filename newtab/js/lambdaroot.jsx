//LambdaRoot(bookmarkObject[] data)
//data: initial data of bookmarkobjects
class LambdaRoot extends React.Component
{
  constructor(props)
  {
    super(props);

    this.marksHandlerRef=React.createRef();
    this.controlHandlerRef=React.createRef();
  }

  render()
  {
    return <>
      <ControlHandler marksHandler={this.marksHandlerRef} initialToast={{title:"/",id:"2"}} ref={this.controlHandlerRef}/>

      <MarksHandler data={this.props.data} controlHandler={this.controlHandlerRef} ref={this.marksHandlerRef}/>
    </>;
  }
}
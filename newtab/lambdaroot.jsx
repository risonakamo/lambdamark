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

//ControlHandler(component-ref marksHandler,bookmarkObject initialToast)
//marksHandler: the markshandler component ref
//initialToast: bookmark object to start with
class ControlHandler extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state={
      toasts:[this.props.initialToast]
    };
  }

  //add a toast with the specified stuff
  addToast(folderId,folderName)
  {
    this.state.toasts.push({title:folderName,id:folderId});
    this.setState({toasts:this.state.toasts});
  }

  //give toast index to pop off all toasts past that index
  //(so the index is NOT removed)
  modifyToast(index)
  {
    this.setState({toasts:this.state.toasts.slice(0,index+1)});
  }

  render()
  {
    return <div className="control">
      {this.state.toasts.map((x,i)=>{
        return <NavToast data={x} marksHandler={this.props.marksHandler} key={i} index={i}/>;
      })}
    </div>;
  }
}

//NavToast(bookmarkObjectToast data,component marksHandler,int index)
//data: smaller version of a bookmark object for a folder that the toast corresponds to
//marksHandler: navigate folder function from MarksHandler
//index: toast index given during render
class NavToast extends React.Component
{
  render()
  {
    return <div className="toast" onClick={()=>{this.props.marksHandler.current.navigateFolder(this.props.data.id,this.props.data.title,this.props.index)}}>
      <p>{this.props.data.title}</p>
    </div>;
  }
}

//MarksHandler(bookmarkObject[] data,component controlHandler)
//data: initial data of bookmark objects
//controlHandler: the controlHandler component
class MarksHandler extends React.Component
{
  constructor(props)
  {
    super(props);
    this.navigateFolder=this.navigateFolder.bind(this);

    this.state={
      data:this.props.data
    };
  }

  //given a folder id, go to that folder. provide title for toast functions.
  //if modifyToast is provided, modify toast instead of adding
  navigateFolder(folderId,folderName="",modifyToast=-1)
  {
    chrome.bookmarks.getChildren(folderId,(data)=>{
      if (modifyToast<0)
      {
        this.props.controlHandler.current.addToast(folderId,folderName);
      }

      else
      {
        this.props.controlHandler.current.modifyToast(modifyToast);
      }

      this.setState({data});
    });
  }

  render()
  {
    return <div className="marks">
      {this.state.data.map((x,i)=>{
        return <MarkEntry data={x} key={i} navigateFolder={this.navigateFolder}/>;
      })}
    </div>;
  }
}

//MarkEntry(bookmarkObject data,parent-function navigateFolder)
//data: bookmark object from chrome api (see data specs)
//navigateFolder: navigateFolder function from parent
class MarkEntry extends React.Component
{
  render()
  {
    if (!this.props.data.url)
    {
      return <div className="mark folder" onClick={()=>{this.props.navigateFolder(this.props.data.id,this.props.data.title)}}>
        <img src="material-folder.svg"/>
        <p>{this.props.data.title}</p>
      </div>;
    }

    return <a className="mark" href={this.props.data.url}>
      <img src={`chrome://favicon/${this.props.data.url}`}/>
      <p>{this.props.data.title}</p>
    </a>;
  }
}
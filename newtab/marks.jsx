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
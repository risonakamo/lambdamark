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
      <div className="sankaku" onClick={()=>{this.props.marksHandler.current.toggleControlMarks()}}>
        <img src="img/yellowtriangle.svg"/>
      </div>

      {this.state.toasts.map((x,i)=>{
        return <NavToast data={x} marksHandler={this.props.marksHandler} key={i} index={i}/>;
      })}

      <Sankaku/>
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
    return (
      <div className="toast" onClick={()=>{
          this.props.marksHandler.current.navigateFolder(this.props.data.id,this.props.data.title,this.props.index);
        }}
      >
        <p>{this.props.data.title}</p>
      </div>
    );
  }
}

//Sankaku()
class Sankaku extends React.Component
{
  render()
  {
    return (
      <div className="sankaku-control">
        <img src="img/testicon.png"/>

        <div className="input-areas">
          <input type="text" className="bookmark-title" defaultValue="Artifact mods are not enforcing any consistent standard and are just unilaterally content they don't like while allowing content they like to stay : Artifact"/>
          <input type="text" defaultValue="https://www.reddit.com/r/Artifact/comments/ag8ggi/artifact_mods_are_not_enforcing_any_consistent/"/>
          <div className="in-dark-button" title="Show in bookmark manager"><img src="img/tobookmarks.svg"/></div>
        </div>
      </div>
    );
  }
}
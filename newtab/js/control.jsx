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

    this.sankakuControl=React.createRef();
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

  //call sankakucontrol's bookmark load function
  bookmarkEditLoad(bookmark)
  {
    this.sankakuControl.current.loadBookmark(bookmark);
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

      <Sankaku ref={this.sankakuControl}/>
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
    var toastText=this.props.data.title;
    if (toastText=="/")
    {
      toastText=<img src="img/home.svg"/>;
    }

    return (
      <div className="toast" onClick={()=>{
          this.props.marksHandler.current.navigateFolder(this.props.data.id,this.props.data.title,this.props.index);
        }}
      >
        <p>{toastText}</p>
      </div>
    );
  }
}

//currently just the bookmark control edit popup thing
//Sankaku()
class Sankaku extends React.Component
{
  constructor(props)
  {
    super(props);
    this.linkBookmarkManager=this.linkBookmarkManager.bind(this);

    this.state={
      //current loaded bookmark
      bookmark:{
        title:"",
        url:""
      }
      //enabled:0*
    };
  }

  //public
  //load a bookmarkObject
  loadBookmark(bookmark)
  {
    this.setState({bookmark,enabled:1});
  }

  //open new tab to bookmark manager with a search for the current bookmark
  linkBookmarkManager()
  {
    var searchText;
    if (this.state.bookmark.url)
    {
      searchText=this.state.bookmark.url;
    }

    else
    {
      searchText=this.state.bookmark.title;
    }

    chrome.tabs.create({
      url:`chrome://bookmarks/?q=${encodeURI(searchText)}`,
      active:true
    });
  }

  render()
  {
    var disabledClass="disabled";
    if (this.state.enabled)
    {
      disabledClass="";
    }

    return (
      <div className={`sankaku-control ${disabledClass}`}>
        <img src={`chrome://favicon/${this.state.bookmark.url}`}/>

        <div className="input-areas">
          <input type="text" className="bookmark-title" value={this.state.bookmark.title} readOnly/>

          <input type="text" value={this.state.bookmark.url} readOnly/>

          <div className="in-dark-button" title="Show in bookmark manager" onClick={this.linkBookmarkManager}>
            <img src="img/tobookmarks.svg"/>
          </div>
        </div>
      </div>
    );
  }
}
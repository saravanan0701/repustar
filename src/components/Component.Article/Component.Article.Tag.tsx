  
import * as React from 'react';
import { tagTypeMapping, tagsColumns } from '../../config';


interface IProps {
    keyCounter?: number;
    currentArticle?: any;
    item?: any;
    itemIndex?: number;
    isPendingArticle?: boolean;
    rowIndex?: number;
    columnIndex?: number;
    handleAddTag?: any;
    cancelAddTag?: any;
    showAddTag?: any;
    deleteTag?:any;
}

interface IState {
    newTag: string;
}


export default class ArticleTag extends React.Component<IProps, IState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            newTag: '',
        };
        this.handleAddTag = this.handleAddTag.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleAddTag(e: any){
        this.setState({newTag : e.target.value});
    }

    handleKeyDown(e: any){
        if (e.key === 'Enter') {
            e.preventDefault();
            this.props.handleAddTag(this.props.rowIndex, this.state.newTag);
            this.setState({newTag : ''});
        }
    }

    cancelAddTag(){
        this.props.cancelAddTag();
    }

    showAddTag(columnIndex:number, rowIndex:number){
        this.props.showAddTag(columnIndex, rowIndex);
    }

    deleteTag(columnIndex:number, rowIndex:number, tagKey: string){
        this.props.deleteTag(columnIndex, rowIndex, tagKey);
    }

    public renderTagsCell(tagText:any, title: string, columnIndex: number, tagTypeIndex: number){
        let currentKey:any = Object.keys(tagText);
        
        if(tagText === 'Add New Tag'){
            if(this.props.rowIndex === tagTypeIndex && this.props.columnIndex === columnIndex){
                return(<div className='article_tags_container__tags--column add_new_tag'>
                    <input className='add_new_tag--input' type='text' onChange={this.handleAddTag}
                    name="newTag"
                    onKeyDown={(e) => this.handleKeyDown(e)}
                    ></input>
                    <img src={'./static/close-black.svg'} alt='cancel_tag' className='delete_tag' onClick={() => this.cancelAddTag()}/>
                </div>);
            }else{
                return(<div className='article_tags_container__tags--column tags--add-new' onClick={() => this.showAddTag(columnIndex,tagTypeIndex)}>
                    <span className='tags--add-new--sapn'>{`+ Add ${title}`}</span>
                </div>);
            }
        }else{
            return(<div className='article_tags_container__tags--column tags'>
                <span className={`tags--index ${tagText[currentKey[0]] === 1 ? 'tag--span_new' : (tagText[currentKey[0]] === -1 ? 'tag--span_deleted' : '')}`}> {columnIndex} </span>
                <span className={`tags--sapn ${tagText[currentKey[0]] === 1 ? 'tag--span_new' : (tagText[currentKey[0]] === -1 ? 'tag--span_deleted' : '')}`}>{Object.keys(tagText)}</span>
                {
                    this.props.isPendingArticle 
                    ? <img src={'./static/close-black.svg'} alt='delete_tag' className={`delete_tag ${tagText[currentKey[0]] === 1 ? 'tag--span_new' : (tagText[currentKey[0]] === -1 ? 'tag--span_deleted' : '')}`} onClick={() => this.deleteTag(columnIndex,tagTypeIndex, currentKey[0])}/>
                    : <div className={`${tagText[currentKey[0]] === 1 ? 'tag--span_completed_new' : (tagText[currentKey[0]] === -1 ? 'tag--span_completed_deleted' : '')}`}></div>
                }
            </div>);
        }
    }

    public renderTagsRow(tagText:any, title: string, tagTypeIndex: number){
        const size = tagsColumns;
        const res = tagText.reduce((acc:any, curr:any, i:number) => {
            if ( !(i % size)  ) {   
              acc.push(tagText.slice(i, i + size));  
            }
            return acc;
          }, []);

        if(this.props.isPendingArticle){
            if(res.length > 0){
                if(res[res.length -1 ].length === 4){
                    res.push(['Add New Tag'])
                }else{
                    res[res.length -1 ].push('Add New Tag');
                }
            }else{
                res.push(['Add New Tag']);
            }
        }

        let columnIndex = 1;
        const content: any = res.map((row:any, idx:number) => (
            <div className="article_tags_container__tags--row" key={idx}>    
              { 
                row.map( (validated_tags:any) => 
                            this.renderTagsCell(validated_tags, title, columnIndex++, tagTypeIndex) 
                    )
                }
            </div> 
            )
        );
        return (
            <div>
              {content}
            </div>
        );
    }

  public render() {
    let itemIndex: any = this.props.itemIndex;
    console.log('tagTypeMapping[this.props.item.slice(1,-1)] ', tagTypeMapping[this.props.item.slice(1,-1)]);
    let tagCategories: any = tagTypeMapping[this.props.item.slice(1,-1)];

    if(typeof(tagCategories) !== 'undefined'){
        return (
            <div key={this.props.keyCounter} className='article_tags_container__row'>
            <div className='article_tags_container__type'>
                {tagTypeMapping[this.props.item.slice(1,-1)]}
            </div>
            {
                    this.props.isPendingArticle 
                    ? <div className='article_tags_container__tags'>
                            {this.renderTagsRow(this.props.currentArticle, tagTypeMapping[this.props.item.slice(1,-1)], itemIndex+1)}
                        </div>
                    : this.props.currentArticle.length !== 0 
                    ? <div className='article_tags_container__tags'>
                            {this.renderTagsRow(this.props.currentArticle, tagTypeMapping[this.props.item.slice(1,-1)], itemIndex+1)}
                        </div>
                    : <div className='article_tags_container__tags'>
                            <span className='article_tags_container__no_tags_text'>No Tags Available</span>
                    </div>
            }
        </div>
            
        );
    }else{
        return(<div></div>)
    }

  }
}
import * as React from 'react';
import { WorkbenchDefaultView } from '../../templates/WorkbenchDefaultView';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { RepositorieWorkbenchTagValidation } from '../../repositories/Repositorie.Workbench.TagValidation';
import { IError } from '../../interfaces/Interface.Error';
import { bindActionCreators } from 'redux';
import { getArticlesTag, setActiveWBAciveArticles, setActiveArticle } from '../../redux/redux.workbench.tagsvalidation/redux.workbench.tagsvalidation.action';
import './home.css';
import './tags.css'; 
import { tagTypeMapping } from '../../config';

interface IState {
    articleList?: [];
    error: boolean;
    errorMessage: string;
    rowIndex?: number;
    columnIndex?: number;
    newTag: string;
}
  
interface IProps {
    doHandleArticleTagsResponse?: any;
    articlesTagValidation?: any;
    setActiveWBAciveArticles?: any;
    setActiveArticle?: any;
    history?: any;
}
  
class Tags extends WorkbenchDefaultView<IProps, IState> {
    private repositories = new RepositorieWorkbenchTagValidation();
    public constructor(props: any) {
        super(props);
        this.state = {
        articleList: [],
        error: false,
        errorMessage: '',
        rowIndex: 0,
        columnIndex: 0,
        newTag: '',
        };
        this.loadArticlesList = this.loadArticlesList.bind(this);
        this.handleAddTag = this.handleAddTag.bind(this);
    }

    public setPageTitle() {
        return 'Home';
    }

    public setPrivateRoute() {
        return false;
    }

    public componentDidMount() {
        this.repositories.getArticleTagsByUser().then((response) => {
            this.props.doHandleArticleTagsResponse(response.body);
            this.setState({ articleList: this.props.articlesTagValidation.pending_articles });
            this.props.setActiveArticle(this.props.articlesTagValidation.active_wb_article_list[this.props.articlesTagValidation.active_article_index]);
        }).catch((error: IError) => {
            console.log(error);
        });
    }

    showAddTag(columnIndex:number, rowIndex:number){
        this.setState({rowIndex:rowIndex, columnIndex: columnIndex});
    }

    cancelAddTag(){
        this.setState({rowIndex: 0, columnIndex: 0});
    }

    saveNewTag(columnIndex:number, rowIndex:number){
        this.props.articlesTagValidation.active_article.validated_tags[rowIndex - 1] = [...this.props.articlesTagValidation.active_article.validated_tags[rowIndex - 1], this.state.newTag];
        //this.props.articlesTagValidation.active_article.validated_tags[rowIndex - 1].push(this.state.newTag);
        this.setState({newTag : ''});
    }

    deleteTag(columnIndex:number, rowIndex:number){
        const arr = this.props.articlesTagValidation.active_article.validated_tags[rowIndex - 1];
        const result = [...arr.slice(0, columnIndex - 1), ...arr.slice(columnIndex)];
        this.props.articlesTagValidation.active_article.validated_tags[rowIndex - 1] = result;
        this.setState({newTag : ''});
    }

    handleAddTag(e: any){
        this.setState({newTag : e.target.value});
    }

    public loadArticlesList(listType: string){
        this.props.setActiveWBAciveArticles(this.props.articlesTagValidation[listType]);
    }

    public saveArticleValidation(){
        this.props.articlesTagValidation.active_article.is_validated = true;
        const article_validated_id = this.props.articlesTagValidation.active_article.article_validated_id;
        this.repositories.saveArticleTags(this.props.articlesTagValidation.active_article, article_validated_id).then((response) => {
            this.props.history.push('/work-bench-home');
        }).catch((error: IError) => {
            console.log(error);
        });
    }

    public renderTagsCell(tagText:any, title: string, columnIndex: number, tagTypeIndex: number){
        if(tagText === 'Add New Tag'){
            if(this.state.rowIndex === tagTypeIndex && this.state.columnIndex === columnIndex){
                return(<div className='article_tags_container__tags--column add_new_tag'>
                    <input className='add_new_tag--input' type='text' onChange={this.handleAddTag}
                    name="newTag"
                    ></input>
                    <img src={'./static/close-black.svg'} alt='save_tag' className='delete_tag' onClick={() => this.saveNewTag(columnIndex,tagTypeIndex)}/>
                    <img src={'./static/close-black.svg'} alt='cancel_tag' className='delete_tag' onClick={() => this.cancelAddTag()}/>
                </div>);
            }else{
                return(<div className='article_tags_container__tags--column tags--add-new' onClick={() => this.showAddTag(columnIndex,tagTypeIndex)}>
                    <span className='tags--add-new--sapn'>{`+ Add ${title}`}</span>
                </div>);
            }
        }else{
            return(<div className='article_tags_container__tags--column tags'>
                <span className='tags--index'> {columnIndex} </span>
                <span className='tags--sapn'>{tagText}</span>
                <img src={'./static/close-black.svg'} alt='delete_tag' className='delete_tag' onClick={() => this.deleteTag(columnIndex,tagTypeIndex)}/>
            </div>);
        }
    }

    public renderTagsRow(tagText:any, title: string, tagTypeIndex: number){
        const size = 4;
        const res = tagText.reduce((acc:any, curr:any, i:number) => {
            if ( !(i % size)  ) {   
              acc.push(tagText.slice(i, i + size));  
            }
            return acc;
          }, []);
        
        if(res.length > 0){
            if(res[res.length -1 ].length === 4){
                res.push(['Add New Tag'])
            }else{
                res[res.length -1 ].push('Add New Tag');
            }
        }else{
            res.push(['Add New Tag']);
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
    

    public renderArticlesTags(){
        if (this.props.articlesTagValidation.active_article && Object.entries(this.props.articlesTagValidation.active_article).length !== 0 ) {
            
            let currentArticle = this.props.articlesTagValidation.active_article;
            let result = currentArticle.tag_type.slice(1,-1);
            let tag_type = result.split(",");
            
            return tag_type.map((item:any, i:number) => (
                <div key={i} className='article_tags_container__row'>
                    <div className='article_tags_container__type'>
                        {tagTypeMapping[item.slice(1,-1)]}
                    </div>
                    
                        
                    <div className='article_tags_container__tags'>
                        {this.renderTagsRow(currentArticle.validated_tags[i], tagTypeMapping[item.slice(1,-1)], i+1)}
                    </div>
                </div>
            ));
        }else{
            return(<div></div>);
        }
    }

    public renderArticlesCard(){        
        if (this.props.articlesTagValidation.active_article && Object.entries(this.props.articlesTagValidation.active_article).length !== 0 ) {
            const currentArticle = this.props.articlesTagValidation.active_article;
            return (
                <div>
                    {/* <p>{item.article_id}</p> */}
                    <div className='card_container'>
                        <div>
                            <img src={'./static/'+ (Math.floor(Math.random() * (4 - 1 + 1)) + 1) +'.svg'} alt='brand_logo' className='image_container'/>
                        </div>
                        <div className='article_content'>
                            <a href='https://medium.com' target='_blank' className='article_site'>MEDIUM.COM</a>
                            
                            <span className='article_description'>
                                {currentArticle.article_id}
                            </span>
                        </div>
                    </div>
                </div>
            );
        }else{
            return(<div></div>);
        }
    }

    public renderContent() {
        if (this.props.articlesTagValidation.active_article && Object.entries(this.props.articlesTagValidation.active_article).length !== 0 ) {
            return (
                <React.Fragment>
                    <div className='articles_list_container'>
                        {this.renderArticlesCard()}
                        <div className='article_tags_container'>
                            {this.renderArticlesTags()}    
                        </div>
                        <div className='article_action_buttons_container'>
                            <input className='article_action_buttons_container--save' type='button' value='Save' onClick={() => this.saveArticleValidation()}></input>
                        </div>
                    </div> 
                </React.Fragment>
                );
        }
    }
}
  
  const mapStateToProps = (state: any): IProps => ({
    articlesTagValidation: state.articlesTagValidation
  });
  
  const mapDispatchToProps = (dispatch: any): IProps => ({
    doHandleArticleTagsResponse: bindActionCreators(getArticlesTag, dispatch),
    setActiveWBAciveArticles: bindActionCreators(setActiveWBAciveArticles, dispatch),
    setActiveArticle: bindActionCreators(setActiveArticle, dispatch),
  });
  
  export default withRouter(connect<IProps, IProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(Tags));
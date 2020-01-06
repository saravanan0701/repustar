import * as React from 'react';
import { WorkbenchDefaultView } from '../../templates/WorkbenchDefaultView';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { RepositorieWorkbenchTagValidation } from '../../repositories/Repositorie.Workbench.TagValidation';
import { IError } from '../../interfaces/Interface.Error';
import { bindActionCreators } from 'redux';
import { getArticlesTag, setActiveWBAciveArticles, setActiveArticle, setActiveArticleIndex } from '../../redux/redux.workbench.tagsvalidation/redux.workbench.tagsvalidation.action';
import './home.css';
import './tags.css'; 
import ArticleCard from '../../components/Component.ArticleCard/Component.ArticleCard';
import ArticleNavigationTool from '../../components/Component.Article/Component.Article.NavigationTool';
import ArticleTag from '../../components/Component.Article/Component.Article.Tag';
import {toastr} from 'react-redux-toastr';

interface IState {
    articleList?: [];
    error: boolean;
    errorMessage: string;
    rowIndex?: number;
    columnIndex?: number;
    newTag: string;
    isPendingArticle: boolean;
    isLastArticle: boolean;
}
  
interface IProps {
    doHandleArticleTagsResponse?: any;
    articlesTagValidation?: any;
    setActiveWBAciveArticles?: any;
    setActiveArticle?: any;
    setActiveArticleIndex?: any;
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
        isPendingArticle: false,
        isLastArticle: false,
        };
        this.handleAddTag = this.handleAddTag.bind(this);
        this.showAddTag = this.showAddTag.bind(this);
        this.cancelAddTag = this.cancelAddTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
    }

    public setPageTitle() {
        return 'Article Tags';
    }

    public setPrivateRoute() {
        return false;
    }

    public componentDidMount() {

        if (localStorage.getItem('active_list_type') === 'pending_articles'){
            this.setState({isPendingArticle : true});
        }

        let article_index: any = localStorage.getItem('active_list_id');
        
        this.repositories.getArticleTagsByUser().then((response) => {
            this.props.doHandleArticleTagsResponse(response.body);
            this.props.setActiveArticleIndex(article_index);
            this.props.setActiveArticle(this.props.articlesTagValidation.active_wb_article_list[this.props.articlesTagValidation.active_article_index]);
            if(this.props.articlesTagValidation.active_wb_article_list.length - 1 === parseInt(article_index)){
                this.setState({isLastArticle : true});
            }
        }).catch((error: IError) => {
            console.log(error);
        });
    }

    public showAddTag(columnIndex:number, rowIndex:number){
        this.setState({rowIndex:rowIndex, columnIndex: columnIndex});
    }

    public cancelAddTag(){
        this.setState({rowIndex: 0, columnIndex: 0});
    }

    public handleAddTag(rowIndex: number, newTag: string) {
        this.props.articlesTagValidation.active_article.validated_tags[rowIndex - 1] = [...this.props.articlesTagValidation.active_article.validated_tags[rowIndex - 1], newTag];
        this.setState({newTag : ''});
    }

    public deleteTag(columnIndex:number, rowIndex:number){
        const arr = this.props.articlesTagValidation.active_article.validated_tags[rowIndex - 1];
        const result = [...arr.slice(0, columnIndex - 1), ...arr.slice(columnIndex)];
        this.props.articlesTagValidation.active_article.validated_tags[rowIndex - 1] = result;
        this.setState({newTag : ''});
    }


    public saveArticleValidation(){
        this.props.articlesTagValidation.active_article.is_validated = true;
        const article_validated_id = this.props.articlesTagValidation.active_article.article_validated_id;
        this.repositories.saveArticleTags(this.props.articlesTagValidation.active_article, article_validated_id).then((response) => {
            toastr.success('','Article Tags Validated')
        }).catch((error: IError) => {
            console.log(error);
        });
    }

    public nextArticle(){
        const current_article_id = parseInt(this.props.articlesTagValidation.active_article_index);
        let next_article_id = 0;
        
        if(this.props.articlesTagValidation.active_wb_article_list.length - 1 !== current_article_id){
            next_article_id = parseInt(this.props.articlesTagValidation.active_article_index) + 1
        }

        this.props.setActiveArticleIndex(next_article_id);
        this.props.setActiveArticle(this.props.articlesTagValidation.active_wb_article_list[next_article_id]);
    }
    
    public renderArticlesTags(){
        if (this.props.articlesTagValidation.active_article && Object.entries(this.props.articlesTagValidation.active_article).length !== 0 ) {
            
            let currentArticle = this.props.articlesTagValidation.active_article;
            let result = currentArticle.tag_type.slice(1,-1);
            let tag_type = result.split(",");
            
            return tag_type.map((item:any, i:number) => (
                <ArticleTag keyCounter={i} 
                    currentArticle={currentArticle.validated_tags[i]} 
                    item={item} 
                    itemIndex={i} 
                    handleAddTag = {this.handleAddTag}
                    cancelAddTag = {this.cancelAddTag}
                    showAddTag = {this.showAddTag}
                    deleteTag = {this.deleteTag}
                    isPendingArticle = {this.state.isPendingArticle} 
                    rowIndex={this.state.rowIndex} 
                    columnIndex={this.state.columnIndex}
                />
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
                    <ArticleCard article_image={currentArticle.article_image} 
                        article_url={currentArticle.article_url} 
                        article_title={currentArticle.article_title} 
                        is_target_blank={true}
                        article_site_name={currentArticle.article_site_name}/>
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
                        <ArticleNavigationTool isPendingArticle = {this.state.isPendingArticle} 
                            articleLength = { this.state.isPendingArticle ? this.props.articlesTagValidation.pending_articles.length : this.props.articlesTagValidation.completed_articles.length }
                        />
                        {this.renderArticlesCard()}
                        <div className='article_tags_container'>
                            {this.renderArticlesTags()}    
                        </div>
                        <div className='article_action_buttons_container'>
                            {
                            this.state.isPendingArticle 
                                ? 
                                        <input className='article_action_buttons_container--save' type='button' value='Save' onClick={() => this.saveArticleValidation()}></input>                          
                                : <div></div>
                            }
                            <input className='article_action_buttons_container--next_article' type='button' value='Next Article >' onClick={() => this.nextArticle()}></input>
                            {/* {
                                this.state.isLastArticle ? <div></div>
                                : <input className='article_action_buttons_container--next_article' type='button' value='Next Article >' onClick={() => this.nextArticle()}></input>
                            } */}
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
    setActiveArticleIndex: bindActionCreators(setActiveArticleIndex, dispatch),
  });
  
  export default withRouter(connect<IProps, IProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(Tags));
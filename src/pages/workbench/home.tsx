import * as React from 'react';
import { WorkbenchDefaultView } from '../../templates/WorkbenchDefaultView';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { RepositorieWorkbenchTagValidation } from '../../repositories/Repositorie.Workbench.TagValidation';
import { IError } from '../../interfaces/Interface.Error';
import Header from '../../modules/Module.Header/Module.Header';
import { bindActionCreators } from 'redux';
import { getArticlesTag, 
    setActiveWBAciveArticles,
    setActiveArticleIndex,
    setActiveArticle
} from '../../redux/redux.workbench.tagsvalidation/redux.workbench.tagsvalidation.action';
import './home.css';
import ArticleCard from '../../components/Component.ArticleCard/Component.ArticleCard';

interface IState {
    articleList?: [];
    error: boolean;
    errorMessage: string;
}
  
interface IProps {
    doHandleArticleTagsResponse?: any;
    articlesTagValidation?: any;
    setActiveWBAciveArticles?: any;
    setActiveArticleIndex?: any;
    setActiveArticle?: any;
    history?: any;
}
  
class Home extends WorkbenchDefaultView<IProps, IState> {
    private repositories = new RepositorieWorkbenchTagValidation();
    public constructor(props: any) {
        super(props);
        this.state = {
        articleList: [],
        error: false,
        errorMessage: '',
        };
        this.loadArticlesList = this.loadArticlesList.bind(this);
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
        }).catch((error: IError) => {
            console.log(error);
        });
    }

    public validateTags(index: number){
        this.props.setActiveArticleIndex(index);
        //const currentArticle = this.props.articlesTagValidation.active_wb_article_list[index];
        this.props.setActiveArticle(this.props.articlesTagValidation.active_wb_article_list[index]);
        this.props.history.push('/work-bench-tags-validation');
    }

    public loadArticlesList(listType: string){
        this.props.setActiveWBAciveArticles(this.props.articlesTagValidation[listType]);
        //this.setState({ articleList: this.props.articlesTagValidation[listType] });
    }

    public renderArticles(){        
        if (this.props.articlesTagValidation.active_wb_article_list && this.props.articlesTagValidation.active_wb_article_list.length > 0) {
            return this.props.articlesTagValidation.active_wb_article_list.map((item: any, i:number) => (
                <div key={i} onClick={() => this.validateTags(i)}>
                    <ArticleCard article_image={item.article_image} 
                        article_title={item.article_title}
                        is_target_blank={false}
                        article_site_name={item.article_site_name} />
                </div>
            ));
        }else{
            return(<div></div>);
        }
    }

    public renderContent() {
        return (
        <React.Fragment>
            <Header.WorkbenchSeondaryHeader pendingcount = {this.props.articlesTagValidation.pending_articles.length}
                completedcount = {this.props.articlesTagValidation.completed_articles.length}
                onLoadArticlesList = {this.loadArticlesList}
            />
            <div className='articles_list_container'>
                {this.renderArticles()}
            </div>
        </React.Fragment>
        );
    }
}
  
  const mapStateToProps = (state: any): IProps => ({
    articlesTagValidation: state.articlesTagValidation
  });
  
  const mapDispatchToProps = (dispatch: any): IProps => ({
    doHandleArticleTagsResponse: bindActionCreators(getArticlesTag, dispatch),
    setActiveWBAciveArticles: bindActionCreators(setActiveWBAciveArticles, dispatch),
    setActiveArticleIndex: bindActionCreators(setActiveArticleIndex, dispatch),
    setActiveArticle: bindActionCreators(setActiveArticle, dispatch),
  });
  
  export default withRouter(connect<IProps, IProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(Home));
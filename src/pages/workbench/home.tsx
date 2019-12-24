import * as React from 'react';
import { WorkbenchDefaultView } from '../../templates/WorkbenchDefaultView';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { RepositorieWorkbenchTagValidation } from '../../repositories/Repositorie.Workbench.TagValidation';
import { IError } from '../../interfaces/Interface.Error';
import Header from '../../modules/Module.Header/Module.Header';
import { bindActionCreators } from 'redux';
import { getArticlesTag, setActiveWBAciveArticles } from '../../redux/redux.workbench.tagsvalidation/redux.workbench.tagsvalidation.action';
import './home.css'; 
import one from '../../static/1.svg';
import two from '../../static/2.svg';
import three from '../../static/3.svg';
import four from '../../static/4.svg';

interface IState {
    articleList?: [];
    error: boolean;
    errorMessage: string;
}
  
interface IProps {
    doHandleArticleTagsResponse?: any;
    articlesTagValidation?: any;
    setActiveWBAciveArticles?: any;
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

    public loadArticlesList(listType: string){
        this.props.setActiveWBAciveArticles(this.props.articlesTagValidation[listType]);
        //this.setState({ articleList: this.props.articlesTagValidation[listType] });
    }

    public renderArticles(){        
        if (this.props.articlesTagValidation.active_wb_article_list && this.props.articlesTagValidation.active_wb_article_list.length > 0) {
            console.log('this.props.articlesTagValidation.active_wb_article_list.length ', this.props.articlesTagValidation.active_wb_article_list.length);
            console.log(this.props.articlesTagValidation.active_wb_article_list);
            console.log('return Math.floor(Math.random() * Math.floor(max));', Math.floor(Math.random() * Math.floor(4)))
            //let random = Math.floor(Math.random() * Math.floor(4));
            return this.props.articlesTagValidation.active_wb_article_list.map((item: any, i:number) => (
                <div key={i}>
                    {/* <p>{item.article_id}</p> */}
                    <div className='card_container'>
                        <div>
                            <img src={'./static/'+ (Math.floor(Math.random() * (4 - 1 + 1)) + 1) +'.svg'} alt='brand_logo' className='image_container'/>
                        </div>
                        <div className='article_content'>
                            <a href='https://medium.com' target='_blank' className='article_site'>MEDIUM.COM</a>
                            
                            <span className='article_description'>
                                {item.article_id}
                            </span>
                        </div>
                    </div>
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
  });
  
  export default withRouter(connect<IProps, IProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(Home));
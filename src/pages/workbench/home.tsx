import * as React from 'react';
import { WorkbenchDefaultView } from '../../templates/WorkbenchDefaultView';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { RepositorieWorkbenchTagValidation } from '../../repositories/Repositorie.Workbench.TagValidation';
import { IError } from '../../interfaces/Interface.Error';
import Header from '../../modules/Module.Header/Module.Header';
import { bindActionCreators } from 'redux';
import { getArticlesTag } from '../../redux/redux.workbench.tagsvalidation/redux.workbench.tagsvalidation.action';

interface IState {
    articleList?: [];
    error: boolean;
    errorMessage: string;
}
  
interface IProps {
    doHandleArticleTagsResponse?: any;
    articlesTagValidation?: any;
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
        this.setState({ articleList: this.props.articlesTagValidation[listType] });
    }

    public renderArticles(){
        if (this.state.articleList && this.state.articleList.length > 0) {
            return this.state.articleList.map(item => (
                <p>Workbench</p>
            ));
        }
    }

    public renderContent() {
        return (
        <React.Fragment>
            <Header.WorkbenchSeondaryHeader pendingcount = {this.props.articlesTagValidation.pending_articles.length}
                completedcount = {this.props.articlesTagValidation.completed_articles.length}
                onLoadArticlesList = {this.loadArticlesList}
            />
            <div>
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
  });
  
  export default withRouter(connect<IProps, IProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(Home));
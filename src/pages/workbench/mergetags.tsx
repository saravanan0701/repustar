import * as React from 'react';
import { WorkbenchDefaultView } from '../../templates/WorkbenchDefaultView';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { RepositorieWorkbenchMergeTags } from '../../repositories/Repositorie.Workbench.MergeTags';
import { IError } from '../../interfaces/Interface.Error';
import { bindActionCreators } from 'redux';
import { setActiveCategory,
    setCategoryList, setTagGroupList, setDisplayGroupList,
    setActiveGroupList, setActiveTagIndex } from '../../redux/redux.workbench.mergetags/redux.workbench.mergetags.action';
import './home.css';
import './mergetags.css'; 
import { tagTypeMapping } from '../../config';


interface IState {
    categoryTabs?: [];
    activeTab?: string;
    activeTagGroupIndex?: number;
    displayListType: string;
    articleList?: [];
    error: boolean;
    errorMessage: string;
    rowIndex?: number;
    columnIndex?: number;
    newTag: string;
    isPendingArticle: boolean;
    isLastArticle: boolean;
    acticeArticlesListLength: number;
}
  
interface IProps {
    doHandleArticleTagsResponse?: any;
    mergeTags?: any;
    setCategoryList?: any;
    setTagGroupList?: any;
    setActiveGroupList?: any;
    setActiveTagIndex?: any;
    setDisplayGroupList?:any;

    setActiveCategory?: any;
    setActiveWBAciveArticles?: any;
    setActiveArticle?: any;
    setActiveArticleIndex?: any;
    history?: any;
    onChangeProps?: any;
}
  
class MergeTags extends WorkbenchDefaultView<IProps, IState> {
    private repositories = new RepositorieWorkbenchMergeTags();
    public constructor(props: any) {
        super(props);
        this.state = {
            categoryTabs: [],
            activeTab:'',
            activeTagGroupIndex: 0,
            displayListType: '',
            articleList: [],
            error: false,
            errorMessage: '',
            rowIndex: 0,
            columnIndex: 0,
            newTag: '',
            isPendingArticle: false,
            isLastArticle: false,
            acticeArticlesListLength: 0,
        };
        // this.handleAddTag = this.handleAddTag.bind(this);
    }

    public setPageTitle() {
        return 'Merge Tags';
    }

    public setPrivateRoute() {
        return false;
    }

    public componentDidMount() {

        if (localStorage.getItem('active_list_type') === 'pending_articles'){
            this.setState({isPendingArticle : true});
        }

        let article_index: any = localStorage.getItem('active_list_id');
        
        this.repositories.getGroupTagsByUser().then((response) => {
            const responseData = response.body;
            const uniqueTabs: any = [...new Set(responseData.map(item => {
                let tag_type: any = item.tag_type;
                return tagTypeMapping[tag_type]
            }))];
            this.props.setCategoryList(uniqueTabs);            
            this.setState({categoryTabs : uniqueTabs});
            this.setState({activeTab : uniqueTabs[0] });
            this.props.setActiveCategory(uniqueTabs[0]);
            this.props.setTagGroupList(responseData);

            const activeList = responseData.filter(item => {
                let tag_type: any = item.tag_type;
                if(tagTypeMapping[tag_type] == uniqueTabs[0]){
                    return item;
                }
            });
            console.log('activeList ', activeList);
            this.props.setActiveGroupList(activeList);
            this.props.setActiveTagIndex(0);
            this.setState({activeTagGroupIndex : 0});
            this.setState({displayListType: 'all_groups'});

            const displayList = [...activeList.filter(item => item.tags_group.length > 1 )];
            this.props.setDisplayGroupList(displayList);

        }).catch((error: IError) => {
            console.log(error);
        });
    }

    public handleChangeTab(newTab: string){
        this.setState({activeTab : newTab });
        this.props.setActiveCategory(newTab);
        const activeList = this.props.mergeTags.tag_group_list.filter( (item:any) => {
            let tag_type: any = item.tag_type;
            if(tagTypeMapping[tag_type] == newTab){
                return item;
            }
        });
        this.props.setActiveGroupList(activeList);
        this.props.setActiveTagIndex(0);
        this.setState({activeTagGroupIndex : 0});
        this.setState({displayListType: 'all_groups'});
        const displayList = [...activeList.filter((item:any) => item.tags_group.length > 1 )];
        this.props.setDisplayGroupList(displayList);
    }

    public selectGroup(activeTagIndex: number){
        this.props.setActiveTagIndex(activeTagIndex);
        this.setState({activeTagGroupIndex : activeTagIndex});
        console.log('Click');
    }

    public renderTagsCategoryTab(){
        if(this.props.mergeTags.category_list && this.props.mergeTags.category_list.length > 0){
            return this.props.mergeTags.category_list.map((item:any, i:number) => (
                <li className='category_tabs__menu--list' onClick={() => this.handleChangeTab(item)}>
                    <span className='category_tabs__menu--list_item'>
                        {item}
                    </span>
                    {
                        this.props.mergeTags.active_category === item ? <hr className='category_tabs__menu--selected_item'></hr> : ''
                    }
                </li>
            ));
        }
    }

    public selectFilter(filterItem: string){
        this.setState({displayListType: filterItem});
        let displayList: any = '';
        if(filterItem === 'all_groups'){
            displayList = [...this.props.mergeTags.active_tag_group_list.filter((item:any) => item.tags_group.length > 1 )];
        }else if(filterItem === 'singular_tags'){
            displayList = [...this.props.mergeTags.active_tag_group_list.filter((item:any) => item.tags_group.length === 1 )];
            let newList:any = [];
            displayList.map((item:any, i: number) => {
                newList.push(item.validated_tags_list[0]);
                displayList[0].isSingularGroup = true;
                return displayList[0].validated_tags_list = newList;
            })
            displayList = [displayList[0]];
        }else{
            let groupList = [... this.props.mergeTags.active_tag_group_list.filter((item:any) => item.tags_group.length > 1 )];
            console.log('groupList ', groupList);
            let singleList = [... this.props.mergeTags.active_tag_group_list.filter((item:any) => item.tags_group.length === 1 )];
            console.log('singleList ', singleList);
            let newList:any = [];
            singleList.map((item:any, i: number) => {
                newList.push(item.validated_tags_list[0]);
                singleList[0].isSingularGroup = true;
                return singleList[0].validated_tags_list = newList;
            });
            console.log('singleList ', singleList);
            groupList = [...groupList, singleList[0]];
            console.log('groupList ', groupList);
            displayList = groupList;
        }
        console.log('displayList ', displayList);
        this.props.setDisplayGroupList(displayList);
        this.props.setActiveTagIndex(0);
        this.setState({activeTagGroupIndex : 0});
    }

    public renderFilter(){
        if(this.props.mergeTags.category_list && this.props.mergeTags.category_list.length > 0){
            return(
                <div className='filter_add_group_container'>
                    <div className='filter_container'>
                        <div className='radio_button_container'>
                            <input type='radio' id='react-radio-button-group-1' name='number' value='all_groups' 
                                checked = {this.state.displayListType === 'all_groups' ? true : false }
                                onClick={() => this.selectFilter('all_groups')}
                            />
                            <label className='radio_label'>View all groups</label>
                        </div>
                        <div className='radio_button_container'>
                            <input type='radio' id='react-radio-button-group-1' name='number' value='all_tags' 
                                checked = {this.state.displayListType === 'all_tags' ? true : false }  
                                onClick={() => this.selectFilter('all_tags')}
                            />
                            <label className='radio_label'>View all tags</label>
                        </div>
                        <div className='radio_button_container'>
                            <input type='radio' id='react-radio-button-group-1' name='number' value='singular_tags' 
                                checked = {this.state.displayListType === 'singular_tags' ? true : false }  
                                onClick={() => this.selectFilter('singular_tags')}
                            />
                            <label className='radio_label'>View singular tags</label>
                        </div>
                    </div>
                    <div className='add_group_container'>
                        <input type='button' value='+ Groups' className='add_group'></input>
                    </div>
                </div>
            )
        }
    }

    public renderTagGroups(){
        if(this.props.mergeTags.display_tag_group_list && this.props.mergeTags.display_tag_group_list.length > 0){
            return this.props.mergeTags.display_tag_group_list.map((item:any, i:number) => (
                <div className={`tag_group_container ${this.state.activeTagGroupIndex == i ? 'selected_group' : ''}`} 
                    onClick={() => this.selectGroup(i)}>
                    {
                        item.isSingularGroup 
                        ? <div className='tag_group_header_container'>
                            <span>Singular tags</span>
                          </div>
                        : <div className='tag_group_header_container'>
                                <input type='text' className='group_name' placeholder='Enter Group name'></input>
                                <span className='ungroup_all'> Ungroup all tags </span>
                            </div>
                    }

                        <div className='tag_list_container'>
                            {this.renderTags(item.validated_tags_list, i)}
                        </div>
                    
                    {
                        this.state.activeTagGroupIndex == i ?
                        <div className='save_tag_button_container'>
                            <input className='save_tag' type='button' value='Save'></input>
                        </div>
                        : <div></div>
                    }
                </div>
            ));
        }
    }

    public renderTags(tagList: string[], rowIndex: number){
        const content: any =  tagList.map((item:any, i:number) => (
            <div className='tags_container'>
                <span className='tag_text'>{Object.keys(item)}</span>
                {this.state.activeTagGroupIndex == rowIndex ? 
                    <span className='remove_tag'>Remove</span>
                    :<span></span>
                }
            </div>
        ));

        if(this.state.activeTagGroupIndex == rowIndex){
            return(<div className='tag_row'>
                {content}
                <div className='tags_container'>
                    <span className='add_tag'>+ Add Tag</span>
                </div>
            </div>)
        }else{
            return(<div className='tag_row'>
                {content}
            </div>)
        }
    }

    public renderContent() {
        console.log('this.props ', this.props.mergeTags);
        if(this.props.mergeTags.category_list && this.props.mergeTags.category_list.length > 0){
            return(<React.Fragment>
                        <div className='merge_tag_container'>
                            <div className='category_tabs_container'>
                                <ul className='category_tabs__menu--ul'>
                                    {this.renderTagsCategoryTab()}
                                </ul>
                            </div>
                            <div className='merge_tag_filter_container'>
                                {this.renderFilter()}
                            </div>
                            <div className='merge_tag_body_container'>
                                {this.renderTagGroups()}
                            </div>
                        </div>
                    </React.Fragment>
                );
        }
    }
}
  
  const mapStateToProps = (state: any): IProps => ({
    mergeTags: state.mergeTags
  });
  
  const mapDispatchToProps = (dispatch: any): IProps => ({
    setActiveCategory: bindActionCreators(setActiveCategory, dispatch),
    setCategoryList: bindActionCreators(setCategoryList, dispatch),
    setTagGroupList: bindActionCreators(setTagGroupList, dispatch),
    setActiveGroupList: bindActionCreators(setActiveGroupList, dispatch),
    setActiveTagIndex: bindActionCreators(setActiveTagIndex, dispatch),
    setDisplayGroupList: bindActionCreators(setDisplayGroupList, dispatch),
  });
  
  export default withRouter(connect<IProps, IProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(MergeTags));